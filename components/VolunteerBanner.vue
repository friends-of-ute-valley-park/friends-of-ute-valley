<template>
  <div v-if="isVisible">
    <div v-if="isExpanded" class="mb-2 lg:mb-8">
      <h2 class="text-4xl font-extrabold sm:text-5xl sm:leading-none sm:tracking-tight">
        <span class="flex">
          <svg
            class="h-12 w-12 mr-2 text-green-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          <span class="text-green-900">Upcoming Volunteer Day {{ formattedDate }} at {{ volunteerInfo.time }}!</span>
        </span>
      </h2>
      <p class="text-lg text-gray-500 py-3">
        {{ volunteerInfo.meetingLocation }}
      </p>
      <p class="text-lg text-gray-500">
        {{ volunteerInfo.description }}
      </p>
      <a href="volunteerInfo.link" class="my-8 bg-green-500 border border-transparent rounded-md shadow py-3 px-6 inline-flex items-center text-base font-medium text-green-50 hover:text-green-100 focus:outline-none focus:border-green-300 focus:ring-green transition duration-150 ease-in-out">
        Register
      </a>
    </div>
    <div v-else class="bg-teal-700">
      <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
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
              Upcoming volunteer day on <span class="font-semibold">{{ formattedDate }}!</span>
              <span class="block sm:ml-2 sm:inline-block">
                <nuxt-link to="/volunteer" class="text-white font-bold underline">
                  Learn More <span aria-hidden="true">&rarr;</span>
                </nuxt-link>
              </span>
            </p>
          </div>
          <div class="order-3 mt-4 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <a :href="volunteerInfo.link" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-teal-600 bg-white hover:bg-teal-50">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      volunteerInfo: []
    }
  },
  async fetch () {
    this.volunteerInfo = await this.$content('volunteer').fetch()
  },
  computed: {
    volunteerDate () {
      return new Date(this.volunteerInfo.date)
    },
    isVisible () {
      return this.volunteerDate > new Date()
    },
    formattedDate () {
      if (this.volunteerInfo.date) {
        return new Intl.DateTimeFormat('en-US').format(this.volunteerDate)
      }
      return null
    }
  }
}
</script>
