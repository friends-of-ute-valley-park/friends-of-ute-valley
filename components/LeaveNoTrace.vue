<template>
  <div class="bg-green-600 my-16 rounded-lg">
    <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div>
          <h2 class="text-3xl font-extrabold text-green-50 sm:text-5xl text-center">
            Leave No Trace
          </h2>
          <p class="mt-3 max-w-3xl text-lg text-gray-50">
            Ute Valley Park proudly supports The 7 Principles of Leave No Trace. Please help keep the park safe and clean by following the principles.
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
