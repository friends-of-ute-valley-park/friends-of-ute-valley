<template>
  <div class="space-y-12">
    <div class="mb-8 flex items-center gap-4">
      <span class="inline-block h-px w-8 bg-stone-300"></span>
      <span class="font-mono text-[10px] font-black tracking-[0.2em] text-stone-500 uppercase">Park History</span>
    </div>

    <div class="grid grid-cols-1 gap-px border border-stone-300 bg-stone-300 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 6" :key="i" class="group relative aspect-square overflow-hidden bg-white">
        <img :src="`/images/old-ute-valley-park-photos/old-ute-${i}.jpg`" class="h-full w-full scale-105 object-cover transition-all duration-1000 group-hover:scale-100" loading="lazy" />
        <div class="pointer-events-none absolute inset-0 border-12 border-white/20"></div>
      </div>
    </div>

    <div v-if="!viewMore" class="flex justify-center pt-8">
      <button
        class="border-2 border-stone-900 px-8 py-4 font-mono text-xs font-black tracking-widest uppercase transition-all hover:bg-stone-900 hover:text-white active:scale-95"
        @click="viewMore = true">
        View More Photos
      </button>
    </div>

    <div v-else class="space-y-12">
      <div class="grid grid-cols-1 gap-px border border-stone-300 bg-stone-300 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 17" :key="i + 6" class="group relative aspect-square overflow-hidden bg-white">
          <img :src="`/images/old-ute-valley-park-photos/old-ute-${i + 6}.jpg`" class="h-full w-full scale-105 object-cover transition-all duration-1000 group-hover:scale-100" loading="lazy" />
          <div class="pointer-events-none absolute inset-0 border-12 border-white/20"></div>
          <div class="absolute bottom-4 left-4 bg-stone-900 px-2 py-0.5 font-mono text-[8px] text-white uppercase"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const viewMore = ref(false);
</script>

<style scoped>
.font-serif {
  font-family: 'EditorialSerif', serif;
}
</style>
