<template>
  <div>
    <h2
      class="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
      Old Photos from Ute Valley Park</h2>
    <div class="grid md:grid-cols-3 gap-3">
      <img class="image" src="/images/old-ute-valley-park-photos/old-ute-1.jpg" />
      <img class="image" src="/images/old-ute-valley-park-photos/old-ute-2.jpg" />
      <img class="image" src="/images/old-ute-valley-park-photos/old-ute-3.jpg" />
      <img class="image" src="/images/old-ute-valley-park-photos/old-ute-4.jpg" />
      <img class="image" src="/images/old-ute-valley-park-photos/old-ute-5.jpg" />
      <img class="image" src="/images/old-ute-valley-park-photos/old-ute-6.jpg" />
    </div>
    <div v-if="!viewMore">
      <button class="text-base my-2 ml-1 text-green-900 rounded px-2 py-1 underline" @click="viewMore = true">
        View More
        <ChevronDownIcon class="w-6 h-6 inline-block ml-1" />
      </button>
    </div>
    <div v-else>
      <div class="grid md:grid-cols-3 gap-3 mt-3">
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-7.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-8.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-9.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-10.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-11.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-12.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-13.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-14.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-15.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-16.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-17.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-18.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-19.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-20.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-21.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-22.jpg" />
        <img class="image" src="/images/old-ute-valley-park-photos/old-ute-23.jpg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ChevronDownIcon } from '@heroicons/vue/24/solid/esm/index.js'
const viewMore = ref(false)

</script>
