<script setup lang="ts">
import { computed, shallowRef, useTemplateRef, watch, type Ref } from 'vue';
import { useScroll, onClickOutside } from '@vueuse/core';
import LucidePawPrint from 'virtual:icons/lucide/paw-print';
import LucideBird from 'virtual:icons/lucide/bird';
import LucideCamera from 'virtual:icons/lucide/camera';
import LucideMap from 'virtual:icons/lucide/map';
import HeroiconsBars3 from 'virtual:icons/heroicons/bars-3';
import HeroiconsChevronDown from 'virtual:icons/heroicons/chevron-down';
import HeroiconsXMark from 'virtual:icons/heroicons/x-mark';

const props = defineProps<{ page: string }>();

const menuOpen = shallowRef(false);
const lntOpen = shallowRef(false);
const navContainerRef = useTemplateRef<HTMLElement>('navContainerRef');
const lntDropdown = useTemplateRef<HTMLElement>('lntDropdown');
const navHidden = shallowRef(false);
const chevronIconClass = computed(() => {
  return `ml-2 h-4 w-4 opacity-50 transition-transform duration-200 ${lntOpen.value ? 'rotate-180' : ''}`;
});
const menuIconBaseClass = 'absolute inset-0 h-6 w-6 transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)]';
const barsIconClass = computed(() => {
  return `${menuIconBaseClass} ${menuOpen.value ? 'scale-25 opacity-0 blur-xs' : 'scale-100 opacity-100 blur-none'}`;
});
const xMarkIconClass = computed(() => {
  return `${menuIconBaseClass} ${menuOpen.value ? 'scale-100 opacity-100 blur-none' : 'scale-25 opacity-0 blur-xs'}`;
});
let lastScrollY = 0;
let scrollY: Ref<number> = shallowRef(0);
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
  <div ref="navContainerRef" :class="['sticky top-0 z-50 transition-transform duration-300 lg:translate-y-0', navHidden ? '-translate-y-full' : 'translate-y-0']" @keydown.escape="onKeydown">
    <nav aria-label="Primary" class="border-b border-stone-300 bg-stone-50">
      <div class="mx-auto max-w-(--breakpoint-2xl) px-4 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div class="flex items-center">
            <a href="/" class="group flex shrink-0 items-center gap-3">
              <div class="border border-stone-300 bg-white p-1 transition-[border-color,transform] duration-200 group-hover:scale-105 group-hover:border-primary">
                <img class="block h-10 w-10" src="/images/logo-small.jpg" alt="FUVP" width="40" height="40" />
              </div>
              <div class="hidden md:block">
                <span class="block font-serif text-lg leading-none font-black tracking-tighter text-stone-900 uppercase transition-colors group-hover:text-primary"
                  >Friends of <br />
                  Ute Valley Park</span
                >
              </div>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex lg:h-full lg:items-center lg:gap-0">
            <div class="flex h-full border-l border-stone-300">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :aria-current="item.current ? 'page' : undefined"
                :class="[
                  item.current ? 'border-b-2 border-primary bg-white text-primary' : 'text-stone-500 hover:bg-stone-100 hover:text-primary',
                  'inline-flex h-full items-center border-r border-stone-300 px-4 font-mono text-[10px] font-black tracking-[0.2em] uppercase transition-colors xl:px-5',
                ]"
                >{{ item.name }}</a
              >

              <!-- Leave No Trace Dropdown -->
              <div ref="lntDropdown" class="relative h-full border-r border-stone-300" @keydown.escape="lntOpen = false">
                <button
                  type="button"
                  :aria-expanded="lntOpen"
                  aria-haspopup="true"
                  @click="lntOpen = !lntOpen"
                  :class="[
                    props.page.startsWith('/leavenotrace') || lntOpen ? 'bg-white text-primary' : 'text-stone-500 hover:bg-stone-100 hover:text-primary',
                    'flex h-full items-center px-4 font-mono text-[10px] font-black tracking-[0.2em] uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset xl:px-5',
                  ]">
                  <span>Leave No Trace</span>
                  <HeroiconsChevronDown :class="chevronIconClass" aria-hidden="true" />
                </button>

                <Transition
                  enter-active-class="transition-[opacity,transform] ease-out duration-200"
                  enter-from-class="opacity-0 translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition-[opacity,transform] ease-in duration-150"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-1">
                  <div v-if="lntOpen" class="absolute right-0 z-10 mt-px w-screen max-w-sm">
                    <div class="overflow-hidden border-2 border-primary bg-white shadow-2xl">
                      <div class="grid grid-cols-1 divide-y divide-stone-200">
                        <a
                          v-for="item in leaveNoTraceMenuItems"
                          :key="item.name"
                          :href="item.href"
                          :aria-current="item.current ? 'page' : undefined"
                          class="group flex items-center gap-4 p-4 transition-colors hover:bg-primary/5">
                          <div class="flex h-10 w-10 shrink-0 items-center justify-center border border-stone-200 bg-stone-50 transition-colors group-hover:border-primary group-hover:bg-white">
                            <component :is="item.icon" class="h-5 w-5 text-stone-500 group-hover:text-primary" aria-hidden="true" />
                          </div>
                          <div>
                            <p class="font-mono text-[10px] font-black tracking-widest text-stone-900 uppercase transition-colors group-hover:text-primary">
                              {{ item.name }}
                            </p>
                            <p class="font-mono text-[10px] tracking-tighter text-stone-500 uppercase">{{ item.description }}</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <div class="hidden pl-8 xl:block">
              <slot name="social-links" />
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="flex lg:hidden">
            <button
              type="button"
              :aria-expanded="menuOpen"
              aria-controls="mobile-menu"
              class="inline-flex min-h-10 min-w-10 items-center justify-center border border-stone-300 p-2 text-stone-500 transition-[background-color,border-color,color,transform] duration-200 hover:bg-stone-100 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-96"
              @click="toggleMenu">
              <span class="sr-only">{{ menuOpen ? 'Close main menu' : 'Open main menu' }}</span>
              <span class="relative block h-6 w-6">
                <HeroiconsBars3 :class="barsIconClass" aria-hidden="true" />
                <HeroiconsXMark :class="xMarkIconClass" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile menu backdrop -->
    <div v-show="menuOpen" class="absolute inset-x-0 top-full h-screen bg-stone-900/40 lg:hidden" aria-hidden="true" @click="closeMenu" />

    <!-- Mobile Panel -->
    <nav v-show="menuOpen" id="mobile-menu" aria-label="Mobile menu" class="absolute inset-x-0 top-full z-10 border-t border-stone-300 bg-white shadow-lg lg:hidden">
      <div class="divide-y divide-stone-200">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          @click="closeMenu"
          :aria-current="item.current ? 'page' : undefined"
          :class="[
            item.current ? 'border-l-4 border-primary bg-primary/5 text-primary' : 'text-stone-600 hover:bg-stone-50 hover:text-primary',
            'block px-6 py-4 font-mono text-[10px] font-black tracking-widest uppercase',
          ]"
          >{{ item.name }}
        </a>

        <div class="bg-stone-50 px-6 py-2">
          <span class="font-mono text-[8px] font-black tracking-[0.3em] text-primary uppercase">Leave No Trace</span>
        </div>

        <a
          v-for="item in leaveNoTraceMenuItems"
          :key="item.name"
          :href="item.href"
          @click="closeMenu"
          :aria-current="item.current ? 'page' : undefined"
          :class="[
            item.current ? 'border-l-4 border-primary bg-primary/5 text-primary' : 'text-stone-600 hover:bg-stone-50 hover:text-primary',
            'block px-8 py-4 font-mono text-[10px] font-black tracking-widest uppercase',
          ]"
          >{{ item.name }}
        </a>
      </div>

      <div class="border-t border-stone-300 bg-stone-50 p-6">
        <slot name="social-links" />
      </div>
    </nav>
  </div>
</template>
