<template>
  <div class="sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
    <p class="text-base font-medium text-gray-900">
      Sign up to get notified of future volunteer opportunities.
    </p>
    <form action="#" method="POST" class="mt-3 sm:flex">
      <label for="email" class="sr-only">Email</label>
      <input id="email" type="text" name="email" class="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-green-500 focus:border-green-500 sm:flex-1 border-gray-300" placeholder="Enter your email">
      <button type="submit" class="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-50 bg-green-700 shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
        Notify me
      </button>
    </form>
    <p class="mt-3 text-sm text-gray-500">
      We care about the protection of your data. Read our
      <nuxt-link to="/privacy" class="font-medium text-gray-900 underline">
        Privacy Policy
      </nuxt-link>.
    </p>
  </div>
</template>
