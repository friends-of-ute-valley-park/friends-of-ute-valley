import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { createTrailheadActivation, dismissPopupOnEscape, dismissPopupWithFocusReturn } from '../src/utils/trailheadPopup.ts';

await describe('dismissPopupWithFocusReturn', async () => {
  await it('restores trigger focus before removing the popup', () => {
    const calls = [];

    dismissPopupWithFocusReturn(
      () => calls.push('focus'),
      () => calls.push('dismiss'),
    );

    assert.deepEqual(calls, ['focus', 'dismiss']);
  });
});

await describe('dismissPopupOnEscape', async () => {
  await it('prevents Escape, restores trigger focus, and then dismisses the popup', () => {
    const calls = [];
    const event = {
      key: 'Escape',
      preventDefault: () => calls.push('prevent'),
    };

    const dismissed = dismissPopupOnEscape(
      event,
      () => calls.push('focus'),
      () => calls.push('dismiss'),
    );

    assert.equal(dismissed, true);
    assert.deepEqual(calls, ['prevent', 'focus', 'dismiss']);
  });

  await it('ignores other keys', () => {
    const calls = [];
    const dismissed = dismissPopupOnEscape(
      { key: 'Enter', preventDefault: () => calls.push('prevent') },
      () => calls.push('focus'),
      () => calls.push('dismiss'),
    );

    assert.equal(dismissed, false);
    assert.deepEqual(calls, []);
  });
});

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
