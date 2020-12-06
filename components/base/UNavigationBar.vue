<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img class="block h-12 w-auto" src="~/assets/fuvp-logo-sm.webp" alt="Friends of Ute Valley logo">
          </div>
          <div class="hidden sm:-my-px sm:ml-6 space-x-8 sm:flex">
            <nuxt-link
              v-for="menuItem in menuItems"
              :key="menuItem.route"
              :to="menuItem.route"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out"
              :class="{'border-green-500  text-gray-900  focus:border-green-700': $route.path === menuItem.route,
                       ' border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300': $route.path !== menuItem.route}"
            >
              {{ menuItem.title }}
            </nuxt-link>
          </div>
        </div>
        <div class="hidden sm:ml-8 sm:flex sm:items-center">
          <div class="inline-flex items-center px-2 pt-1 ">
            <a href="https://www.facebook.com/FriendsOfUteValleyPark">
              <img class="h-6" src="~/assets/logos/facebook.png" alt="Facebook">
            </a>
          </div>
          <div class="inline-flex items-center px-2 pt-1 ">
            <a href="https://www.instagram.com/friendsofutevalleypark/">
              <img class="h-6" src="~/assets/logos/instagram.png" alt="Instagram">
            </a>
          </div>
          <div class="inline-flex items-center px-2 pt-1 ">
            <a href="https://www.twitter.com/FriendsUVP">
              <img class="h-6" src="~/assets/logos/twitter.svg" alt="Twitter">
            </a>
          </div>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" @click="mobileMenuOpen = !mobileMenuOpen">
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg :class="{'block': !mobileMenuOpen, 'hidden': mobileMenuOpen}" class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen}" class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!--
      Mobile menu, toggle classes based on menu state.
    -->
    <div v-if="mobileMenuOpen" class="sm:hidden block">
      <div class="pt-2 pb-3 space-y-1">
        <nuxt-link
          v-for="menuItem in menuItems"
          :key="menuItem.route"
          :to="menuItem.route"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out"
          :class="{'border-green-500 text-green-700 bg-green-50  focus:text-green-800 focus:bg-green-100 focus:border-green-700': $route.path === menuItem.route,
                   'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300': $route.path !== menuItem.route}"
          @click.native="mobileMenuOpen = false"
        >
          {{ menuItem.title }}
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      menuItems: [
        { route: '/', title: 'Home' },
        { route: '/visit', title: 'Visit' },
        { route: '/volunteer', title: 'Volunteer' },
        { route: '/contact', title: 'Contact' }
      ],
      mobileMenuOpen: false
    }
  }
}
</script>
