import type { CollectionEntry } from 'astro:content';

export type VolunteerEvent = CollectionEntry<'events'>;
export type MeetingLocation = CollectionEntry<'trailheads'>;

type VolunteerEventData = VolunteerEvent['data'];

export function MeetingLocationParser(volunteerEventFrontmatter: VolunteerEventData, meetingLocations: MeetingLocation[]) {
  if (volunteerEventFrontmatter.meetingLocation.predefinedLocation !== -1) {
    const location = meetingLocations.find((loc) => loc.data.id === volunteerEventFrontmatter.meetingLocation.predefinedLocation);
    if (!location) {
      throw new Error(`Meeting location with id ${volunteerEventFrontmatter.meetingLocation.predefinedLocation} not found`);
    }
    return {
      name: location.data.name,
      directionsLink: location.data.directionsLink,
    };
  }
  return {
    name: volunteerEventFrontmatter.meetingLocation.alternativeLocation,
    directionsLink: volunteerEventFrontmatter.meetingLocation.alternativeLocationDirectionsLink,
  };
}
