import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { createTrailheadActivation } from '../src/utils/trailheadPopup.ts';

await describe('createTrailheadActivation', async () => {
  await it('keeps the trailhead active while popup focus blurs its marker', () => {
    const activeValues = [];
    let popupOpen = false;
    const activation = createTrailheadActivation({
      trailheadId: 'south-rockrimmon',
      setActiveTrailhead: (trailheadId) => activeValues.push(trailheadId),
      isPopupOpen: () => popupOpen,
    });

    activation.activate();
    popupOpen = true;
    activation.popupOpened();
    activation.deactivate();

    assert.deepEqual(activeValues, ['south-rockrimmon', 'south-rockrimmon']);
  });

  await it('clears a closed popup unless focus returned to its trigger', () => {
    const activeValues = [];
    const activation = createTrailheadActivation({
      trailheadId: 'south-rockrimmon',
      setActiveTrailhead: (trailheadId) => activeValues.push(trailheadId),
      isPopupOpen: () => false,
    });

    activation.popupClosed(false);
    activation.popupClosed(true);

    assert.deepEqual(activeValues, [undefined, 'south-rockrimmon']);
  });
});
