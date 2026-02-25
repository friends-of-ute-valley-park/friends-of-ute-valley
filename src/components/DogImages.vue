<template>
  <transition name="fade">
    <div v-if="showDogs" class="flex items-center space-x-6 lg:space-x-8">
      <div class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
        <div class="group relative h-64 w-44 overflow-hidden border border-stone-300 bg-white">
          <a :href="'https://instagram.com/' + dogs[0]" target="_blank">
            <img :src="'/images/dogs/' + dogs[0] + '.jpg'" alt="Dog at Ute Valley Park" class="h-full w-full object-cover object-center transition-all duration-700" />
            <p class="absolute bottom-0 left-0 border-t border-r border-stone-200 bg-white/90 px-2 py-1 font-mono text-[8px] tracking-widest text-stone-900 uppercase">@{{ dogs[0] }}</p>
          </a>
        </div>
        <div class="group relative h-64 w-44 overflow-hidden border border-stone-300 bg-white">
          <a :href="'https://instagram.com/' + dogs[1]" target="_blank">
            <img :src="'/images/dogs/' + dogs[1] + '.jpg'" alt="Dog at Ute Valley Park" class="h-full w-full object-cover object-center transition-all duration-700" />
            <p class="absolute bottom-0 left-0 border-t border-r border-stone-200 bg-white/90 px-2 py-1 font-mono text-[8px] tracking-widest text-stone-900 uppercase">@{{ dogs[1] }}</p>
          </a>
        </div>
      </div>
      <div class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
        <div class="group relative h-64 w-44 overflow-hidden border border-stone-300 bg-white">
          <a :href="'https://instagram.com/' + dogs[2]" target="_blank">
            <img :src="'/images/dogs/' + dogs[2] + '.jpg'" alt="Dog at Ute Valley Park" class="h-full w-full object-cover object-center transition-all duration-700" />
            <p class="absolute bottom-0 left-0 border-t border-r border-stone-200 bg-white/90 px-2 py-1 font-mono text-[8px] tracking-widest text-stone-900 uppercase">@{{ dogs[2] }}</p>
          </a>
        </div>
        <div class="group relative h-64 w-44 overflow-hidden border border-stone-300 bg-white">
          <a :href="'https://instagram.com/' + dogs[3]" target="_blank">
            <img :src="'/images/dogs/' + dogs[3] + '.jpg'" alt="Dog at Ute Valley Park" class="h-full w-full object-cover object-center transition-all duration-700" />
            <p class="absolute bottom-0 left-0 border-t border-r border-stone-200 bg-white/90 px-2 py-1 font-mono text-[8px] tracking-widest text-stone-900 uppercase">@{{ dogs[3] }}</p>
          </a>
        </div>
        <div class="group relative h-64 w-44 overflow-hidden border border-stone-300 bg-white">
          <a :href="'https://instagram.com/' + dogs[4]" target="_blank">
            <img :src="'/images/dogs/' + dogs[4] + '.jpg'" alt="Dog at Ute Valley Park" class="h-full w-full object-cover object-center transition-all duration-700" />
            <p class="absolute bottom-0 left-0 border-t border-r border-stone-200 bg-white/90 px-2 py-1 font-mono text-[8px] tracking-widest text-stone-900 uppercase">@{{ dogs[4] }}</p>
          </a>
        </div>
      </div>
      <div class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
        <div class="group relative h-64 w-44 overflow-hidden border border-stone-300 bg-white">
          <a :href="'https://instagram.com/' + dogs[1]" target="_blank">
            <img :src="'/images/dogs/' + dogs[1] + '.jpg'" alt="Dog at Ute Valley Park" class="h-full w-full object-cover object-center transition-all duration-700" />
            <p class="absolute bottom-0 left-0 border-t border-r border-stone-200 bg-white/90 px-2 py-1 font-mono text-[8px] tracking-widest text-stone-900 uppercase">@{{ dogs[1] }}</p>
          </a>
        </div>
        <div class="group relative h-64 w-44 overflow-hidden border border-stone-300 bg-white">
          <a :href="'https://instagram.com/' + dogs[2]" target="_blank">
            <img :src="'/images/dogs/' + dogs[2] + '.jpg'" alt="Dog at Ute Valley Park" class="h-full w-full object-cover object-center transition-all duration-700" />
            <p class="absolute bottom-0 left-0 border-t border-r border-stone-200 bg-white/90 px-2 py-1 font-mono text-[8px] tracking-widest text-stone-900 uppercase">@{{ dogs[2] }}</p>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const showDogs = ref(false);

const randomize = function () {
  for (let i = dogs.value.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const temp = dogs.value[i];
    dogs.value[i] = dogs.value[randomIndex];
    dogs.value[randomIndex] = temp;
  }
};

const dogs = ref(['freyja_pup', 'the.sweet.life.of.five', 'logan.and.the.rescue.crew', 'marisslh', 'queen_padme_21']);
randomize();

onMounted(() => {
  showDogs.value = true;
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
