import 'dotenv/config';

import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { assertMinimumTrailCount, normalizeTrailData } from '../src/utils/trailData.ts';
import { trailConditionById } from '../src/utils/trailTaxonomy.ts';

const API_BASE_URL = 'https://www.trailforks.com/api/1';
const EXPECTED_REGION_ID = '4104';
const MAX_REPORT_AGE_DAYS = 14;
const MIN_EXPECTED_TRAIL_COUNT = 20;
const DAY_IN_SECONDS = 86_400;
const EXCLUDED_TRAIL_IDS = new Set(['117100']); // Pikes Peak Greenway clips the park boundary.

const DIFFICULTY_BY_ID = {
  1: { key: 'access', label: 'Access road' },
  2: { key: 'easiest', label: 'Easiest' },
  3: { key: 'easy', label: 'Easy' },
  4: { key: 'intermediate', label: 'Intermediate' },
  5: { key: 'difficult', label: 'Very difficult' },
  6: { key: 'extreme', label: 'Extremely difficult' },
  7: { key: 'access', label: 'Secondary access' },
  8: { key: 'proline', label: 'Pro line' },
};

const appId = process.env.TRAILFORKS_APP_ID;
const appSecret = process.env.TRAILFORKS_APP_SECRET;
const regionId = process.env.TRAILFORKS_REGION_ID || EXPECTED_REGION_ID;

if (!appId || !appSecret) {
  throw new Error('TRAILFORKS_APP_ID and TRAILFORKS_APP_SECRET are required');
}

if (regionId !== EXPECTED_REGION_ID) {
  throw new Error(`Trailforks access is restricted to region ${EXPECTED_REGION_ID}; received ${regionId}`);
}

const fetchCollection = async (resource, params = {}) => {
  const url = new URL(`${API_BASE_URL}/${resource}`);
  url.searchParams.set('app_id', appId);
  url.searchParams.set('app_secret', appSecret);
  url.searchParams.set('filter', `rid::${regionId}`);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload || payload.error || !Array.isArray(payload.data)) {
    throw new Error(`Trailforks ${resource} request failed (${response.status}): ${payload?.message ?? 'invalid response'}`);
  }

  return payload.data;
};

const parseTrack = (track, trailId) => {
  const latitudes = String(track?.latitude ?? '').split(',');
  const longitudes = String(track?.longitude ?? '').split(',');

  if (latitudes.length < 2 || latitudes.length !== longitudes.length) {
    throw new Error(`Trail ${trailId} has invalid track geometry`);
  }

  return latitudes.map((latitude, index) => [Number(longitudes[index]), Number(latitude)]);
};

const ageBucket = (days) => {
  if (days === null) return 'No report in 14 days';
  if (days === 0) return 'Today';
  if (days <= 2) return '1–2 days ago';
  if (days <= 7) return '3–7 days ago';
  return '8–14 days ago';
};

const now = new Date();
const nowSeconds = Math.floor(now.getTime() / 1000);
const cutoffSeconds = nowSeconds - MAX_REPORT_AGE_DAYS * DAY_IN_SECONDS;
const [trails, reports] = await Promise.all([fetchCollection('trails', { scope: 'full' }), fetchCollection('reports', { limit: 200 })]);

const newestReportByTrail = new Map();

for (const report of reports) {
  const trailId = String(report.trail ?? report.nid ?? '');
  const created = Number(report.created);

  if (!trailId || !Number.isFinite(created) || created < cutoffSeconds || created > nowSeconds + DAY_IN_SECONDS) continue;

  const existing = newestReportByTrail.get(trailId);
  if (!existing || created > Number(existing.created)) newestReportByTrail.set(trailId, report);
}

const conditionCounts = {};
let recentReportCount = 0;

const features = trails
  .filter(
    (trail) =>
      String(trail.rid) === regionId &&
      !EXCLUDED_TRAIL_IDS.has(String(trail.trailid ?? trail.id)) &&
      String(trail.hidden) !== '1' &&
      String(trail.archived) !== '1' &&
      String(trail.planned) !== '1' &&
      String(trail.published) !== '0',
  )
  .map((trail) => {
    const trailId = String(trail.trailid ?? trail.id);
    const report = newestReportByTrail.get(trailId);
    const reportedAt = report ? new Date(Number(report.created) * 1000) : null;
    const reportAgeDays = reportedAt ? Math.max(0, Math.floor((now.getTime() - reportedAt.getTime()) / (DAY_IN_SECONDS * 1000))) : null;
    const condition = report ? (trailConditionById[Number(report.condition)] ?? trailConditionById[0]) : trailConditionById[11];
    const difficulty = DIFFICULTY_BY_ID[Number(trail.difficulty)] ?? { key: 'unknown', label: 'Unknown' };

    if (report) {
      recentReportCount += 1;
      conditionCounts[condition.key] = (conditionCounts[condition.key] ?? 0) + 1;
    }

    return {
      type: 'Feature',
      id: trailId,
      properties: {
        id: trailId,
        name: String(trail.title),
        difficulty: difficulty.key,
        difficultyLabel: difficulty.label,
        condition: condition.key,
        conditionLabel: condition.label,
        reportAgeDays,
        reportAgeBucket: ageBucket(reportAgeDays),
        reportedAt: reportedAt?.toISOString() ?? null,
        conditionAssumed: !report,
      },
      geometry: { type: 'LineString', coordinates: parseTrack(trail.track, trailId) },
    };
  });

const reportedConditions = Object.entries(conditionCounts)
  .map(([condition, count]) => ({
    condition,
    label: trailConditionById[Object.keys(trailConditionById).find((id) => trailConditionById[id].key === condition)]?.label ?? condition,
    count,
  }))
  .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

const adverseCount = reportedConditions.filter(({ condition }) => !['ideal', 'dry'].includes(condition)).reduce((sum, item) => sum + item.count, 0);
const status = recentReportCount === 0 ? 'Ideal' : adverseCount === 0 ? 'Dry / ideal' : reportedConditions.length === 1 ? reportedConditions[0].label : 'Mixed conditions';

const summary = {
  generatedAt: now.toISOString(),
  regionId: Number(regionId),
  maxReportAgeDays: MAX_REPORT_AGE_DAYS,
  status,
  note: recentReportCount === 0 ? 'No trail reports in the last 14 days; conditions are assumed ideal.' : `${recentReportCount} of ${features.length} trails have reports from the last 14 days.`,
  recentReportCount,
  trailCount: features.length,
  reportedConditions,
};

const mapData = normalizeTrailData({
  type: 'FeatureCollection',
  features,
});
assertMinimumTrailCount(mapData, MIN_EXPECTED_TRAIL_COUNT);

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(root, 'public', 'data');
const generatedDataDirectory = path.join(root, 'src', 'data', 'generated');
await mkdir(outputDirectory, { recursive: true });
await mkdir(generatedDataDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, 'ute-valley-trails.geojson'), `${JSON.stringify(mapData)}\n`);
await writeFile(path.join(generatedDataDirectory, 'trailforks-summary.json'), `${JSON.stringify(summary)}\n`);
console.log(`Updated ${features.length} trails (${recentReportCount} with reports from the last ${MAX_REPORT_AGE_DAYS} days)`);
