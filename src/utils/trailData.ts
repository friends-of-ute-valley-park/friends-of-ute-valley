import type { TrailConditionKey } from '@/utils/trailTaxonomy';

export type TrailDifficultyKey = 'access' | 'easiest' | 'easy' | 'intermediate' | 'difficult' | 'extreme' | 'proline' | 'unknown';

export type TrailProperties = {
  id: string;
  name: string;
  difficulty: TrailDifficultyKey;
  difficultyLabel: string;
  condition: TrailConditionKey;
  conditionLabel: string;
  reportAgeDays: number | null;
  reportAgeBucket: string;
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
