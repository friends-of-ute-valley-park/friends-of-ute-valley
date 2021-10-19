<template>
  <div class="sm:text-center lg:text-left lg:mx-0">
    <div v-if="!submitSuccess">
      <p class="text-base font-medium text-gray-900">
        Sign up to get notified of future volunteer opportunities.
      </p>
      <form class="mt-3 sm:flex" @submit="submit">
        <label for="name" class="sr-only">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          :class="{'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500': nameIsError}"
          class="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-green-500 focus:border-green-500 sm:flex-1 border-gray-300 mr-4"
          placeholder="Enter your full name"
          @input="updateName"
        >
        <label for="email" class="sr-only">Email</label>
        <input
          id="email"
          v-model="email"
          type="text"
          name="email"
          :class="{'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500': emailIsError}"
          class="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-green-500 focus:border-green-500 sm:flex-1 border-gray-300"
          placeholder="Enter your email"
          @input="updateEmail"
        >
        <button :disabled="submitInProgress" type="submit" class="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-50 bg-green-700 shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
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
          Notify me
        </button>
      </form>
      <p v-if="errorMessage" class="mt-2 text-sm text-red-600">
        {{ errorMessage }}
      </p>
      <p class="mt-3 text-sm text-gray-500">
        We care about the protection of your data. Read our
        <nuxt-link to="/privacy" class="font-medium text-gray-900 underline">
          Privacy Policy
        </nuxt-link>.
      </p>
    </div>
    <div v-else>
      <p class="text-base font-medium text-gray-900">
        Thank you for signing up. Please check your email for a confirmation email.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      nameIsError: false,
      emailIsError: false,
      errorMessage: '',
      submitInProgress: false,
      submitSuccess: false
    }
  },
  methods: {
    async submit (e) {
      e.preventDefault()
      this.submitInProgress = true
      if (!this.name) {
        this.nameIsError = true
        this.errorMessage = 'Your name is required'
        this.submitInProgress = false
        return
      }
      if (!this.email || !this.email.includes('@') || !this.email.includes('.')) {
        this.emailIsError = true
        this.errorMessage = 'A valid email is required'
        this.submitInProgress = false
        return
      }

      const res = await this.$axios.post('/.netlify/functions/email-signup', {
        name: this.name,
        email: this.email
      })

      if (res.data.status === true) {
        this.submitSuccess = true
        return
      }

      this.errorMessage = this.data.errorMessage
      this.submitInProgress = false
    },
    updateName () {
      if (this.name) {
        this.nameIsError = false
        this.errorMessage = false
      }
    },
    updateEmail () {
      if (this.email && this.email.includes('@') && this.email.includes('.')) {
        this.emailIsError = false
        this.errorMessage = false
      }
    }
  }
}
</script>
