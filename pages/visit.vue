<template>
  <div class="py-16 bg-gray-50 overflow-hidden lg:py-24">
    <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
      <svg class="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4" width="404" height="784" fill="none" viewBox="0 0 404 784">
        <defs>
          <pattern
            id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
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
        <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
      </svg>

      <div class="relative">
        <h3 class="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Visit Ute Valley Park
        </h3>
        <p class="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
          Explore all Ute Valley Park has to offer. Explore nature and scenic views via hiking, running, bouldering, horseback riding and mountain biking.
        </p>
      </div>

      <div class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div class="relative">
          <h4 class="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
            Getting There
          </h4>
          <p class="mt-3 text-lg leading-7 text-gray-500">
            Ute Valley Park is nestled between Centennial Blvd, Vindicator Dr and I-25 in Colorado Springs with 3 convenient parking locations.
          </p>

          <ul class="mt-10">
            <li v-for="(trailhead, i) in trailheads" :key="trailhead.name" :class="{'mt-10': i !== 0}">
              <nuxt-link
                class="block hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
                :to="{name: 'trailheads-slug', params: {slug: trailhead.slug}}"
              >
                <div class="flex items-center px-4 py-4 sm:px-6">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-4 font-medium text-green-800">
                      {{ trailhead.name }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{ trailhead.description }}
                    </p>
                  </div>
                  <svg class="h-5 w-5 text-green-400 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="mt-10 -mx-4 relative lg:mt-0">
          <svg class="hidden lg:block absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden" width="784" height="404" fill="none" viewBox="0 0 784 404">
            <defs>
              <pattern
                id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
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
            <rect width="784" height="404" fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
          </svg>
          <a href="/maps/ute-valley-park-map-full.jpg">
            <img class="relative mx-auto" width="490" src="~/assets/ute-valley-park-map-small.jpg" alt="Map of Ute Valley Park">
            <p class="mt-1 text-sm leading-6 text-gray-500 text-center">
              Click to open
            </p>
          </a>
        </div>
      </div>

      <!-- Leave No Trace -->
      <div class="bg-green-600 my-16 rounded-lg">
        <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 class="text-3xl leading-9 font-extrabold text-green-50 sm:text-5xl sm:leading-10">
                Leave No Trace
              </h2>
              <p class="mt-3 max-w-3xl text-lg leading-7 text-gray-50">
                Ute Valley Park proudly supports The 7 Principles of Leave No Trace. Please help keep the park safe and clean by following the principles.
              </p>
              <div class="mt-8 sm:flex">
                <div class="rounded-md shadow mx-auto bg-white p-8 w-64">
                  <a href="https://www.lnt.org">
                    <img src="~/assets/logos/leave-no-trace.jpg" alt="Leave No Trace Logo">
                  </a>
                </div>
              </div>
            </div>
            <div class="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
              <div v-for="principle in principles" :key="principle.name" class="col-span-1 flex justify-center bg-gray-50 overflow-hidden relative  bg-gradient-to-t from-gray-700 ">
                <a class="transition text-xl sm:text-2xl font-semibold text-white" :href="principle.url">
                  <img class="transition transform duration-500 opacity-75 hover:opacity-100 hover:scale-105" :src="principle.image" :alt="principle.altText">
                  <span class="absolute inset-x-1 bottom-0">{{ principle.name }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg class="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12" width="404" height="784" fill="none" viewBox="0 0 404 784">
        <defs>
          <pattern
            id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
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
        <rect width="404" height="784" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
      </svg>

      <div class="relative mt-12 sm:mt-16 lg:mt-24">
        <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div class="lg:col-start-2">
            <h4 class="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
              Activities
            </h4>
            <p class="mt-3 text-lg leading-7 text-gray-500">
              Do more at Ute Valley Park by taking advantage of these activities:
            </p>

            <ul class="mt-10">
              <li v-for="(activity, i) in activities" :key="activity.name" :class="{'mt-10': i !== 0}">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-gray-900">
                      {{ activity.name }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{ activity.description }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
            <svg class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden" width="784" height="404" fill="none" viewBox="0 0 784 404">
              <defs>
                <pattern
                  id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
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
              <rect width="784" height="404" fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)" />
            </svg>
            <img class="relative mx-auto w-96 rounded-lg" src="~/assets/activities.jpg" alt="Biker in the air at sunset">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const trailheads = await $content('trailheads')
      .fetch()
    return {
      trailheads
    }
  },
  data () {
    return {
      principles: [
        {
          name: 'Plan Ahead & Prepare',
          url: 'https://lnt.org/why/7-principles/plan-ahead-and-prepare/',
          image: require('~/assets/lnt/plan-ahead-and-prepare.jpg'),
          altText: 'Two hikers near a snow capped mountain'
        },
        {
          name: 'Travel & Camp on Durable Surfaces',
          url: 'https://lnt.org/why/7-principles/travel-camp-on-durable-surfaces/',
          image: require('~/assets/lnt/travel-and-camp-on-durable-surfaces.jpg'),
          altText: 'Hiker on a trail surround by pine trees'
        },
        {
          name: 'Dispose of Waste Properly',
          url: 'https://lnt.org/why/7-principles/dispose-of-waste-properly/',
          image: require('~/assets/lnt/dispose-of-waste-properly.jpg'),
          altText: 'Rubbish in the dirt'
        },
        {
          name: 'Leave What You Find',
          url: 'https://lnt.org/why/7-principles/leave-what-you-find/',
          image: require('~/assets/lnt/leave-what-you-find.jpg'),
          altText: 'Flowers'
        },
        {
          name: 'Minimize Campfire Impacts',
          url: 'https://lnt.org/why/7-principles/minimize-campfire-impacts/',
          image: require('~/assets/lnt/minimize-campfire-impacts.jpg'),
          altText: 'Campsite with a fire'
        },
        {
          name: 'Respect Wildlife',
          url: 'https://lnt.org/why/7-principles/respect-wildlife/',
          image: require('~/assets/lnt/respect-wildlife.jpg'),
          altText: 'Black bear'
        },
        {
          name: 'Be Considerate of Other Visitors',
          url: 'https://lnt.org/why/7-principles/be-considerate-of-other-visitors/',
          image: require('~/assets/lnt/be-considerate-of-other-visitors.jpg'),
          altText: 'Hikers walking in a line in a park'
        }
      ],
      activities: [
        {
          name: 'Hiking',
          description: 'Explore the serene nature within a bustling city. Hike your way through forest and meadow while taking in the fresh air.'
        },
        {
          name: 'Mountain Biking',
          description: 'Ute Valley Park offers a variety of tails suitable to mountain bikers as well as the designated downhill area for the adventurous.'
        },
        {
          name: 'Running',
          description: 'Numerous trails from wide and flat to steep rocky offer joggers and trail runners the perfect opportunity to get outside.'
        },
        {
          name: 'Bouldering',
          description: 'Located in the Southwest corner of the park, near Piñon Park Dr., you can explore the variety of climbing challenges.'
        }
      ]
    }
  },
  head: {
    title: 'Visit'
  }
}
</script>
