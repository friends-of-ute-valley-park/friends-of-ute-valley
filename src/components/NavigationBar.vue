<template>
  <Disclosure v-slot="{ open }" as="nav" class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-14 w-14" src="/images/logo-small.jpg" alt="Friends of Ute Valley Park" />
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <!-- Current: "border-green-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              :aria-current="item.current ? 'page' : undefined"
              :class="[
                item.current ? 'border-green-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
              ]"
              >{{ item.name }}</a
            >
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <slot name="social-links" />
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <!-- Current: "bg-green-50 border-green-500 text-green-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current ? 'border-green-500 bg-green-50 text-green-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6',
          ]"
          >{{ item.name }}</DisclosureButton
        >
      </div>
      <div class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300" />
        </div>
        <div class="relative flex justify-center">
          <span class="bg-white px-2 text-gray-500">
            <svg class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path fill="#6B7280" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
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
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline/esm/index.js';

const props = defineProps(['page']);

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
];
</script>
