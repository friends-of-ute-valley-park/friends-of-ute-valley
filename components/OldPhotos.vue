<template>
  <div>
    <h2 class="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
      Old Photos from Ute Valley Park
    </h2>
    <div class="grid md:grid-cols-3 gap-3">
      <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-1.jpg" quality="80" width="400" height="300" />
      <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-2.jpg" quality="80" width="400" height="300" />
      <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-3.jpg" quality="80" width="400" height="300" />
      <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-4.jpg" quality="80" width="400" height="300" />
      <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-5.jpg" quality="80" width="400" height="300" />
      <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-6.jpg" quality="80" width="400" height="300" />
    </div>
    <div v-if="!viewMore">
      <button class="text-base my-2 ml-1 text-green-900 rounded px-2 py-1 underline" @click="viewMore = true">
        View More
        <svg class="w-6 h-6 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
      </button>
    </div>
    <div v-else>
      <div class="grid md:grid-cols-3 gap-3 mt-3">
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-7.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-8.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-9.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-10.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-11.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-12.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-13.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-14.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-15.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-16.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-17.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-18.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-19.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-20.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-21.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-22.jpg" quality="80" width="400" height="300" />
        <nuxt-picture class="image" src="/images/old-ute-valley-park-photos/old-ute-23.jpg" quality="80" width="400" height="300" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      viewMore: false
    }
  }
}
</script>
