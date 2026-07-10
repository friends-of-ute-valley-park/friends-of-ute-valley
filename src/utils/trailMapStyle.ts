export const difficultyColor = ['match', ['get', 'difficulty'], ['easiest', 'easy'], '#2f7d4a', 'intermediate', '#2367a5', ['difficult', 'extreme', 'proline'], '#272c2a', '#66706a'];

export const conditionColor = [
  'match',
  ['get', 'condition'],
  ['ideal', 'dry'],
  '#2f7d4a',
  'muddy',
  '#a34f22',
  'wet',
  '#23708a',
  'icy',
  '#247d9b',
  ['snow-packed', 'snow-covered'],
  '#4f74a8',
  'freeze-thaw',
  '#76549a',
  'variable',
  '#b06c16',
  '#66706a',
];

export const conditionOpacity = [
  'case',
  ['==', ['get', 'conditionAssumed'], true],
  0.38,
  ['<=', ['coalesce', ['get', 'reportAgeDays'], 15], 2],
  0.96,
  ['<=', ['coalesce', ['get', 'reportAgeDays'], 15], 7],
  0.76,
  0.54,
];
