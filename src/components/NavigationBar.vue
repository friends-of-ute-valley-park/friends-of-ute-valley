<template>
  <Disclosure v-slot="{ open }" as="nav" class="bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex shrink-0 items-center">
            <img class="block h-14 w-14" src="/images/logo-small.jpg" alt="Friends of Ute Valley Park" />
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <!-- Current: "border-primary-light text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <a v-for="item in navigation" :key="item.name" :href="item.href"
              :aria-current="item.current ? 'page' : undefined" :class="[
                item.current ? 'border-primary-light text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
              ]">{{ item.name }}</a>
            <div class="flex h-full justify-center">
              <Popover class="relative flex">
                <PopoverButton :class="[
                  props.page.startsWith('/leavenotrace') === true ? 'border-primary-light text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                ]">
                  <span class="items-center">Leave No Trace</span>
                  <i-heroicons-chevron-down class="ml-1 h-5 w-5" aria-hidden="true" />
                </PopoverButton>
                <transition enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-1">
                  <PopoverPanel class="absolute left-1/2 z-10 mt-16 flex w-screen max-w-max -translate-x-1/2 px-4">
                    <div
                      class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                      <div class="p-4">
                        <div v-for="item in leaveNoTraceMenuItems" :key="item.name"
                          class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                          <div
                            class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <component :is="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-primary-light"
                              aria-hidden="true" />
                          </div>
                          <div>
                            <a :href="item.href" class="font-semibold text-gray-900">
                              {{ item.name }}
                              <span class="absolute inset-0" />
                            </a>
                            <p class="mt-1 text-gray-600">{{ item.description }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover>
            </div>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <slot name="social-links" />
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-primary-light focus:outline-hidden focus:ring-inset">
            <span class="sr-only">Open main menu</span>
            <i-heroicons-bars-3 v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <i-heroicons-x-mark v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pt-2 pb-3">
        <!-- Current: "bg-primary-50 border-primary-light text-primary", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[
          item.current ? 'border-primary-light bg-primary-50 text-primary' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
          'block border-l-4 py-2 pr-4 pl-3 text-base font-medium sm:pr-6 sm:pl-5',
        ]">{{ item.name }}
        </DisclosureButton>
      </div>
      <div class="space-y-1 border-t border-gray-200 pt-6">
        <DisclosureButton v-for="item in leaveNoTraceMenuItems" :key="item.name" as="a" :href="item.href" :class="[
          item.current ? 'border-primary-light bg-primary-50 text-primary' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
          'block border-l-4 py-2 pr-4 pl-3 text-base font-medium sm:pr-6 sm:pl-5',
        ]">{{ item.name }}
        </DisclosureButton>
      </div>
      <div class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300" />
        </div>
        <div class="relative flex justify-center">
          <span class="bg-white px-2 text-gray-500">
            <svg class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path fill="#6B7280" fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
      <div class="my-4 -ml-4 flex justify-center pb-6">
        <slot name="social-links" />
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import LucidePawPrint from 'virtual:icons/lucide/paw-print';
import LucideBird from 'virtual:icons/lucide/bird';
import LucideCamera from 'virtual:icons/lucide/camera';
import LucideMap from 'virtual:icons/lucide/map';

const props = defineProps(['page']);

const leaveNoTraceMenuItems = [
  { name: 'Dog Etiquette and Rules', description: 'Leash Laws and Clean-Up Rules', href: '/leavenotrace/dogs/', current: props.page === '/leavenotrace/dogs/', icon: LucidePawPrint },
  {
    name: 'Travel on Durable Surfaces',
    description: 'Respecting Durable Surfaces in Parks',
    href: '/leavenotrace/travel-on-durable-surfaces/',
    current: props.page === '/leavenotrace/travel-on-durable-surfaces/',
    icon: LucideMap,
  },
  {
    name: 'Leave What You find',
    description: 'Appreciating Nature Without Taking It Home',
    href: '/leavenotrace/leave-what-you-find/',
    current: props.page === '/leavenotrace/leave-what-you-find/',
    icon: LucideCamera,
  },
  {
    name: 'Respect Wildlife',
    description: 'Appreciating Wildlife Without Disturbing It',
    href: '/leavenotrace/respect-wildlife/',
    current: props.page === '/leavenotrace/respect-wildlife/',
    icon: LucideBird,
  },
];

const navigation = [
  { href: '/', name: 'Home', current: props.page === '/' },
  { href: '/visit/', name: 'Visit', current: props.page === '/visit/' },
  {
    href: '/volunteer/',
    name: 'Volunteer',
    current: props.page === '/volunteer/',
  },
  { href: '/donate/', name: 'Donate', current: props.page === '/donate/' },
  { href: '/contact/', name: 'Contact', current: props.page === '/contact/' },
  { href: '/volunteerspotlight/', name: 'Volunteer Spotlight', current: props.page === '/volunteerspotlight/' },
];
</script>
