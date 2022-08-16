export default (volunteerEventFrontmatter, meetingLocations) => {
  if (volunteerEventFrontmatter.meetingLocation.predefinedLocation !== -1) {
    const location = meetingLocations.find((loc) => loc.frontmatter.id === volunteerEventFrontmatter.meetingLocation.predefinedLocation);
    return {
      name: location.frontmatter.name,
      directionsLink: location.frontmatter.directionsLink,
    };
  }
  return {
    name: volunteerEventFrontmatter.meetingLocation.alternativeLocation,
    directionsLink: volunteerEventFrontmatter.meetingLocation.alternativeLocationDirectionsLink,
  };
};
