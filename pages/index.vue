<template>
  <div>
    <volunteer-banner class="mb-8" />
    <main class="mt-2 mx-auto max-w-7xl px-4 sm:px-6  bg-gray-50">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        <div class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
          <h1 class="mt-12">
            <span class="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
              <span class="inline text-gray-900">Friends of</span>
              <span class="inline text-green-600">Ute Valley Park</span>
            </span>
          </h1>
          <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
            Friends of Ute Valley Park is an officially recognized “Friends” organization by the City of Colorado Springs Parks, Recreation, and Cultural Services Department. Our mission is to maintain, preserve, and provide education for Ute Valley Park.
          </p>
          <email-form class="mt-8" />
        </div>
        <div class="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
          <div class="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
            <div type="button" class="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">Watch our video to learn more</span>
              <img class="w-full" src="~/assets/ute-valley-park.jpg" alt="Ute Valley Park">
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- CTA -->

    <div class="relative pt-16 px-4 sm:px-6 lg:pt-24 lg:px-8">
      <div class="absolute inset-0 flex flex-col" aria-hidden="true">
        <div class="flex-1 bg-gray-50" />
        <div class="flex-1" />
      </div>
      <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-green-400 to-teal-600 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div class="lg:self-center">
              <h2 class="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
                <span class="block">Ready to help?</span>
                <span class="block text-green-900">Donate or Volunteer today.</span>
              </h2>
              <p class="mt-4 text-lg leading-6 text-orange-50">
                Get involved and help Ute Valley Park by making a tax deductible donation or volunteering.
              </p>
              <nuxt-link to="/donate" class="mt-8 bg-green-100 border border-transparent rounded-md shadow py-3 px-6 inline-flex items-center text-base font-medium text-green-700 hover:text-green-600 focus:outline-none focus:ring-green-300 focus:ring-2 transition duration-150 ease-in-out">
                Donate
              </nuxt-link>
              <nuxt-link to="/volunteer" class="mt-8 bg-teal-100 border border-transparent rounded-md shadow py-3 ml-2 px-6 inline-flex items-center text-base font-medium text-teal-700 hover:text-teal-600 focus:outline-none focus:ring-teal-300 focus:ring-2 transition duration-150 ease-in-out">
                Volunteer
              </nuxt-link>
            </div>
          </div>
          <div class="relative pb-3/5 -mt-6 md:pb-1/2">
            <img class="absolute inset-0 w-full h-full transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20" src="~/assets/volunteer.jpg" alt="App screenshot">
          </div>
        </div>
      </div>
    </div>

    <!-- News -->

    <div class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div class="absolute inset-0">
        <div class="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div class="relative max-w-7xl mx-auto">
        <div class="text-center">
          <h2 class="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Ute Valley Park News
          </h2>
          <p class="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            Find out what is happening in and around Ute Valley Park
          </p>
        </div>
        <div class="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          <base-card v-for="newsItem in news" :key="newsItem.slug" :news="newsItem" />
        </div>
      </div>
    </div>
    <leave-no-trace />
  </div>
</template>

<script>
export default {
  data () {
    return {
      news: []
    }
  },
  async fetch () {
    this.news = await this.$content('news').sortBy('publishedOn', 'desc').limit(3).fetch()
  },
  head () {
    return {
      title: 'Home',
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
          content: 'Friends of Ute Valley Park'
        },
        {
          name: 'twitter:image',
          content: 'https://www.friendsofutevalleypark.com' + require('~/assets/ute-valley-park.jpg')
        },
        {
          name: 'twitter:description',
          content: 'Friends of Ute Valley Park is an officially recognized “Friends” organization by the City of Colorado Springs Parks, Recreation, and Cultural Services Department.'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Friends of Ute Valley Park is an officially recognized “Friends” organization by the City of Colorado Springs Parks, Recreation, and Cultural Services Department. Our mission is to maintain, preserve, and provide education for Ute Valley Park.'
        }
      ]
    }
  }
}
</script>
