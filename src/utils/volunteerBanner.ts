import { formatShortMonthDay } from './date.ts';

export interface VolunteerEventSummary {
  date: Date;
  time: string;
}

export interface VolunteerBannerRenderModel {
  hasUpcomingVolunteerEvent: boolean;
  eventSchedule: string;
}

export const getVolunteerBannerRenderModel = (events: readonly VolunteerEventSummary[]): VolunteerBannerRenderModel => ({
  hasUpcomingVolunteerEvent: events.length > 0,
  eventSchedule: events.map(({ date, time }) => `${formatShortMonthDay(date)} · ${time}`).join(' + '),
});
