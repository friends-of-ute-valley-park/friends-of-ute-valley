import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { conditionCategoryKeys, conditionColor, difficultyColor, trailMapModes } from '../src/utils/trailMapModel.ts';
import { trailConditionKeys } from '../src/utils/trailTaxonomy.ts';

await describe('trail map model', async () => {
  await it('derives every difficulty legend color from the MapLibre expression', () => {
    const expressionColors = new Set(difficultyColor.filter((value) => typeof value === 'string' && value.startsWith('#')));

    for (const item of trailMapModes.difficulty.legend) {
      assert.ok(expressionColors.has(item.color), `${item.label} is missing from the difficulty expression`);
    }
  });

  await it('derives condition colors from the same categories and labels fading accurately', () => {
    const expressionColors = new Set(conditionColor.filter((value) => typeof value === 'string' && value.startsWith('#')));
    const conditionLegend = trailMapModes.conditions.legend;
    const categoryItems = conditionLegend.filter((item) => item.treatment !== 'faded');
    const fadedItem = conditionLegend.find((item) => item.treatment === 'faded');

    for (const item of categoryItems) {
      assert.ok(expressionColors.has(item.color), `${item.label} is missing from the condition expression`);
    }
    assert.equal(fadedItem?.label, 'Faded = older / assumed');
  });

  await it('explains every condition key the generator can emit', () => {
    assert.deepEqual(new Set(conditionCategoryKeys), new Set(trailConditionKeys));
    assert.ok(trailMapModes.conditions.legend.some(({ label }) => label === 'Unknown'));
  });
});
