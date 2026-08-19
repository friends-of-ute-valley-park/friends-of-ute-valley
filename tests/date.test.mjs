import assert from 'node:assert/strict';
import test from 'node:test';

import { getParkHoursForDate, parkHoursFaqAnswer, parkHoursRulesRows, parkHoursVisitLines, seasonalParkHours } from '../src/utils/date.ts';

void test('seasonal park hours contain the official inclusive date ranges and times', () => {
  assert.deepEqual(seasonalParkHours, [
    {
      season: 'Winter',
      starts: { month: 11, day: 1 },
      ends: { month: 4, day: 30 },
      opensAt: { hour: 5, minute: 0 },
      closesAt: { hour: 21, minute: 0 },
    },
    {
      season: 'Summer',
      starts: { month: 5, day: 1 },
      ends: { month: 10, day: 31 },
      opensAt: { hour: 5, minute: 0 },
      closesAt: { hour: 22, minute: 0 },
    },
  ]);
});

void test('getParkHoursForDate observes each seasonal boundary using the local calendar date', () => {
  const cases = [
    [new Date(2026, 3, 30, 23, 59), 'Winter', '5AM to 9PM'],
    [new Date(2026, 4, 1, 0, 0), 'Summer', '5AM to 10PM'],
    [new Date(2026, 9, 31, 23, 59), 'Summer', '5AM to 10PM'],
    [new Date(2026, 10, 1, 0, 0), 'Winter', '5AM to 9PM'],
  ];

  for (const [date, season, hours] of cases) {
    assert.deepEqual({ season: getParkHoursForDate(date).season, hours: getParkHoursForDate(date).hours }, { season, hours });
  }
});

void test('park hours preserve the exact public wording for every consumer', () => {
  assert.deepEqual(
    {
      homepage: {
        winter: getParkHoursForDate(new Date(2026, 0, 15)).hours,
        summer: getParkHoursForDate(new Date(2026, 6, 15)).hours,
      },
      faq: parkHoursFaqAnswer,
      rules: parkHoursRulesRows,
      visitTrailExplorer: parkHoursVisitLines,
    },
    {
      homepage: {
        winter: '5AM to 9PM',
        summer: '5AM to 10PM',
      },
      faq: 'WINTER (Nov 1 — Apr 30): 5 a.m. to 9 p.m. SUMMER (May 1 — Oct 31): 5 a.m. to 10 p.m.',
      rules: [
        { label: 'Winter (Nov-Apr)', hours: '05:00 — 21:00' },
        { label: 'Summer (May-Oct)', hours: '05:00 — 22:00' },
      ],
      visitTrailExplorer: ['5:00 AM — 9:00 PM Winter', '5:00 AM — 10:00 PM Summer'],
    },
  );
});
