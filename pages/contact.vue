<template>
  <div>
    <!-- contact form -->

    <div class="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8">
      <div class="relative max-w-xl mx-auto">
        <svg class="absolute left-full transform translate-x-1/2" width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
        <svg class="absolute right-full bottom-0 transform -translate-x-1/2" width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
        <div class="text-center">
          <h2 class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Contact Friends of Ute Valley Park
          </h2>
          <p class="mt-4 text-base leading-6 text-gray-500">
            Got a problem or a comment? Let us know and we'll be happy to assist you.
          </p>
        </div>
        <div class="mt-12">
          <form action="#" method="POST" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div class="sm:col-span-2">
              <label for="name" class="block text-sm font-medium leading-5 text-gray-700">Name</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input id="name" class="form-input py-3 px-4 block w-full transition ease-in-out duration-150">
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Email</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input id="email" type="email" class="form-input py-3 px-4 block w-full transition ease-in-out duration-150">
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="location" class="block text-sm leading-5 font-medium text-gray-700">Category</label>
              <select id="location" class="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
                <option v-for="option in options" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label for="message" class="block text-sm font-medium leading-5 text-gray-700">Message</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <textarea id="message" rows="4" class="form-textarea py-3 px-4 block w-full transition ease-in-out duration-150" />
              </div>
            </div>

            <div class="sm:col-span-2">
              <span class="w-full inline-flex rounded-md shadow-sm">
                <button type="button" class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150">
                  Submit
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <u-team />
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: ['Report a problem', 'Volunteer', 'Information', 'Other']
    }
  }
}
</script>
