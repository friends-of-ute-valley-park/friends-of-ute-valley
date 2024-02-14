import type { VolunteerEventFrontmatter, MeetingLocation } from '../../typings/index'

export function MeetingLocationParser(volunteerEventFrontmatter : VolunteerEventFrontmatter, meetingLocations: MeetingLocation[]) {
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
