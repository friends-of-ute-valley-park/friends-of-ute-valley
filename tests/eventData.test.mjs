import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { resolveMeetingLocation, toVolunteerEventView } from '../src/utils/EventData.ts';

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
const volunteerEvent = (meetingLocation, { withRegistrationLink = true } = {}) => ({
  id: 'trail-workday',
  data: {
    title: 'Trail Workday',
    date: new Date('2026-08-22T09:00:00.000Z'),
    time: '9:00AM-12:00PM',
    meetingLocation,
    ...(withRegistrationLink ? { link: 'https://example.com/register' } : {}),
  },
});

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

await describe('volunteer event view projection', async () => {
  await it('projects a predefined trailhead event', () => {
    assert.deepEqual(toVolunteerEventView(volunteerEvent({ kind: 'trailhead', trailheadId: 1, notes: 'Meet by the kiosk.' }), trailheads), {
      id: 'trail-workday',
      title: 'Trail Workday',
      formattedDate: 'Aug 22, 2026',
      time: '9:00AM-12:00PM',
      meetingLocation: 'Vindicator Trailhead',
      directionsLink: 'https://example.com/vindicator',
      meetingNotes: 'Meet by the kiosk.',
      registrationLink: 'https://example.com/register',
    });
  });

  await it('projects a custom location event', () => {
    assert.deepEqual(
      toVolunteerEventView(
        volunteerEvent({
          kind: 'custom',
          name: 'Eagleview Middle School',
          directionsLink: 'https://example.com/eagleview',
        }),
        [],
      ),
      {
        id: 'trail-workday',
        title: 'Trail Workday',
        formattedDate: 'Aug 22, 2026',
        time: '9:00AM-12:00PM',
        meetingLocation: 'Eagleview Middle School',
        directionsLink: 'https://example.com/eagleview',
        registrationLink: 'https://example.com/register',
      },
    );
  });

  await it('keeps the registration link optional', () => {
    const view = toVolunteerEventView(volunteerEvent({ kind: 'trailhead', trailheadId: 1 }, { withRegistrationLink: false }), trailheads);

    assert.equal(view.registrationLink, undefined);
    assert.equal(Object.hasOwn(view, 'registrationLink'), false);
  });

  await it('rejects an unknown predefined trailhead ID', () => {
    assert.throws(() => toVolunteerEventView(volunteerEvent({ kind: 'trailhead', trailheadId: 99 }), trailheads), /Trailhead with id 99 not found/);
  });
});
