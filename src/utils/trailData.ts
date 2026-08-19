import { trailConditionKeys, type TrailConditionKey } from './trailTaxonomy.ts';

export type TrailDifficultyKey = 'access' | 'easiest' | 'easy' | 'intermediate' | 'difficult' | 'extreme' | 'proline' | 'unknown';
export type TrailReportAgeBucket = 'Today' | '1–2 days ago' | '3–7 days ago' | '8–14 days ago' | 'No report in 14 days';

export type TrailProperties = {
  id: string;
  name: string;
  difficulty: TrailDifficultyKey;
  difficultyLabel: string;
  condition: TrailConditionKey;
  conditionLabel: string;
  reportAgeDays: number | null;
  reportAgeBucket: TrailReportAgeBucket;
  reportedAt: string | null;
  conditionAssumed: boolean;
};

export type TrailFeature = {
  type: 'Feature';
  id: string;
  properties: TrailProperties;
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
};

export type TrailFeatureCollection = {
  type: 'FeatureCollection';
  features: TrailFeature[];
};

export type TrailReportedCondition = {
  condition: TrailConditionKey;
  label: string;
  count: number;
};

export type TrailSummary = {
  generatedAt: string;
  regionId: number;
  maxReportAgeDays: number;
  status: string;
  note: string;
  recentReportCount: number;
  trailCount: number;
  reportedConditions: TrailReportedCondition[];
};

const trailDifficultyKeys: readonly TrailDifficultyKey[] = ['access', 'easiest', 'easy', 'intermediate', 'difficult', 'extreme', 'proline', 'unknown'];
const trailReportAgeBuckets: readonly TrailReportAgeBucket[] = ['Today', '1–2 days ago', '3–7 days ago', '8–14 days ago', 'No report in 14 days'];

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);

const fail = (path: string, expectation: string): never => {
  throw new TypeError(`${path} must be ${expectation}`);
};

const assertRecord: (value: unknown, path: string) => asserts value is Record<string, unknown> = (value, path) => {
  if (!isRecord(value)) fail(path, 'an object');
};

const assertArray: (value: unknown, path: string) => asserts value is unknown[] = (value, path) => {
  if (!Array.isArray(value)) fail(path, 'an array');
};

const assertString: (value: unknown, path: string) => asserts value is string = (value, path) => {
  if (typeof value !== 'string') fail(path, 'a string');
};

const assertNonNegativeInteger: (value: unknown, path: string) => asserts value is number = (value, path) => {
  if (!Number.isInteger(value) || (value as number) < 0) fail(path, 'a non-negative integer');
};

const assertPositiveInteger: (value: unknown, path: string) => asserts value is number = (value, path) => {
  if (!Number.isInteger(value) || (value as number) <= 0) fail(path, 'a positive integer');
};

const assertFiniteNumber: (value: unknown, path: string) => asserts value is number = (value, path) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) fail(path, 'a finite number');
};

const assertNullableString: (value: unknown, path: string) => asserts value is string | null = (value, path) => {
  if (value !== null && typeof value !== 'string') fail(path, 'a string or null');
};

const reportAgeBucketForDays = (days: number): Exclude<TrailReportAgeBucket, 'No report in 14 days'> => {
  if (days === 0) return 'Today';
  if (days <= 2) return '1–2 days ago';
  if (days <= 7) return '3–7 days ago';
  return '8–14 days ago';
};

export function assertTrailFeatureCollection(value: unknown): asserts value is TrailFeatureCollection {
  assertRecord(value, 'trail GeoJSON');
  if (value.type !== 'FeatureCollection') fail('trail GeoJSON.type', '"FeatureCollection"');
  const features = value.features;
  assertArray(features, 'trail GeoJSON.features');

  const featureIds = new Set<string>();

  features.forEach((feature, featureIndex) => {
    const featurePath = `trail GeoJSON.features[${featureIndex}]`;
    assertRecord(feature, featurePath);
    if (feature.type !== 'Feature') fail(`${featurePath}.type`, '"Feature"');
    assertString(feature.id, `${featurePath}.id`);
    if (featureIds.has(feature.id)) throw new TypeError(`${featurePath}.id duplicates trail ID "${feature.id}"`);
    featureIds.add(feature.id);

    assertRecord(feature.properties, `${featurePath}.properties`);
    const properties = feature.properties;
    assertString(properties.id, `${featurePath}.properties.id`);
    if (properties.id !== feature.id) throw new TypeError(`${featurePath}.properties.id must equal ${featurePath}.id`);
    assertString(properties.name, `${featurePath}.properties.name`);
    assertString(properties.difficulty, `${featurePath}.properties.difficulty`);
    if (!trailDifficultyKeys.includes(properties.difficulty as TrailDifficultyKey)) fail(`${featurePath}.properties.difficulty`, 'a known trail difficulty');
    assertString(properties.difficultyLabel, `${featurePath}.properties.difficultyLabel`);
    assertString(properties.condition, `${featurePath}.properties.condition`);
    if (!trailConditionKeys.includes(properties.condition as TrailConditionKey)) fail(`${featurePath}.properties.condition`, 'a known trail condition');
    assertString(properties.conditionLabel, `${featurePath}.properties.conditionLabel`);
    if (properties.reportAgeDays !== null) assertNonNegativeInteger(properties.reportAgeDays, `${featurePath}.properties.reportAgeDays`);
    assertString(properties.reportAgeBucket, `${featurePath}.properties.reportAgeBucket`);
    if (!trailReportAgeBuckets.includes(properties.reportAgeBucket as TrailReportAgeBucket)) fail(`${featurePath}.properties.reportAgeBucket`, 'a known report age bucket');
    assertNullableString(properties.reportedAt, `${featurePath}.properties.reportedAt`);
    if (typeof properties.conditionAssumed !== 'boolean') fail(`${featurePath}.properties.conditionAssumed`, 'a boolean');

    if (properties.conditionAssumed) {
      if (properties.reportAgeDays !== null) fail(`${featurePath}.properties.reportAgeDays`, 'null when conditionAssumed is true');
      if (properties.reportedAt !== null) fail(`${featurePath}.properties.reportedAt`, 'null when conditionAssumed is true');
      if (properties.reportAgeBucket !== 'No report in 14 days') fail(`${featurePath}.properties.reportAgeBucket`, '"No report in 14 days" when conditionAssumed is true');
      if (properties.condition !== 'ideal') fail(`${featurePath}.properties.condition`, '"ideal" when conditionAssumed is true');
    } else {
      const reportAgeDays = properties.reportAgeDays;
      assertNonNegativeInteger(reportAgeDays, `${featurePath}.properties.reportAgeDays`);
      if (reportAgeDays > 14) fail(`${featurePath}.properties.reportAgeDays`, 'no more than 14 when conditionAssumed is false');
      if (properties.reportedAt === null || !Number.isFinite(Date.parse(properties.reportedAt))) fail(`${featurePath}.properties.reportedAt`, 'a valid date string when conditionAssumed is false');
      const expectedBucket = reportAgeBucketForDays(reportAgeDays);
      if (properties.reportAgeBucket !== expectedBucket) throw new TypeError(`${featurePath}.properties.reportAgeBucket must be "${expectedBucket}" for reportAgeDays ${reportAgeDays}`);
    }

    assertRecord(feature.geometry, `${featurePath}.geometry`);
    if (feature.geometry.type !== 'LineString') fail(`${featurePath}.geometry.type`, '"LineString"');
    const coordinates = feature.geometry.coordinates;
    assertArray(coordinates, `${featurePath}.geometry.coordinates`);
    if (coordinates.length < 2) fail(`${featurePath}.geometry.coordinates`, 'an array with at least two positions');
    coordinates.forEach((coordinate, coordinateIndex) => {
      const coordinatePath = `${featurePath}.geometry.coordinates[${coordinateIndex}]`;
      assertArray(coordinate, coordinatePath);
      if (coordinate.length !== 2) fail(coordinatePath, 'a longitude/latitude pair');
      assertFiniteNumber(coordinate[0], `${coordinatePath}[0]`);
      assertFiniteNumber(coordinate[1], `${coordinatePath}[1]`);
    });
  });
}

export function assertTrailSummary(value: unknown): asserts value is TrailSummary {
  assertRecord(value, 'trail summary');
  assertString(value.generatedAt, 'trail summary.generatedAt');
  if (!Number.isFinite(Date.parse(value.generatedAt))) fail('trail summary.generatedAt', 'a valid date string');
  assertNonNegativeInteger(value.regionId, 'trail summary.regionId');
  assertNonNegativeInteger(value.maxReportAgeDays, 'trail summary.maxReportAgeDays');
  assertString(value.status, 'trail summary.status');
  assertString(value.note, 'trail summary.note');
  assertNonNegativeInteger(value.recentReportCount, 'trail summary.recentReportCount');
  assertNonNegativeInteger(value.trailCount, 'trail summary.trailCount');
  const reportedConditions = value.reportedConditions;
  assertArray(reportedConditions, 'trail summary.reportedConditions');

  const conditions = new Set<TrailConditionKey>();
  reportedConditions.forEach((reportedCondition, index) => {
    const conditionPath = `trail summary.reportedConditions[${index}]`;
    assertRecord(reportedCondition, conditionPath);
    assertString(reportedCondition.condition, `${conditionPath}.condition`);
    if (!trailConditionKeys.includes(reportedCondition.condition as TrailConditionKey)) fail(`${conditionPath}.condition`, 'a known trail condition');
    const condition = reportedCondition.condition as TrailConditionKey;
    if (conditions.has(condition)) throw new TypeError(`${conditionPath}.condition duplicates condition "${condition}"`);
    conditions.add(condition);
    assertString(reportedCondition.label, `${conditionPath}.label`);
    assertPositiveInteger(reportedCondition.count, `${conditionPath}.count`);
  });
}

export const assertTrailDataCounts = (trailData: TrailFeatureCollection, summary: TrailSummary): void => {
  if (summary.trailCount !== trailData.features.length) {
    throw new TypeError(`trail summary.trailCount (${summary.trailCount}) must equal trail feature count (${trailData.features.length})`);
  }

  const reportedFeatures = trailData.features.filter(({ properties }) => !properties.conditionAssumed);
  if (summary.recentReportCount !== reportedFeatures.length) {
    throw new TypeError(`trail summary.recentReportCount (${summary.recentReportCount}) must equal reported trail count (${reportedFeatures.length})`);
  }

  const conditionCounts = new Map<TrailConditionKey, number>();
  for (const { properties } of reportedFeatures) {
    conditionCounts.set(properties.condition, (conditionCounts.get(properties.condition) ?? 0) + 1);
  }

  const summaryReportCount = summary.reportedConditions.reduce((total, { condition, count }) => {
    const featureCount = conditionCounts.get(condition) ?? 0;
    if (count !== featureCount) throw new TypeError(`trail summary count for condition "${condition}" (${count}) must equal reported trail count (${featureCount})`);
    conditionCounts.delete(condition);
    return total + count;
  }, 0);

  if (conditionCounts.size > 0) throw new TypeError(`trail summary.reportedConditions is missing reported condition "${conditionCounts.keys().next().value}"`);
  if (summaryReportCount !== summary.recentReportCount) {
    throw new TypeError(`trail summary reported condition count (${summaryReportCount}) must equal recentReportCount (${summary.recentReportCount})`);
  }
};
