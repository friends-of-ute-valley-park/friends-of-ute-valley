<template>
  <div>
    <div class="relative bg-white overflow-hidden">
      <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div class="sm:max-w-lg">
            <h1 class="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              We
              <svg class="w-32 h-32 text-red-600 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              Dogs!
            </h1>
            <p class="mt-4 text-xl text-gray-500">
              Dogs are always welcome in Ute Valley Park but please remember you <span class="uppercase font-semibold text-green-600">must</span> leash your furry friend. Ute Valley Park <span class="uppercase font-semibold text-green-600">does not have an off-leash dog area</span> and dogs are required to be leashed at all times.
            </p>
            <p class="mt-2 text-gray-500">
              Also, please follow the rest of the simple rules below to keep other guests, your dog and the wildlife safe.
            </p>
          </div>
          <div>
            <div class="mt-10">
              <div aria-hidden="true" class="lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full">
                <div class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <transition name="fade">
                    <div v-if="showDogs" class="flex items-center space-x-6 lg:space-x-8">
                      <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div class="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100 relative">
                          <a :href="'https://instagram.com/' + dogs[0]">
                            <img :src="require('~/assets/dogs/' + dogs[0] + '.jpg')" alt="" class="w-full h-full object-center object-cover">
                            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">
                              @{{ dogs[0] }}
                            </p>
                          </a>
                        </div>
                        <div class="w-44 h-64 rounded-lg overflow-hidden relative">
                          <a :href="'https://instagram.com/' + dogs[1]">
                            <img :src="require('~/assets/dogs/' + dogs[1] + '.jpg')" alt="" class="w-full h-full object-center object-cover">
                            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">
                              @{{ dogs[1] }}
                            </p>
                          </a>
                        </div>
                      </div>
                      <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div class="w-44 h-64 rounded-lg overflow-hidden relative">
                          <a :href="'https://instagram.com/' + dogs[2]">
                            <img :src="require('~/assets/dogs/' + dogs[2] + '.jpg')" alt="" class="w-full h-full object-center object-cover">
                            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">
                              @{{ dogs[2] }}
                            </p>
                          </a>
                        </div>
                        <div class="w-44 h-64 rounded-lg overflow-hidden relative">
                          <a :href="'https://instagram.com/' + dogs[3]">
                            <img :src="require('~/assets/dogs/' + dogs[3] + '.jpg')" alt="" class="w-full h-full object-center object-cover">
                            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">
                              @{{ dogs[3] }}
                            </p>
                          </a>
                        </div>
                        <div class="w-44 h-64 rounded-lg overflow-hidden relative">
                          <a :href="'https://instagram.com/' + dogs[0]">
                            <img :src="require('~/assets/dogs/' + dogs[0] + '.jpg')" alt="" class="w-full h-full object-center object-cover">
                            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">
                              @{{ dogs[0] }}
                            </p>
                          </a>
                        </div>
                      </div>
                      <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div class="w-44 h-64 rounded-lg overflow-hidden relative">
                          <a :href="'https://instagram.com/' + dogs[2]">
                            <img :src="require('~/assets/dogs/' + dogs[2] + '.jpg')" alt="" class="w-full h-full object-center object-cover">
                            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">
                              @{{ dogs[2] }}
                            </p>
                          </a>
                        </div>
                        <div class="w-44 h-64 rounded-lg overflow-hidden relative">
                          <a :href="'https://instagram.com/' + dogs[1]">
                            <img :src="require('~/assets/dogs/' + dogs[1] + '.jpg')" alt="" class="w-full h-full object-center object-cover">
                            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">
                              @{{ dogs[1] }}
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
              <div class="flex flex-wrap w-60 sm:w-full relative z-50">
                <a href="#off-leash" class="grow-0 inline-block text-center bg-green-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-green-700">Off-leash Parks</a>
                <a href="#rules" class="ml-0 sm:ml-2 mt-2 sm:mt-0 grow-0 inline-block text-center bg-teal-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-teal-700">Rules</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="off-leash" class="max-w-xl mx-auto pt-24 px-4 sm:pt-32 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
        Off-leash dog parks in Colorado Springs
      </h2>
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-8">
        <li v-for="park in otherParks" :key="park.name" class="col-span-1 mx-16 sm:mx-0 flex flex-col text-center bg-white rounded-lg shadow-lg divide-y divide-gray-200">
          <div class="flex-1 flex flex-col">
            <img class="w-full overflow-hidden h-48 rounded-t-lg" :src="park.image" alt="">
            <div class="px-8 py-6">
              <h3 class="mt-6 text-gray-900 text-sm font-medium">
                {{ park.name }}
              </h3>
              <dl class="mt-1 flex-grow flex flex-col justify-between">
                <dt class="sr-only">
                  Park Type
                </dt>
                <dd class="text-gray-500 text-sm">
                  {{ park.type }} off-leash park
                </dd>
              </dl>
              <h4 class="mt-4 text-gray-800">
                How close is this park to <span class="text-green-800">Ute Valley Park?</span>
              </h4>
              <dl class="flex justify-center">
                <dt class="sr-only">
                  Distance
                </dt>
                <dd class="mt-3 mx-2">
                  <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full whitespace-nowrap">{{ park.distance }}</span>
                </dd>
                <dt class="sr-only">
                  Time
                </dt>
                <dd class="mt-3 mx-2">
                  <span class="px-2 py-1 text-teal-800 text-xs font-medium bg-teal-100 rounded-full whitespace-nowrap">{{ park.time }}</span>
                </dd>
              </dl>
            </div>
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div class="w-0 flex-1 flex">
                <a :href="park.mapLink" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span class="ml-3">Visit</span>
                </a>
              </div>
              <div class="-ml-px w-0 flex-1 flex">
                <a :href="park.cityLink" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span class="ml-3">Info</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div id="rules" class="w-full flex justify-center items-center">
        <a class="my-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" href="https://coloradosprings.gov/parks/page/dog-parks?mlid=4736">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          All Colorado Springs Off-leash dog parks</a>
      </div>
    </div>
    <div class="max-w-xl mx-auto pt-24 px-4 sm:pt-32 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-3/5">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Top reasons to keep your dog on a leash at all times
          </h2>
          <ul role="list" class="space-y-3 mt-8">
            <li v-for="(reason, i) in reasons" :key="i" class="bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md">
              <svg class="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="reason" />
            </li>
          </ul>
        </div>
        <div class="w-4/5 lg:w-2/5 mx-auto mt-16 lg:p-8 lg:m-0">
          <img class="rounded shadow" src="~/assets/dog.jpg">
        </div>
      </div>
    </div>
    <div class="max-w-xl mx-auto pt-24 px-4 sm:pt-32 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
        Rules for dogs at Ute Valley Park
      </h2>
      <ul role="list" class="space-y-3 mt-8">
        <li v-for="(rule, i) in rules" :key="i" class="bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md">
          <svg class="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="rule" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDogs: false,
      dogs: [
        'freyja_pup',
        'the.sweet.life.of.five',
        'logan.and.the.rescue.crew',
        'marisslh'
      ],
      otherParks: [
        {
          name: 'Red Rock Canyon Open Space',
          image: require('~/assets/other-parks/red-rock-canyon-open-space.jpg'),
          type: 'Unfenced',
          distance: '7.5 miles',
          time: '15 minutes',
          mapLink: 'https://goo.gl/maps/qAKchVJRqyTYUc8v9',
          cityLink: 'https://coloradosprings.gov/parks/page/red-rock-canyon-open-space'
        },
        {
          name: 'Palmer Park',
          image: require('~/assets/other-parks/palmer-park.jpg'),
          type: 'Fenced',
          distance: '9.8 miles',
          time: '20 minutes',
          mapLink: 'https://goo.gl/maps/sgxAgR8Mnjr86Qt98',
          cityLink: 'https://coloradosprings.gov/parks/page/palmer-park'
        },
        {
          name: 'Garden of the Gods',
          image: require('~/assets/other-parks/garden-of-the-gods.jpg'),
          type: 'Unfenced',
          distance: '6.9 miles',
          time: '14 minutes',
          mapLink: 'https://goo.gl/maps/Vj2851x6X2JSNeX76',
          cityLink: 'https://coloradosprings.gov/parks/page/garden-gods'
        },
        {
          name: 'Rampart Dog Park',
          image: require('~/assets/other-parks/rampart-dog-park.jpg'),
          type: 'Fenced',
          distance: '6.6 miles',
          time: '15 minutes',
          mapLink: 'https://goo.gl/maps/UEAzoaFGxCTFi7Qo9',
          cityLink: 'https://coloradosprings.gov/parks/page/rampart-park'
        }
      ],
      reasons: [
        "It's the law! <a class='text-green-600 underline' href='https://codelibrary.amlegal.com/codes/coloradospringsco/latest/coloradosprings_co/0-0-0-7038'>6.7.107</a>",
        'Ute Valley Park is visited by many people and not everyone is a dog person.',
        'Not all dogs are friendly, even if your dog is.',
        'Ute Valley Park is infamous for rattlesnakes.  Keep your dog and wildlife safe by keeping them leashed.'

      ],
      rules: [
        "Ute Valley Park is not an off-leash dog park. Please see the available off-leash dog parks in <a class='underline color-green-600' href='off-leash'>Colorado Springs</a>.",
        "Follow the  <a class='text-green-600 underline' href='https://coloradosprings.gov/parks/page/ute-valley-park'>Leave No Trace</a> principles",
        'Always clean up and dispose of pet waste properly in a trashcan.',
        'Please see other park rules for <a class="underline text-green-600" href="/rules">Ute Valley Park</a>.'
      ]
    }
  },
  mounted () {
    this.randomize()
    this.showDogs = true
  },
  methods: {
    randomize () {
      for (let i = this.dogs.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i)
        const temp = this.dogs[i]
        this.$set(this.dogs, i, this.dogs[randomIndex])
        this.$set(this.dogs, randomIndex, temp)
      }
    }
  }

}
</script>

<style>
.fade-enter-active {
  transition: all .5s ease-in;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
