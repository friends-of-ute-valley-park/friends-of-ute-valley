type UnknownRecord = Record<string, unknown>;

export type TrailProperties = {
  id: string | number;
  name: string;
  difficulty: string;
  difficultyLabel: string;
  condition: string;
  conditionLabel: string;
  reportAgeDays: number | null;
  reportAgeBucket: string;
  reportedAt: string | null;
  conditionAssumed: boolean;
};

export type TrailFeatureCollection = {
  type: 'FeatureCollection';
  features: Array<{
    type: 'Feature';
    id: string | number;
    properties: TrailProperties;
    geometry: {
      type: 'LineString';
      coordinates: [number, number][];
    };
  }>;
};

const isRecord = (value: unknown): value is UnknownRecord => typeof value === 'object' && value !== null;
const isTrailId = (value: unknown): value is string | number => typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));

const requireString = (value: unknown, field: string, trailId: string | number) => {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Trail feature ${trailId} needs a ${field}`);
  }

  return value;
};

const normalizeCoordinates = (coordinates: unknown, trailId: string | number): [number, number][] => {
  if (!Array.isArray(coordinates) || coordinates.length < 2) {
    throw new Error(`Trail feature ${trailId} needs at least two coordinates`);
  }

  return coordinates.map((coordinate, index) => {
    if (!Array.isArray(coordinate) || coordinate.length < 2 || !Number.isFinite(coordinate[0]) || !Number.isFinite(coordinate[1])) {
      throw new Error(`Trail feature ${trailId} has invalid coordinate ${index}`);
    }

    return [coordinate[0] as number, coordinate[1] as number];
  });
};

export const normalizeTrailData = (data: unknown): TrailFeatureCollection => {
  if (!isRecord(data) || data.type !== 'FeatureCollection' || !Array.isArray(data.features)) {
    throw new Error('Trail data is not a GeoJSON FeatureCollection');
  }

  if (data.features.length === 0) {
    throw new Error('Trail data must contain at least one feature');
  }

  const trailIds = new Set<string>();
  const features = data.features.map((feature, index) => {
    if (!isRecord(feature) || feature.type !== 'Feature' || !isRecord(feature.properties) || !isRecord(feature.geometry)) {
      throw new Error(`Trail feature ${index} is invalid`);
    }

    const propertyTrailId = feature.properties.id;

    if ((feature.id !== undefined && !isTrailId(feature.id)) || (propertyTrailId !== undefined && !isTrailId(propertyTrailId))) {
      throw new Error(`Trail feature ${index} has an invalid ID`);
    }

    if (feature.id !== undefined && propertyTrailId !== undefined && String(feature.id) !== String(propertyTrailId)) {
      throw new Error(`Trail feature ${index} has conflicting IDs`);
    }

    const trailId = feature.id ?? propertyTrailId;

    if (!isTrailId(trailId) || feature.geometry.type !== 'LineString') {
      throw new Error(`Trail feature ${index} needs a stable ID and LineString geometry`);
    }

    const trailIdKey = String(trailId);

    if (trailIds.has(trailIdKey)) {
      throw new Error(`Duplicate trail feature ID: ${trailId}`);
    }

    trailIds.add(trailIdKey);

    const reportAgeDays = feature.properties.reportAgeDays;
    if (reportAgeDays !== null && (typeof reportAgeDays !== 'number' || !Number.isFinite(reportAgeDays) || reportAgeDays < 0)) {
      throw new Error(`Trail feature ${trailId} has an invalid report age`);
    }

    const reportedAt = feature.properties.reportedAt;
    if (reportedAt !== null && typeof reportedAt !== 'string') {
      throw new Error(`Trail feature ${trailId} has an invalid report timestamp`);
    }

    if (typeof feature.properties.conditionAssumed !== 'boolean') {
      throw new Error(`Trail feature ${trailId} needs a conditionAssumed flag`);
    }

    return {
      type: 'Feature' as const,
      id: trailId,
      properties: {
        id: trailId,
        name: requireString(feature.properties.name, 'name', trailId),
        difficulty: requireString(feature.properties.difficulty, 'difficulty', trailId),
        difficultyLabel: requireString(feature.properties.difficultyLabel, 'difficulty label', trailId),
        condition: requireString(feature.properties.condition, 'condition', trailId),
        conditionLabel: requireString(feature.properties.conditionLabel, 'condition label', trailId),
        reportAgeDays,
        reportAgeBucket: requireString(feature.properties.reportAgeBucket, 'report age bucket', trailId),
        reportedAt,
        conditionAssumed: feature.properties.conditionAssumed,
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: normalizeCoordinates(feature.geometry.coordinates, trailId),
      },
    };
  });

  return { type: 'FeatureCollection', features };
};

export const assertMinimumTrailCount = (data: TrailFeatureCollection, minimum: number) => {
  if (!Number.isInteger(minimum) || minimum < 1) {
    throw new Error(`Minimum trail count must be a positive integer; received ${minimum}`);
  }

  if (data.features.length < minimum) {
    throw new Error(`Trail data contains ${data.features.length} features; expected at least ${minimum}`);
  }
};
