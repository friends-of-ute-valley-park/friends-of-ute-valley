import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { assertTrailDataCounts, assertTrailFeatureCollection, assertTrailSummary } from '../src/utils/trailData.ts';

const createFeature = (id, overrides = {}) => ({
  type: 'Feature',
  id,
  properties: {
    id,
    name: `Trail ${id}`,
    difficulty: 'intermediate',
    difficultyLabel: 'Intermediate',
    condition: 'muddy',
    conditionLabel: 'Muddy',
    reportAgeDays: 1,
    reportAgeBucket: '1–2 days ago',
    reportedAt: '2026-08-17T12:00:00.000Z',
    conditionAssumed: false,
    ...overrides.properties,
  },
  geometry: overrides.geometry ?? {
    type: 'LineString',
    coordinates: [
      [-104.86, 38.91],
      [-104.85, 38.92],
    ],
  },
});

const createArtifacts = () => {
  const trailData = {
    type: 'FeatureCollection',
    features: [
      createFeature('reported'),
      createFeature('assumed', {
        properties: {
          condition: 'ideal',
          conditionLabel: 'Ideal',
          reportAgeDays: null,
          reportAgeBucket: 'No report in 14 days',
          reportedAt: null,
          conditionAssumed: true,
        },
      }),
    ],
  };
  const summary = {
    generatedAt: '2026-08-18T12:00:00.000Z',
    regionId: 4104,
    maxReportAgeDays: 14,
    status: 'Muddy',
    note: '1 of 2 trails have reports from the last 14 days.',
    recentReportCount: 1,
    trailCount: 2,
    reportedConditions: [{ condition: 'muddy', label: 'Muddy', count: 1 }],
  };

  return { trailData, summary };
};

await describe('trail data assertions', async () => {
  await it('accepts valid GeoJSON and summary fixtures with consistent counts', () => {
    const { trailData, summary } = createArtifacts();

    assert.doesNotThrow(() => assertTrailFeatureCollection(trailData));
    assert.doesNotThrow(() => assertTrailSummary(summary));
    assert.doesNotThrow(() => assertTrailDataCounts(trailData, summary));
  });

  await it('rejects duplicate, non-string, and mismatched feature IDs', () => {
    const duplicate = createArtifacts().trailData;
    duplicate.features[1].id = 'reported';
    duplicate.features[1].properties.id = 'reported';
    assert.throws(() => assertTrailFeatureCollection(duplicate), /duplicates trail ID/);

    const nonString = createArtifacts().trailData;
    nonString.features[0].id = 123;
    assert.throws(() => assertTrailFeatureCollection(nonString), /features\[0\]\.id must be a string/);

    const mismatched = createArtifacts().trailData;
    mismatched.features[0].properties.id = 'different';
    assert.throws(() => assertTrailFeatureCollection(mismatched), /properties\.id must equal/);
  });

  await it('rejects invalid LineString geometry and non-finite coordinates', () => {
    const invalidGeometry = createArtifacts().trailData;
    invalidGeometry.features[0].geometry = { type: 'Point', coordinates: [-104.86, 38.91] };
    assert.throws(() => assertTrailFeatureCollection(invalidGeometry), /geometry\.type must be "LineString"/);

    const nonFiniteCoordinate = createArtifacts().trailData;
    nonFiniteCoordinate.features[0].geometry.coordinates[1][0] = Number.NaN;
    assert.throws(() => assertTrailFeatureCollection(nonFiniteCoordinate), /coordinates\[1\]\[0\] must be a finite number/);
  });

  await it('rejects unknown difficulty, condition, and report age bucket values', () => {
    const unknownDifficulty = createArtifacts().trailData;
    unknownDifficulty.features[0].properties.difficulty = 'expert';
    assert.throws(() => assertTrailFeatureCollection(unknownDifficulty), /known trail difficulty/);

    const unknownCondition = createArtifacts().trailData;
    unknownCondition.features[0].properties.condition = 'dusty';
    assert.throws(() => assertTrailFeatureCollection(unknownCondition), /known trail condition/);

    const unknownBucket = createArtifacts().trailData;
    unknownBucket.features[0].properties.reportAgeBucket = 'Recently';
    assert.throws(() => assertTrailFeatureCollection(unknownBucket), /known report age bucket/);

    const unknownSummaryCondition = createArtifacts().summary;
    unknownSummaryCondition.reportedConditions[0].condition = 'dusty';
    assert.throws(() => assertTrailSummary(unknownSummaryCondition), /known trail condition/);
  });

  await it('rejects report fields that disagree with conditionAssumed and report age', () => {
    const assumedWithReportAge = createArtifacts().trailData;
    assumedWithReportAge.features[1].properties.reportAgeDays = 1;
    assert.throws(() => assertTrailFeatureCollection(assumedWithReportAge), /reportAgeDays must be null when conditionAssumed is true/);

    const assumedWithReportedAt = createArtifacts().trailData;
    assumedWithReportedAt.features[1].properties.reportedAt = '2026-08-17T12:00:00.000Z';
    assert.throws(() => assertTrailFeatureCollection(assumedWithReportedAt), /reportedAt must be null when conditionAssumed is true/);

    const assumedWithReportBucket = createArtifacts().trailData;
    assumedWithReportBucket.features[1].properties.reportAgeBucket = 'Today';
    assert.throws(() => assertTrailFeatureCollection(assumedWithReportBucket), /reportAgeBucket must be "No report in 14 days" when conditionAssumed is true/);

    const assumedWithReportedCondition = createArtifacts().trailData;
    assumedWithReportedCondition.features[1].properties.condition = 'muddy';
    assert.throws(() => assertTrailFeatureCollection(assumedWithReportedCondition), /condition must be "ideal" when conditionAssumed is true/);

    const reportedWithoutAge = createArtifacts().trailData;
    reportedWithoutAge.features[0].properties.reportAgeDays = null;
    assert.throws(() => assertTrailFeatureCollection(reportedWithoutAge), /reportAgeDays must be a non-negative integer/);

    const reportedWithoutDate = createArtifacts().trailData;
    reportedWithoutDate.features[0].properties.reportedAt = null;
    assert.throws(() => assertTrailFeatureCollection(reportedWithoutDate), /reportedAt must be a valid date string when conditionAssumed is false/);

    const reportedWithInvalidDate = createArtifacts().trailData;
    reportedWithInvalidDate.features[0].properties.reportedAt = 'not-a-date';
    assert.throws(() => assertTrailFeatureCollection(reportedWithInvalidDate), /reportedAt must be a valid date string when conditionAssumed is false/);

    const reportedWithWrongBucket = createArtifacts().trailData;
    reportedWithWrongBucket.features[0].properties.reportAgeBucket = 'Today';
    assert.throws(() => assertTrailFeatureCollection(reportedWithWrongBucket), /reportAgeBucket must be "1–2 days ago" for reportAgeDays 1/);
  });

  await it('rejects zero-count phantom reported conditions', () => {
    const phantomCondition = createArtifacts().summary;
    phantomCondition.reportedConditions.push({ condition: 'dry', label: 'Dry', count: 0 });

    assert.throws(() => assertTrailSummary(phantomCondition), /reportedConditions\[1\]\.count must be a positive integer/);
  });

  await it('rejects inconsistent artifact counts', () => {
    const wrongTrailCount = createArtifacts();
    wrongTrailCount.summary.trailCount = 3;
    assert.throws(() => assertTrailDataCounts(wrongTrailCount.trailData, wrongTrailCount.summary), /trailCount \(3\) must equal trail feature count \(2\)/);

    const wrongRecentCount = createArtifacts();
    wrongRecentCount.summary.recentReportCount = 0;
    assert.throws(() => assertTrailDataCounts(wrongRecentCount.trailData, wrongRecentCount.summary), /recentReportCount \(0\) must equal reported trail count \(1\)/);

    const wrongConditionCount = createArtifacts();
    wrongConditionCount.summary.reportedConditions[0].count = 2;
    assert.throws(() => assertTrailDataCounts(wrongConditionCount.trailData, wrongConditionCount.summary), /condition "muddy" \(2\) must equal reported trail count \(1\)/);

    const missingCondition = createArtifacts();
    missingCondition.summary.reportedConditions = [];
    assert.throws(() => assertTrailDataCounts(missingCondition.trailData, missingCondition.summary), /missing reported condition "muddy"/);
  });
});
