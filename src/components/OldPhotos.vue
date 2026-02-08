<template>
  <div class="space-y-12">
    <div class="flex items-center gap-4 mb-8">
      <span class="inline-block h-px w-8 bg-stone-300"></span>
      <span class="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">Park History</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-300 border border-stone-300">
      <div v-for="i in 6" :key="i" class="relative aspect-square overflow-hidden bg-white group">
        <img :src="`/images/old-ute-valley-park-photos/old-ute-${i}.jpg`"
          class="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100" />
        <div class="absolute inset-0 border-12 border-white/20 pointer-events-none"></div>
      </div>
    </div>

    <div v-if="!viewMore" class="flex justify-center pt-8">
      <button
        class="px-8 py-4 border-2 border-stone-900 font-mono text-xs font-black uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all active:scale-95"
        @click="viewMore = true">
        View More Photos
      </button>
    </div>

    <div v-else class="space-y-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-300 border border-stone-300">
        <div v-for="i in 17" :key="i + 6" class="relative aspect-square overflow-hidden bg-white group">
          <img :src="`/images/old-ute-valley-park-photos/old-ute-${i + 6}.jpg`"
            class="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100" />
          <div class="absolute inset-0 border-12 border-white/20 pointer-events-none"></div>
          <div class="absolute bottom-4 left-4 bg-stone-900 text-white px-2 py-0.5 font-mono text-[8px] uppercase">
          </div>
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