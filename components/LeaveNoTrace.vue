<template>
  <div class="bg-green-600 my-16 rounded-lg mx-2 md:mx-0 ">
    <div v-if="isSmall" class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 class="text-4xl font-extrabold tracking-tight text-green-50 sm:text-5xl">
        <span class="block">Leave No Trace</span>
        <span class="block text-green-100 text-2xl border-b-2 border-green-200 pb-2">Ute Valley Park proudly supports The 7 Principles of Leave No Trace.</span>
        <p class="mt-3 max-w-3xl text-lg text-green-100 font-normal">
          Please read and always obey the
          <nuxt-link to="/rules" class="text-gray-50 underline font-bold inline-block">
            rules
          </nuxt-link>
          of Ute Valley Park.
        </p>
      </h2>
      <div class="mt-8 md:ml-8 lg:mt-0 lg:flex-shrink-0">
        <div class="rounded-md shadow mx-auto bg-white p-8 w-64 focus-within:ring-2 focus-within:ring-green-100">
          <a href="https://www.lnt.org">
            <img src="~/assets/logos/leave-no-trace.jpg" alt="Leave No Trace Logo">
          </a>
        </div>
      </div>
    </div>
    <div v-else class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div>
          <h2 class="text-3xl font-extrabold text-green-50 sm:text-5xl text-center">
            Leave No Trace
          </h2>

          <p class="mt-3 max-w-3xl text-lg text-gray-50 border-b-2 border-green-200 pb-2">
            Ute Valley Park proudly supports The 7 Principles of Leave No Trace. Please help keep the park safe and clean by following the principles.
          </p>
          <p class="mt-3 max-w-3xl text-lg text-green-50">
            Please read and always obey the
            <nuxt-link to="/rules" class="text-gray-50 underline font-bold inline-block">
              rules
            </nuxt-link>
            of Ute Valley Park.
          </p>
          <p class="mt-3 max-w-4xl text-xl text-gray-50">
            <svg
              class="w-6 h-6 mb-1 text-gray-100 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
            Fires of any kind are <span class="font-extrabold text-green-50 uppercase">never</span> allowed in Ute Valley Park!
          </p>
          <p class="mt-3 max-w-4xl text-xl text-gray-50">
            <svg class="w-6 h-6 mb-1 text-gray-100 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Camping is <span class="font-extrabold text-green-50 uppercase">never</span> allowed in Ute Valley Park!
          </p>
          <div class="mt-8 sm:flex">
            <div class="rounded-md shadow mx-auto bg-white p-8 w-64 focus-within:ring-2 focus-within:ring-green-100">
              <a href="https://www.lnt.org">
                <img src="~/assets/logos/leave-no-trace.jpg" alt="Leave No Trace Logo">
              </a>
            </div>
          </div>
        </div>
        <div class="mt-8 grid grid-cols-2 gap-0.5 lg:mt-0">
          <div v-for="principle in principles" :key="principle.name" class="col-span-1 flex justify-center bg-gray-50 overflow-hidden relative  bg-gradient-to-t from-gray-700 focus-within:ring-2 focus-within:ring-green-100">
            <a class="transition text-xl font-semibold text-white" :href="principle.url">
              <img class="transition transform duration-500 opacity-75 hover:opacity-100 hover:scale-105" :src="principle.image" :alt="principle.altText">
              <span class="absolute inset-x-1 bottom-0">{{ principle.name }}</span>
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
    isSmall: {
      type: Boolean,
      default: false
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
      ]
    }
  }
}
</script>
