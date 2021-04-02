<template>
  <div v-if="isVisible" class="bg-teal-700">
    <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between flex-wrap">
        <div class="flex-1 flex items-center">
          <span class="flex p-2 rounded-lg bg-teal-800">
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
          <p class="ml-3 font-medium text-white truncate">
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
</template>

<script>
export default {
  data () {
    return {
      volunteerEvents: []
    }
  },
  async fetch () {
    this.volunteerEvents = await this.$content('volunteer').where({
      date: { $gt: new Date() }
    }).fetch()
  },
  computed: {
    isVisible () {
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
