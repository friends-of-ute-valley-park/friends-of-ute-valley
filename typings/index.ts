export interface VolunteerEvent {
  data: VolunteerEventFrontmatter;
  id: string;
}

export interface VolunteerEventFrontmatter {
  title: string;
  description: string;
  date: Date;
  time: string;
  link?: string;
  meetingLocation: {
    notes?: string;
    predefinedLocation: number;
    alternativeLocation?: string;
    alternativeLocationDirectionsLink?: string;
  };
}

export interface MeetingLocation {
  data: {
    id: number;
    name: string;
    directionsLink: string;
  };
}
