<template>
  <div class="relative py-16 bg-white overflow-hidden">
    <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
      <div class="relative h-full text-lg max-w-prose mx-auto">
        <svg class="absolute top-12 left-full transform translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
          <defs>
            <pattern
              id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
        </svg>
        <svg class="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
          <defs>
            <pattern
              id="f210dbf6-a58d-4871-961e-36d5016a0f49"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
        </svg>
        <svg class="absolute bottom-12 left-full transform translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
          <defs>
            <pattern
              id="d3eb07ae-5182-43e6-857d-35c643af9034"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
        </svg>
      </div>
    </div>
    <div class="relative px-4 sm:px-6 lg:px-8">
      <div class="text-lg max-w-prose mx-auto mb-6">
        <h1 class="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          {{ volunteerEvent.title }}
        </h1>
        <img loading="lazy" class="h-96 w-full object-cover rounded-lg shadow-lg" src="~/assets/volunteer.jpg" alt="volunteers working in Ute Valley Park">
        <div class="mt-6 sm:flex sm:justify-between">
          <div class="sm:flex">
            <a class="mt-2 flex items-center text-lg text-green-700 sm:mt-0 underline" :href="directionsLink">
              <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              {{ meetingLocation }}
            </a>
          </div>
          <div class="mt-2 flex items-center text-lg text-gray-500 sm:mt-0">
            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            {{ formattedDate }} {{ volunteerEvent.time }}
          </div>
        </div>
        <div class="prose lg:prose-xl">
          <nuxt-content :document="volunteerEvent" />
        </div>
        <div class="sm:ml-2 mt-2 sm:mt-0 flex-shrink-0 flex">
          <div>
            <a :href="volunteerEvent.link" class="mb-2 md:my-0 bg-green-500 border border-transparent rounded-md shadow py-3 px-6 inline-flex items-center text-base font-medium text-green-50 hover:text-green-100 focus:outline-none focus:ring-green-300 focus:ring-2 transition duration-150 ease-in-out">
              Register
            </a>
            <a href="https://coloradosprings.gov/sites/default/files/inline-images/informed_consent_and_release_form-fillable.pdf" class="bg-teal-600 border border-transparent rounded-md shadow py-3 px-6 inline-flex items-center text-base font-medium text-teal-50 hover:text-teal-100 focus:outline-none focus:ring-teal-300 focus:ring-2 transition duration-150 ease-in-out">
              Consent and Release Form
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import volunteerEventMixin from '~/mixins/volunteer-event-mixin'

export default {
  mixins: [volunteerEventMixin],
  async asyncData ({ $content, params, error }) {
    const slug = params.slug || 'index'
    const meetingLocations = await $content('trailheads').only(['id', 'name', 'directionsLink']).fetch()
    const volunteerEvent = await $content(`volunteer/${slug}`)
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Event not found' })
      })

    return {
      volunteerEvent,
      meetingLocations
    }
  },
  head () {
    return {
      title: this.volunteerEvent?.title,
      meta: [
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:site',
          content: '@FriendsUVP'
        },
        {
          name: 'twitter:title',
          content: this.volunteerEvent?.title
        },
        {
          name: 'twitter:image',
          content: require('~/assets/volunteer.jpg')
        },
        {
          name: 'twitter:description',
          content: this.volunteerEvent?.body
        },
        {
          name: 'description',
          content: this.volunteerEvent?.body
        }
      ]
    }
  }
}
</script>
