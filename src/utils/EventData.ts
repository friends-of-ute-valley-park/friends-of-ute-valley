import type { CollectionEntry } from 'astro:content';

export type VolunteerEvent = CollectionEntry<'events'>;
export type MeetingLocation = CollectionEntry<'trailheads'>;

type VolunteerEventData = VolunteerEvent['data'];

export interface ResolvedMeetingLocation {
  name: string;
  directionsLink: string;
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
