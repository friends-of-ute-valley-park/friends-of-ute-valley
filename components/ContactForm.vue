<template>
  <div>
    <!-- notification banner -->
    <div v-if="message" class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="p-2 rounded-lg bg-green-600 shadow-lg sm:p-3">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-green-800">
              <!-- Heroicon name: speakerphone -->
              <svg
                class="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </span>
            <p v-if="message" class="ml-3 font-medium text-white">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
    </div>

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
            <slot name="title">
              Contact Friends of Ute Valley Park
            </slot>
          </h2>
          <p class="mt-4 text-base leading-6 text-gray-500">
            <slot name="subtitle">
              Got a problem or a comment? Let us know and we'll be happy to assist you. Make sure to check out our
              <nuxt-link class="font-semibold no-underline text-green-600" to="faq">
                FAQ
              </nuxt-link> page.
            </slot>
          </p>
        </div>
        <div class="mt-12">
          <form action="/.netlify/functions/contact-form" method="POST" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" @submit.prevent="submit">
            <div class="sm:col-span-2">
              <label for="name" class="block text-sm font-semibold text-gray-700">Name</label>
              <div class="mt-1">
                <input
                  id="name"
                  v-model="form.name"
                  required
                  type="text"
                  name="name"
                  autocomplete="given-name"
                  class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                >
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-semibold text-gray-700">Email</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  v-model="form.email"
                  autocomplete="email"
                  required
                  type="email"
                  class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                >
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="category" class="block text-sm font-semibold text-gray-700">Category</label>
              <select id="category" v-model="form.category" class="py-3 px-3 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md">
                <option v-for="option in options" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>

            <div v-if="form.category == 'Volunteer'" class="sm:col-span-2">
              <div class="rounded-md bg-green-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <!-- Heroicon name: solid/exclamation -->
                    <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-green-800">
                      Volunteer Information
                    </h3>
                    <div class="mt-2 text-sm text-green-700">
                      <p>
                        We hold volunteer work events the first and third Wednesday of the month April through September.  You can find more information on our <nuxt-link to="/volunteer">
                          volunteer
                        </nuxt-link> page. Also, consider following our
                        <a class="underline text-green-800" href="https://www.facebook.com/FriendsOfUteValleyPark">Facebook</a>
                        or <a class="underline text-green-800" href="https://www.instagram.com/friendsofutevalleypark/">Instagram</a> for updates.
                      </p>
                      <p class="mt-2">
                        If you have any questions regarding volunteering or organizing a volunteer event please contact us.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="message" class="block text-sm font-semibold text-gray-700">Message</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <textarea id="message" v-model="form.message" required rows="4" class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md" />
              </div>
            </div>

            <div class="sm:col-span-2">
              <span class="w-full inline-flex rounded-md shadow-sm">
                <button :disabled="submitInProgress" type="submit" class="disabled:opacity-25 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-green-500 focus:ring-2 active:bg-green-700 transition ease-in-out duration-150">
                  <span>
                    <svg v-if="submitInProgress" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                  Submit
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultOption: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      message: '',
      options: ['Report a problem', 'Volunteer', 'Information', 'Other'],
      form: {
        name: '',
        email: '',
        category: this.defaultOption || 'Report a problem',
        message: ''
      },
      submitInProgress: false
    }
  },
  methods: {
    async submit () {
      this.submitInProgress = true
      if (this.form.name === '' || this.form.email === '' || this.form.message === '') {
        this.message = 'Please fill out the form completely'
        return
      }
      try {
        const res = await this.$axios.post('/.netlify/functions/contact-form', {
          name: this.form.name,
          email: this.form.email,
          category: this.form.category,
          message: this.form.message
        })
        if (res.data.status === true) {
          this.message = "Thank you for contacting Friends of Ute Valley Park! We'll review your message shortly."
          this.form.name = ''
          this.form.email = ''
          this.form.message = ''
        } else {
          this.message = `There was an error processing your request: ${res.data.message}`
        }
      } catch (err) {
        this.message = err.response.data.message
      } finally {
        this.submitInProgress = false
      }
    }
  }
}
</script>
