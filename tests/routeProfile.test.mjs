import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { buildProfile } from '../src/utils/routeProfile.ts';

await describe('route profile', async () => {
  await it('maps the lowest and highest samples inside the strip and keeps elevations aligned', () => {
    const { pts, elevations, miles } = buildProfile(
      [
        [0, 6538],
        [1, 6236],
        [2, 6592],
      ],
      1200,
      36,
    );

    assert.deepEqual(elevations, [6538, 6236, 6592]);
    assert.equal(miles, 2);
    assert.deepEqual(
      pts.map(([x]) => x),
      [0, 600, 1200],
    );
    assert.ok(pts[2][1] > 0 && pts[2][1] < pts[0][1] && pts[0][1] < pts[1][1] && pts[1][1] < 36);
  });
});
