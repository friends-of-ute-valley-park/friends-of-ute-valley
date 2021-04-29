<template>
  <li>
    <div class="px-4 py-4 sm:px-6">
      <div class="sm:flex items-center justify-between">
        <nuxt-link :to="'/events/' + volunteerEvent.slug" class="block hover:bg-gray-50">
          <div>
            <p class="text-lg font-medium text-green-600">
              {{ volunteerEvent.title }}
            </p>
            <p class="text-base font-medium text-gray-500 my-2">
              {{ volunteerEvent.description }}
              <span class="text-green-600 font-bold underline">
                Learn More <span aria-hidden="true">&rarr;</span>
              </span>
            </p>
          </div>
        </nuxt-link>
        <div class="sm:ml-2 mt-2 sm:mt-0 flex-shrink-0 flex">
          <div class="">
            <a :href="volunteerEvent.link" class="mb-2 md:my-0 bg-green-500 border border-transparent rounded-md shadow py-1 px-2 inline-flex items-center text-sm font-medium text-green-50 hover:text-green-100 focus:outline-none focus:ring-green-300 focus:ring-2 transition duration-150 ease-in-out">
              Register
            </a>
            <a href="https://coloradosprings.gov/sites/default/files/inline-images/informed_consent_and_release_form-fillable.pdf" class="bg-teal-600 border border-transparent rounded-md shadow py-1 px-2 inline-flex items-center text-sm font-medium text-teal-50 hover:text-teal-100 focus:outline-none focus:ring-teal-300 focus:ring-2 transition duration-150 ease-in-out">
              Consent and Release Form
            </a>
          </div>
        </div>
      </div>
      <div class="mt-2 sm:flex sm:justify-between">
        <div class="sm:flex">
          <a class="mt-2 flex items-center text-sm text-green-700 sm:mt-0 underline" :href="directionsLink">
            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            {{ meetingLocation }}
          </a>
          <span v-if="volunteerEvent.meetingLocation.notes" class="text-gray-500 text-sm max-w-xs md:max-w-none mx-2">{{ volunteerEvent.meetingLocation.notes }}</span>
        </div>
        <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          {{ formattedDate }} {{ volunteerEvent.time }}
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import volunteerEventMixin from '~/mixins/volunteer-event-mixin'

export default {
  mixins: [volunteerEventMixin],
  props: {
    volunteerEvent: {
      type: Object,
      required: true
    },
    meetingLocations: {
      type: Array,
      required: true
    }
  }
}
</script>
