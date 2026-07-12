import type { DataDrivenPropertyValueSpecification } from 'maplibre-gl';
import type { TrailConditionKey } from '@/utils/trailTaxonomy';

export type VisitTrailhead = {
  id: string;
  displayId: string;
  name: string;
  description: string;
  coordinates: [number, number];
  url: string;
};

export type TrailMapMode = 'difficulty' | 'conditions';

export type TrailMapLegendItem = {
  label: string;
  color: string;
  treatment?: 'faded';
};

const palette = {
  green: '#2f7d4a',
  blue: '#2367a5',
  black: '#272c2a',
  gray: '#66706a',
  orange: '#a34f22',
  teal: '#23708a',
  ice: '#247d9b',
  snow: '#4f74a8',
  purple: '#76549a',
  amber: '#b06c16',
} as const;

type TrailCategory<Key extends string = string> = {
  label: string;
  keys: readonly Key[];
  color: string;
};

const difficultyCategories: TrailCategory[] = [
  { label: 'Easy', keys: ['easiest', 'easy'], color: palette.green },
  { label: 'Intermediate', keys: ['intermediate'], color: palette.blue },
  { label: 'Difficult+', keys: ['difficult', 'extreme', 'proline'], color: palette.black },
];

const conditionCategories: TrailCategory<TrailConditionKey>[] = [
  { label: 'Dry / ideal', keys: ['ideal', 'dry'], color: palette.green },
  { label: 'Muddy', keys: ['muddy'], color: palette.orange },
  { label: 'Wet', keys: ['wet'], color: palette.teal },
  { label: 'Icy', keys: ['icy'], color: palette.ice },
  { label: 'Snow', keys: ['snow-packed', 'snow-covered'], color: palette.snow },
  { label: 'Freeze / thaw', keys: ['freeze-thaw'], color: palette.purple },
  { label: 'Variable', keys: ['variable'], color: palette.amber },
  { label: 'Unknown', keys: ['unknown'], color: palette.gray },
];

export const conditionCategoryKeys = conditionCategories.flatMap(({ keys }) => keys);

const createColorExpression = (property: string, categories: TrailCategory[]) =>
  ['match', ['get', property], ...categories.flatMap(({ keys, color }) => [keys.length === 1 ? keys[0] : [...keys], color]), palette.gray] as unknown as DataDrivenPropertyValueSpecification<string>;

export const difficultyColor = createColorExpression('difficulty', difficultyCategories);
export const conditionColor = createColorExpression('condition', conditionCategories);

export const conditionOpacity: DataDrivenPropertyValueSpecification<number> = [
  'case',
  ['==', ['get', 'conditionAssumed'], true],
  0.38,
  ['<=', ['coalesce', ['get', 'reportAgeDays'], 15], 2],
  0.96,
  ['<=', ['coalesce', ['get', 'reportAgeDays'], 15], 7],
  0.76,
  0.54,
];

export const trailMapModes: Record<TrailMapMode, { label: string; legend: TrailMapLegendItem[] }> = {
  difficulty: {
    label: 'Trail difficulty',
    legend: [...difficultyCategories.map(({ label, color }) => ({ label, color })), { label: 'Access / unknown', color: palette.gray }],
  },
  conditions: {
    label: 'Recent conditions',
    legend: [...conditionCategories.map(({ label, color }) => ({ label, color })), { label: 'Faded = older / assumed', color: palette.gray, treatment: 'faded' }],
  },
};
