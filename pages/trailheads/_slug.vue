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
          {{ trailhead.name }}
        </h3>
        <p class="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
          {{ trailhead.description }}
        </p>
      </div>

      <div class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div class="relative">
          <h4 class="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
            Getting There
          </h4>
          <p class="mt-3 text-lg leading-7 text-gray-500">
            {{ trailhead.location }}
          </p>

          <ul class="mt-10">
            <li v-for="(amenity, i) in trailhead.amenities" :key="amenity.name" :class="{'mt-10': i !== 0}">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h5 class="text-lg leading-6 font-medium text-gray-900">
                    {{ amenity.name }}
                  </h5>
                  <p class="mt-2 text-base leading-6 text-gray-500">
                    {{ amenity.description }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="mt-10 -mx-4 relative lg:mt-0">
          <svg class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden" width="784" height="404" fill="none" viewBox="0 0 784 404">
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
          <div class="relative">
            <a class="absolute rounded-md px-5 py-2 border border-transparent bg-green-600 text-green-50 inline-flex items-center justify-center top-1 right-6 font-semibold text-lg hover:bg-green-500 focus:bg-green-500" :href="trailhead.directionsLink">
              Get Directions
              <svg class="w-6 h-6 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <img class="mx-auto" width="550" :src="require(`~/assets/trailheads/${trailhead.map}`)" alt="">
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
        <div class="flex flex-wrap">
          <div v-for="photo in trailhead.photos" :key="photo.photo" class="lg:w-1/2 w-full p-4">
            <img
              class="relative mx-auto"
              :src="require(`~/assets/trailheads/${photo.photo}`)"
              alt=""
            >
            <p class="text-center text-gray-500 leading-9">
              {{ photo.caption }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    const trailhead = await $content('trailheads', params.slug)
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return {
      trailhead
    }
  },
  data () {
    return {

    }
  },
  head () {
    return {
      title: this.trailhead.name

    }
  }
}
</script>
