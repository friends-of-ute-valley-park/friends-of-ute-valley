export default {
  computed: {
    volunteerDate () {
      return new Date(this.volunteerEvent.date)
    },
    formattedDate () {
      if (this.volunteerEvent.date) {
        return new Intl.DateTimeFormat('en-US').format(this.volunteerDate)
      }
      return null
    },
    predefinedLocation () {
      return this.volunteerEvent.meetingLocation.predefinedLocation
    },
    meetingLocation () {
      if (this.predefinedLocation !== -1) {
        const location = this.meetingLocations.find(loc => loc.id === this.predefinedLocation)
        return location.name
      }
      return this.volunteerEvent.meetingLocation.alternativeLocation
    },
    directionsLink () {
      if (this.predefinedLocation !== -1) {
        const location = this.meetingLocations.find(loc => loc.id === this.predefinedLocation)
        return location.directionsLink
      }
      return this.volunteerEvent.meetingLocation.alternativeLocationDirectionsLink
    }
  }
}
