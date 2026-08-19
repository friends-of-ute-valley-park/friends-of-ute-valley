import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getVolunteerBannerRenderModel } from '../src/utils/volunteerBanner.ts';

const event = (date, time) => ({ date: new Date(date), time });

await describe('volunteer banner server render model', async () => {
  await it('omits the banner when there are no upcoming events', () => {
    assert.deepEqual(getVolunteerBannerRenderModel([]), {
      hasUpcomingVolunteerEvent: false,
      eventSchedule: '',
    });
  });

  await it('renders one event with the local short date and time', () => {
    assert.deepEqual(getVolunteerBannerRenderModel([event('2026-06-03T12:00:00', '5:30-7:30PM')]), {
      hasUpcomingVolunteerEvent: true,
      eventSchedule: 'Jun 03 · 5:30-7:30PM',
    });
  });

  await it('joins multiple event summaries in their existing order', () => {
    assert.deepEqual(getVolunteerBannerRenderModel([event('2026-06-03T12:00:00', '5:30-7:30PM'), event('2026-07-15T12:00:00', '5:30-7:30PM')]), {
      hasUpcomingVolunteerEvent: true,
      eventSchedule: 'Jun 03 · 5:30-7:30PM + Jul 15 · 5:30-7:30PM',
    });
  });
});
