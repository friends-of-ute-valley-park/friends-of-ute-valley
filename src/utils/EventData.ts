import type { CollectionEntry } from 'astro:content';

import { formatShortMonthDayYear } from './date.ts';

export type VolunteerEvent = CollectionEntry<'events'>;
export type MeetingLocation = CollectionEntry<'trailheads'>;

type VolunteerEventData = VolunteerEvent['data'];

export interface ResolvedMeetingLocation {
  name: string;
  directionsLink: string;
}

export interface VolunteerEventView {
  id: string;
  title: string;
  formattedDate: string;
  time: string;
  meetingLocation: string;
  directionsLink: string;
  meetingNotes?: string;
  registrationLink?: string;
}

export function resolveMeetingLocation(volunteerEventFrontmatter: VolunteerEventData, meetingLocations: MeetingLocation[]): ResolvedMeetingLocation {
  const meetingLocation = volunteerEventFrontmatter.meetingLocation;

  if (meetingLocation.kind === 'custom') {
    if (!meetingLocation.name.trim() || !meetingLocation.directionsLink.trim()) {
      throw new Error('Custom meeting locations require a name and directions link');
    }

    return {
      name: meetingLocation.name,
      directionsLink: meetingLocation.directionsLink,
    };
  }

  const location = meetingLocations.find((loc) => loc.data.id === meetingLocation.trailheadId);
  if (!location) {
    throw new Error(`Trailhead with id ${meetingLocation.trailheadId} not found`);
  }

  return {
    name: location.data.name,
    directionsLink: location.data.directionsLink,
  };
}

export function toVolunteerEventView(volunteerEvent: VolunteerEvent, meetingLocations: MeetingLocation[]): VolunteerEventView {
  const location = resolveMeetingLocation(volunteerEvent.data, meetingLocations);

  return {
    id: volunteerEvent.id,
    title: volunteerEvent.data.title,
    formattedDate: formatShortMonthDayYear(volunteerEvent.data.date),
    time: volunteerEvent.data.time,
    meetingLocation: location.name,
    directionsLink: location.directionsLink,
    ...(volunteerEvent.data.meetingLocation.notes === undefined ? {} : { meetingNotes: volunteerEvent.data.meetingLocation.notes }),
    ...(volunteerEvent.data.link === undefined ? {} : { registrationLink: volunteerEvent.data.link }),
  };
}
