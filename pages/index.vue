<template>
  <div>
    <main class="lg:relative bg-gray-50">
      <div class="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-18 lg:text-left">
        <div class="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
          <h2 class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl lg:text-5xl xl:text-6xl">
            Friends of
            <br class="xl:hidden">
            <span class="text-green-600">Ute Valley Park</span>
          </h2>
          <p class="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Friends of Ute Valley Park is an officially recognized “Friends” organization by the City of Colorado Springs Parks and Recreation Department. Our mission is to maintain, preserve, and provide education for Ute Valley Park. Our mission is in alignment with the goals and master plan of the City of Colorado Springs Parks and Recreation Department.
          </p>
          <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
              <a href="/about" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                Read More
              </a>
            </div>
            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="/article/2020-accomplishments" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-green-600 bg-white hover:text-green-500 focus:outline-none focus:border-green-300 focus:shadow-outline-green transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                2020 Accomplishments
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
        <img class="absolute inset-0 w-full h-full object-cover" src="~/assets/ute-valley-park.jpg" alt="Ute Valley Park">
      </div>
    </main>

    <!-- CTA -->

    <div class="relative pt-16 px-4 sm:px-6 lg:pt-24 lg:px-8">
      <div class="absolute inset-0 flex flex-col" aria-hidden="true">
        <div class="flex-1 bg-gray-50" />
        <div class="flex-1" />
      </div>
      <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div class="lg:self-center">
              <h2 class="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
                <span class="block">Ready to help?</span>
                <span class="block text-green-900">Donate or Volunteer today.</span>
              </h2>
              <p class="mt-4 text-lg leading-6 text-orange-50">
                Help Ute Valley Park by making a tax deducitble donation or volunteering.
              </p>
              <a href="#" class="mt-8 bg-green-200 border border-transparent rounded-md shadow py-3 px-6 inline-flex items-center text-base leading-6 font-medium text-green-600 hover:text-green-500 focus:outline-none focus:border-green-300 focus:shadow-outline-green transition duration-150 ease-in-out">Doante</a>
              <a href="#" class="mt-8 bg-teal-200 border border-transparent rounded-md shadow py-3 px-6 inline-flex items-center text-base leading-6 font-medium text-teal-600 hover:text-teal-500 focus:outline-none focus:border-teal-300 focus:shadow-outline-teal transition duration-150 ease-in-out">Volunteer</a>
            </div>
          </div>
          <div class="relative pb-3/5 -mt-6 md:pb-1/2">
            <img class="absolute inset-0 w-full h-full transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20" src="~/assets/volunteer.jpg" alt="App screenshot">
          </div>
        </div>
      </div>
    </div>

    <!-- Blog -->

    <div class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div class="absolute inset-0">
        <div class="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div class="relative max-w-7xl mx-auto">
        <div class="text-center">
          <h2 class="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            From the blog
          </h2>
          <p class="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            Find out what is happening in and around Ute Valley Park
          </p>
        </div>
        <div class="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          <u-card v-for="article in articles" :key="article.slug" :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UCard from '@/components/u-card.vue'

export default {
  components: { UCard },
  async fetch () {
    this.articles = await this.$content('articles').sortBy('publishedOn', 'desc').limit(3).fetch()
  },
  data () {
    return {
      articles: []
    }
  }
}
</script>
