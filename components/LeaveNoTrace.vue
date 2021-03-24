<template>
  <div>
    <div v-if="isSmall" class="bg-green-600 my-16 rounded-lg mx-4 max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
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
    <div v-else class="bg-gray-100 rounded my-8">
      <div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div class="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          <div class="space-y-5 sm:space-y-4">
            <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Leave No Trace
            </h2>
            <p class="text-xl text-gray-500">
              Ute Valley Park proudly supports the Leave No Trace Seven Principles. Please help keep the park safe and clean by following the principles.
            </p>
            <p class="mt-3 max-w-3xl text-lg text-green-600">
              Please read and always obey the
              <nuxt-link to="/rules" class="text-green-500 underline font-bold inline-block">
                rules
              </nuxt-link>
              of Ute Valley Park.
            </p>
            <div class="mt-8 sm:flex">
              <div class="rounded-md shadow mx-auto bg-white p-8 w-64 focus-within:ring-2 focus-within:ring-green-100">
                <a href="https://www.lnt.org">
                  <img src="~/assets/logos/leave-no-trace.jpg" alt="Leave No Trace Logo">
                </a>
              </div>
            </div>
          </div>
          <div class="lg:col-span-2">
            <ul class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
              <li v-for="principle in principles" :key="principle.name">
                <div class="space-y-4">
                  <div class="aspect-w-3 aspect-h-2">
                    <img class="object-cover shadow-lg rounded-lg" :src="principle.image" :alt="principle.altText">
                  </div>
                  <div class="text-lg leading-6 font-medium">
                    <h3 class="text-green-600">
                      {{ principle.name }}
                    </h3>
                  </div>
                  <div class="text-lg">
                    <p class="text-gray-500">
                      {{ principle.text }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
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
          text: 'A little preparation goes a long way! Checking the forecast, planning your route, and reviewing the Rules and Regulations will help prepare you for your Ute Valley Park adventure.',
          image: require('~/assets/lnt/plan-ahead-and-prepare.jpg'),
          altText: 'A lone tree in Ute Valley Park'
        },
        {
          name: 'Travel on Durable Surfaces',
          text: 'Stay on designated trails to minimize soil erosion and preserve Ute Valley Park’s natural features. Muddy trails? Hike right through them! And please respect Natural Preservation Area closures.',
          image: require('~/assets/lnt/travel-on-durable-surfaces.jpg'),
          altText: 'Ute Valley Park trail'
        },
        {
          name: 'Dispose of Waste Properly',
          text: 'Please pack out all trash items, including bagged dog waste, or place it into trash cans before leaving the park. This keeps Ute Valley Park looking (and smelling) bea-UTE-iful!',
          image: require('~/assets/lnt/dispose-of-waste-properly.jpg'),
          altText: 'Rubbish in the dirt'
        },
        {
          name: 'Leave What You Find',
          text: 'From flowers to frog eggs, Ute Valley Park is full of fascinating features! Remember to take pictures of these fun finds and leave them where they are for other park users to discover.',
          image: require('~/assets/lnt/leave-what-you-find.jpg'),
          altText: 'Flowers'
        },
        {
          name: 'Respect Wildlife',
          text: 'Ute Valley Park provides essential habitat for a variety of animals. Please observe all wildlife from safe distances and never feed them. Keeping your pet on a leash protects everyone who uses, and lives in, the park.',
          image: require('~/assets/lnt/respect-wildlife.jpg'),
          altText: 'A deer in Ute Valley Park'
        },
        {
          name: 'Be Considerate of Other Visitors',
          text: 'Practice recreational empathy! Enhance the experience of other park visitors by sharing the trail. Cyclists should always ride in control. Hikers, be mindful of the Downhill Bike Area trails.',
          image: require('~/assets/lnt/be-considerate-of-other-visitors.jpg'),
          altText: 'Hikers walking on snow in the park'
        }
      ]
    }
  }
}
</script>
