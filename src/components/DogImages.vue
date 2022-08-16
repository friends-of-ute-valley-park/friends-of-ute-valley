<template>
  <transition name="fade">
    <div v-if="showDogs" class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
        <div class="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100 relative">
          <a :href="'https://instagram.com/' + dogs[0]">
            <img :src="'/images/dogs/' + dogs[0] + '.jpg'" alt="" class="w-full h-full object-center object-cover" />
            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">@{{ dogs[0] }}</p>
          </a>
        </div>
        <div class="w-44 h-64 rounded-lg overflow-hidden relative">
          <a :href="'https://instagram.com/' + dogs[1]">
            <img :src="'/images/dogs/' + dogs[1] + '.jpg'" alt="" class="w-full h-full object-center object-cover" />
            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">@{{ dogs[1] }}</p>
          </a>
        </div>
      </div>
      <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
        <div class="w-44 h-64 rounded-lg overflow-hidden relative">
          <a :href="'https://instagram.com/' + dogs[2]">
            <img :src="'/images/dogs/' + dogs[2] + '.jpg'" alt="" class="w-full h-full object-center object-cover" />
            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">@{{ dogs[2] }}</p>
          </a>
        </div>
        <div class="w-44 h-64 rounded-lg overflow-hidden relative">
          <a :href="'https://instagram.com/' + dogs[3]">
            <img :src="'/images/dogs/' + dogs[3] + '.jpg'" alt="" class="w-full h-full object-center object-cover" />
            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">@{{ dogs[3] }}</p>
          </a>
        </div>
        <div class="w-44 h-64 rounded-lg overflow-hidden relative">
          <a :href="'https://instagram.com/' + dogs[4]">
            <img :src="'/images/dogs/' + dogs[4] + '.jpg'" alt="" class="w-full h-full object-center object-cover" />
            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">@{{ dogs[4] }}</p>
          </a>
        </div>
      </div>
      <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
        <div class="w-44 h-64 rounded-lg overflow-hidden relative">
          <a :href="'https://instagram.com/' + dogs[1]">
            <img :src="'/images/dogs/' + dogs[1] + '.jpg'" alt="" class="w-full h-full object-center object-cover" />
            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">@{{ dogs[1] }}</p>
          </a>
        </div>
        <div class="w-44 h-64 rounded-lg overflow-hidden relative">
          <a :href="'https://instagram.com/' + dogs[2]">
            <img :src="'/images/dogs/' + dogs[2] + '.jpg'" alt="" class="w-full h-full object-center object-cover" />
            <p class="absolute left-0 bottom-0 bg-gray-900/30 text-gray-50 text-xs px-2 py-1">@{{ dogs[2] }}</p>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showDogs: false,
      dogs: ['freyja_pup', 'the.sweet.life.of.five', 'logan.and.the.rescue.crew', 'marisslh', 'queen_padme_21'],
    };
  },
  mounted() {
    this.randomize();
    this.showDogs = true;
  },
  methods: {
    randomize() {
      for (let i = this.dogs.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const temp = this.dogs[i];
        this.dogs[i] = this.dogs[randomIndex];
        this.dogs[randomIndex] = temp;
      }
    },
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease-in;
}

.fade-enter-from, .fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
