<script setup lang="ts">
import { ref, watch } from 'vue';
import { useScroll, onClickOutside } from '@vueuse/core';
import LucidePawPrint from 'virtual:icons/lucide/paw-print';
import LucideBird from 'virtual:icons/lucide/bird';
import LucideCamera from 'virtual:icons/lucide/camera';
import LucideMap from 'virtual:icons/lucide/map';

const props = defineProps<{ page: string }>();

const menuOpen = ref(false);
const lntOpen = ref(false);
const navContainerRef = ref<HTMLElement | null>(null);
const lntDropdown = ref<HTMLElement | null>(null);
const navHidden = ref(false);
let lastScrollY = 0;
let scrollY = ref(0);
if (typeof window !== 'undefined') {
  const { y } = useScroll(window, { throttle: 50 });
  scrollY = y;
}

watch(scrollY, (current) => {
  if (menuOpen.value) return;
  if (current > lastScrollY && current > 80) {
    navHidden.value = true;
  } else if (current < lastScrollY) {
    navHidden.value = false;
  }
  lastScrollY = current;
});

watch(menuOpen, (open) => {
  if (open) navHidden.value = false;
});

watch(navHidden, (hidden) => {
  if (hidden) lntOpen.value = false;
});

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
  navHidden.value = false;
}

function closeMenu() {
  menuOpen.value = false;
  navHidden.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    closeMenu();
  }
}

onClickOutside(navContainerRef, () => {
  closeMenu();
});

onClickOutside(lntDropdown, () => {
  lntOpen.value = false;
});

const leaveNoTraceMenuItems = [
  { name: 'Dog Etiquette', description: 'Rules & Etiquette', href: '/leavenotrace/dogs/', current: props.page === '/leavenotrace/dogs/', icon: LucidePawPrint },
  {
    name: 'Travel on Durable Surfaces',
    description: 'Durable Travel',
    href: '/leavenotrace/travel-on-durable-surfaces/',
    current: props.page === '/leavenotrace/travel-on-durable-surfaces/',
    icon: LucideMap,
  },
  {
    name: 'Leave What You Find',
    description: 'Leave What You Find',
    href: '/leavenotrace/leave-what-you-find/',
    current: props.page === '/leavenotrace/leave-what-you-find/',
    icon: LucideCamera,
  },
  {
    name: 'Respect Wildlife',
    description: 'Respecting Wildlife',
    href: '/leavenotrace/respect-wildlife/',
    current: props.page === '/leavenotrace/respect-wildlife/',
    icon: LucideBird,
  },
];

const navigation = [
  { href: '/', name: 'Home', current: props.page === '/' },
  { href: '/visit/', name: 'Visit', current: props.page === '/visit/' },
  { href: '/volunteer/', name: 'Volunteer', current: props.page === '/volunteer/' },
  { href: '/donate/', name: 'Donate', current: props.page === '/donate/' },
  { href: '/contact/', name: 'Contact', current: props.page === '/contact/' },
  { href: '/volunteerspotlight/', name: 'Volunteer Spotlight', current: props.page === '/volunteerspotlight/' },
];
</script>

<template>
  <div ref="navContainerRef" :class="[
    'sticky top-0 z-50 transition-transform duration-300 lg:translate-y-0',
    navHidden ? '-translate-y-full' : 'translate-y-0',
  ]" @keydown.escape="onKeydown">
    <nav aria-label="Primary" class="bg-stone-50 border-b border-stone-300">
      <div class="mx-auto max-w-(--breakpoint-2xl) px-4 sm:px-6 lg:px-8">
        <div class="flex h-20 justify-between items-center">
          <div class="flex items-center">
            <a href="/" class="flex shrink-0 items-center gap-3 group">
              <div
                class="p-1 border border-stone-300 bg-white transition-all group-hover:border-primary group-hover:scale-105">
                <img class="block h-10 w-10" src="/images/logo-small.jpg" alt="FUVP" width="40" height="40" />
              </div>
              <div class="hidden md:block">
                <span
                  class="block font-serif font-black text-stone-900 leading-none uppercase text-lg tracking-tighter group-hover:text-primary transition-colors">Friends
                  of <br /> Ute Valley Park</span>
              </div>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex lg:h-full lg:items-center lg:gap-0">
            <div class="flex h-full border-l border-stone-300">
              <a v-for="item in navigation" :key="item.name" :href="item.href"
                :aria-current="item.current ? 'page' : undefined" :class="[
                  item.current ? 'bg-white text-primary border-b-2 border-primary' : 'text-stone-500 hover:bg-stone-100 hover:text-primary',
                  'inline-flex items-center px-4 xl:px-5 h-full text-[10px] font-mono font-black uppercase tracking-[0.2em] border-r border-stone-300 transition-colors',
                ]">{{ item.name }}</a>

              <!-- Leave No Trace Dropdown -->
              <div ref="lntDropdown" class="relative h-full border-r border-stone-300" @keydown.escape="lntOpen = false">
                <button type="button" :aria-expanded="lntOpen" aria-haspopup="true" @click="lntOpen = !lntOpen" :class="[
                  props.page.startsWith('/leavenotrace') || lntOpen ? 'bg-white text-primary' : 'text-stone-500 hover:bg-stone-100 hover:text-primary',
                  'flex items-center px-4 xl:px-5 h-full text-[10px] font-mono font-black uppercase tracking-[0.2em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                ]">
                  <span>Leave No Trace</span>
                  <i-heroicons-chevron-down class="ml-2 h-4 w-4 opacity-50 transition-transform duration-200" :class="lntOpen && 'rotate-180'" aria-hidden="true" />
                </button>

                <Transition enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-1">
                  <div v-if="lntOpen" class="absolute right-0 z-10 mt-px w-screen max-w-sm">
                    <div class="overflow-hidden border-2 border-primary bg-white shadow-2xl">
                      <div class="grid grid-cols-1 divide-y divide-stone-200">
                        <a v-for="item in leaveNoTraceMenuItems" :key="item.name" :href="item.href"
                          :aria-current="item.current ? 'page' : undefined"
                          class="group flex items-center gap-4 p-4 hover:bg-primary/5 transition-colors">
                          <div
                            class="flex h-10 w-10 shrink-0 items-center justify-center border border-stone-200 bg-stone-50 group-hover:bg-white group-hover:border-primary transition-colors">
                            <component :is="item.icon" class="h-5 w-5 text-stone-500 group-hover:text-primary"
                              aria-hidden="true" />
                          </div>
                          <div>
                            <p
                              class="text-[10px] font-mono font-black uppercase tracking-widest text-stone-900 group-hover:text-primary transition-colors">
                              {{ item.name }}</p>
                            <p class="text-[10px] font-mono text-stone-500 uppercase tracking-tighter">{{
                              item.description
                              }}</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <div class="pl-8 hidden xl:block">
              <slot name="social-links" />
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="flex lg:hidden">
            <button
              type="button"
              :aria-expanded="menuOpen"
              aria-controls="mobile-menu"
              class="inline-flex items-center justify-center border border-stone-300 p-2 text-stone-500 hover:bg-stone-100 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              @click="toggleMenu">
              <span class="sr-only">{{ menuOpen ? 'Close main menu' : 'Open main menu' }}</span>
              <i-heroicons-bars-3 v-if="!menuOpen" class="block h-6 w-6" aria-hidden="true" />
              <i-heroicons-x-mark v-else class="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

    </nav>

    <!-- Mobile menu backdrop -->
    <div v-show="menuOpen" class="absolute inset-x-0 top-full h-screen bg-stone-900/40 lg:hidden" aria-hidden="true" @click="closeMenu" />

    <!-- Mobile Panel -->
    <nav v-show="menuOpen" id="mobile-menu" aria-label="Mobile menu" class="absolute inset-x-0 top-full z-10 lg:hidden border-t border-stone-300 bg-white shadow-lg">
      <div class="divide-y divide-stone-200">
        <a v-for="item in navigation" :key="item.name" :href="item.href" @click="closeMenu"
          :aria-current="item.current ? 'page' : undefined"
          :class="[
            item.current ? 'bg-primary/5 text-primary border-l-4 border-primary' : 'text-stone-600 hover:bg-stone-50 hover:text-primary',
            'block py-4 px-6 text-[10px] font-mono font-black uppercase tracking-widest',
          ]">{{ item.name }}
        </a>

        <div class="bg-stone-50 px-6 py-2">
          <span class="text-[8px] font-mono font-black uppercase tracking-[0.3em] text-primary">Leave No
            Trace</span>
        </div>

        <a v-for="item in leaveNoTraceMenuItems" :key="item.name" :href="item.href"
          @click="closeMenu" :aria-current="item.current ? 'page' : undefined" :class="[
            item.current ? 'bg-primary/5 text-primary border-l-4 border-primary' : 'text-stone-600 hover:bg-stone-50 hover:text-primary',
            'block py-4 px-8 text-[10px] font-mono font-black uppercase tracking-widest',
          ]">{{ item.name }}
        </a>
      </div>

      <div class="p-6 border-t border-stone-300 bg-stone-50">
        <slot name="social-links" />
      </div>
    </nav>
  </div>
</template>

<style scoped>
.font-serif {
  font-family: 'EditorialSerif', serif;
}
</style>
