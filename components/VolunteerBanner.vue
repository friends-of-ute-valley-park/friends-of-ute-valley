<template>
  <div>
    <div v-if="hasUpcomingVolunteerEvent">
      <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="p-2 rounded-lg bg-teal-600 shadow-lg sm:p-3">
          <div class="flex items-center justify-between flex-wrap">
            <div class="flex-1 flex items-center">
              <span class="flex p-2 rounded-lg bg-teal-700">
                <svg
                  class="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </span>
              <p class="ml-3 font-medium text-white">
                Upcoming volunteer <span class="font-semibold">{{ eventDates }}!</span>
                <span class="block sm:ml-2 sm:inline-block">
                  <nuxt-link to="/volunteer" class="text-white font-bold underline">
                    Learn More <span aria-hidden="true">&rarr;</span>
                  </nuxt-link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="p-2 rounded-lg bg-green-600 shadow-lg sm:p-3">
          <div class="flex items-center justify-between flex-wrap">
            <div class="flex-1 flex items-center">
              <span class="flex p-2 rounded-lg bg-green-700" v-html="leavenotrace[0].icon" />
              <p class="ml-3 font-medium text-white">
                {{ leavenotrace[0].text }}
                <span class="block sm:ml-2 sm:inline-block">
                  <nuxt-link :to="leavenotrace[0].link" class="text-white font-bold underline">
                    Learn More <span aria-hidden="true">&rarr;</span>
                  </nuxt-link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      volunteerEvents: [],
      leavenotrace: [
        {
          text: 'Reminder! Dogs must be leashed in Ute Valley Park at all times.  Find a nearby off-leash park.',
          link: '/leavenotrace/dogs',
          icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>'
        }
      ]
    }
  },
  async fetch () {
    this.volunteerEvents = await this.$content('volunteer').where({
      date: { $gt: new Date().valueOf() }
    }).fetch()
  },
  computed: {
    hasUpcomingVolunteerEvent () {
      return this.volunteerEvents.length > 0
    },
    eventDates () {
      if (this.volunteerEvents === null) { return }

      const filteredDates = this.volunteerEvents.filter((obj, index, arr) => {
        return arr.map(mapObj => mapObj.date).indexOf(obj.date) === index
      })

      let dateString = 'day'
      if (filteredDates.length > 1) {
        dateString += 's'
      }
      dateString += ' on '
      dateString += filteredDates.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      }).map((item) => {
        return this.formatDate(item.date)
      }).join(' and ')
      return dateString
    }
  },
  methods: {
    formatDate (eventDate) {
      return new Intl.DateTimeFormat('en-US').format(new Date(eventDate))
    }
  }
}
</script>
