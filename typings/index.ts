export interface VolunteerEvent {
  frontmatter: {
    title: string;
    description: string;
    date: Date;
    time: string;
    link: string;
    meetingLocation: {
      name: string;
      notes: string;
      directionsLink: string;
    };
  };
  url: string;
}

export interface MeetingLocation {
  name: string;
  notes: string;
  directionsLink: string;
}
