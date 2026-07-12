import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { whenElementVisible } from '../src/utils/whenElementVisible.ts';

await describe('whenElementVisible', async () => {
  await it('does not start work until the observed map container intersects', () => {
    const calls = [];
    let onChange;
    const observer = {
      disconnect: () => calls.push('disconnect'),
      observe: (element) => calls.push(['observe', element]),
    };
    const element = { id: 'map-canvas' };

    const cleanup = whenElementVisible(
      element,
      () => calls.push('start'),
      (callback) => {
        onChange = callback;
        return observer;
      },
    );

    assert.deepEqual(calls, [['observe', element]]);
    onChange([{ isIntersecting: false }]);
    assert.deepEqual(calls, [['observe', element]]);

    onChange([{ isIntersecting: true }]);
    assert.deepEqual(calls, [['observe', element], 'disconnect', 'start']);

    onChange([{ isIntersecting: true }]);
    assert.deepEqual(calls, [['observe', element], 'disconnect', 'start']);
    cleanup();
    assert.deepEqual(calls, [['observe', element], 'disconnect', 'start', 'disconnect']);
  });
});
