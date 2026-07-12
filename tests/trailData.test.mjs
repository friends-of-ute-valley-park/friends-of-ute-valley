import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { assertMinimumTrailCount, normalizeTrailData } from '../src/utils/trailData.ts';

const trailFeature = (overrides = {}) => ({
  type: 'Feature',
  id: '101',
  properties: {
    id: '101',
    name: 'Rattlesnake Ridge',
    difficulty: 'difficult',
    difficultyLabel: 'Very difficult',
    condition: 'dry',
    conditionLabel: 'Dry',
    reportAgeDays: 1,
    reportAgeBucket: '1–2 days ago',
    reportedAt: '2026-07-11T12:00:00.000Z',
    conditionAssumed: false,
  },
  geometry: {
    type: 'LineString',
    coordinates: [
      [-104.85, 38.91],
      [-104.84, 38.92],
    ],
  },
  ...overrides,
});

await describe('normalizeTrailData', async () => {
  await it('returns a normalized feature collection for valid generated data', () => {
    const result = normalizeTrailData({ type: 'FeatureCollection', features: [trailFeature()] });

    assert.equal(result.features[0].id, '101');
    assert.deepEqual(result.features[0].geometry.coordinates[1], [-104.84, 38.92]);
  });

  await it('rejects non-finite coordinates before generated data is written', () => {
    const feature = trailFeature({
      geometry: {
        type: 'LineString',
        coordinates: [
          [-104.85, 38.91],
          [Number.NaN, 38.92],
        ],
      },
    });

    assert.throws(() => normalizeTrailData({ type: 'FeatureCollection', features: [feature] }), /invalid coordinate 1/);
  });

  await it('rejects missing properties used by the map UI', () => {
    const feature = trailFeature();
    delete feature.properties.conditionLabel;

    assert.throws(() => normalizeTrailData({ type: 'FeatureCollection', features: [feature] }), /needs a condition label/);
  });

  await it('rejects duplicate stable IDs', () => {
    assert.throws(() => normalizeTrailData({ type: 'FeatureCollection', features: [trailFeature(), trailFeature()] }), /Duplicate trail feature ID: 101/);
  });

  await it('rejects an empty feature collection', () => {
    assert.throws(() => normalizeTrailData({ type: 'FeatureCollection', features: [] }), /must contain at least one feature/);
  });

  await it('protects generated data from a suspiciously low upstream trail count', () => {
    const data = normalizeTrailData({ type: 'FeatureCollection', features: [trailFeature()] });

    assert.throws(() => assertMinimumTrailCount(data, 20), /contains 1 features; expected at least 20/);
  });
});
