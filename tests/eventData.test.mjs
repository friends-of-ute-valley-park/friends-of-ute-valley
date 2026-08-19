import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { resolveMeetingLocation } from '../src/utils/EventData.ts';

const trailheads = [
  {
    data: {
      id: 1,
      name: 'Vindicator Trailhead',
      directionsLink: 'https://example.com/vindicator',
    },
  },
];

const eventData = (meetingLocation) => ({ meetingLocation });

await describe('meeting location resolution', async () => {
  await it('resolves a predefined trailhead by ID', () => {
    assert.deepEqual(resolveMeetingLocation(eventData({ kind: 'trailhead', trailheadId: 1 }), trailheads), {
      name: 'Vindicator Trailhead',
      directionsLink: 'https://example.com/vindicator',
    });
  });

  await it('resolves a custom location directly', () => {
    assert.deepEqual(
      resolveMeetingLocation(
        eventData({
          kind: 'custom',
          name: 'Eagleview Middle School',
          directionsLink: 'https://example.com/eagleview',
        }),
        [],
      ),
      {
        name: 'Eagleview Middle School',
        directionsLink: 'https://example.com/eagleview',
      },
    );
  });

  await it('rejects a trailhead ID that is not available', () => {
    assert.throws(() => resolveMeetingLocation(eventData({ kind: 'trailhead', trailheadId: 99 }), trailheads), /Trailhead with id 99 not found/);
  });

  await it('rejects incomplete custom locations', () => {
    assert.throws(() => resolveMeetingLocation(eventData({ kind: 'custom', name: '', directionsLink: 'https://example.com' }), []), /Custom meeting locations require a name and directions link/);
    assert.throws(() => resolveMeetingLocation(eventData({ kind: 'custom', name: 'Somewhere', directionsLink: '' }), []), /Custom meeting locations require a name and directions link/);
  });
});
