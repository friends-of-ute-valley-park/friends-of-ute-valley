export const trailConditionById = {
  0: { key: 'unknown', label: 'Unknown' },
  1: { key: 'snow-packed', label: 'Snow packed' },
  2: { key: 'muddy', label: 'Muddy' },
  3: { key: 'wet', label: 'Wet' },
  4: { key: 'variable', label: 'Variable' },
  5: { key: 'dry', label: 'Dry' },
  6: { key: 'dry', label: 'Very dry' },
  7: { key: 'snow-covered', label: 'Snow covered' },
  8: { key: 'freeze-thaw', label: 'Freeze/thaw' },
  9: { key: 'icy', label: 'Icy' },
  10: { key: 'snow-packed', label: 'Snow groomed' },
  11: { key: 'ideal', label: 'Ideal' },
  12: { key: 'snow-covered', label: 'Partial snow cover' },
} as const;

export type TrailConditionKey = (typeof trailConditionById)[keyof typeof trailConditionById]['key'];

export const trailConditionKeys = [...new Set(Object.values(trailConditionById).map(({ key }) => key))] as TrailConditionKey[];
