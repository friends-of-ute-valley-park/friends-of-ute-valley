<template>
  <div class="sm:text-center lg:mx-0 lg:text-left">
    <div v-if="!submitSuccess">
      <form class="mt-3 sm:flex" @submit="submit">
        <label for="name" class="sr-only">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          :class="{
            'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500': nameIsError,
          }"
          class="mr-4 block w-full rounded-md border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-green-500 focus:ring-green-500 sm:flex-1"
          placeholder="Full name"
          @input="updateName" />
        <label for="email" class="sr-only">Email</label>
        <input
          id="email"
          v-model="email"
          type="text"
          name="email"
          :class="{
            'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500': emailIsError,
          }"
          class="mt-3 block w-full rounded-md border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-green-500 focus:ring-green-500 sm:mt-0 sm:flex-1"
          placeholder="Email"
          @input="updateEmail" />
        <button
          :disabled="submitInProgress"
          type="submit"
          class="mt-3 w-full rounded-md border border-transparent bg-green-700 px-6 py-3 text-base font-medium text-green-50 shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:inline-flex sm:w-auto sm:flex-shrink-0 sm:items-center">
          <span>
            <svg v-if="submitInProgress" class="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
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
        We care about your data. Read our
        <a href="/privacy/" class="font-medium text-gray-900 underline"> Privacy Policy</a>.
      </p>
    </div>
    <div v-else>
      <p class="text-base font-medium text-gray-900">Thank you for signing up. Please check your email for a confirmation email.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      nameIsError: false,
      emailIsError: false,
      errorMessage: '',
      submitInProgress: false,
      submitSuccess: false,
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      this.submitInProgress = true;
      if (!this.name) {
        this.nameIsError = true;
        this.errorMessage = 'Your name is required';
        this.submitInProgress = false;
        return;
      }
      if (!this.email || !this.email.includes('@') || !this.email.includes('.')) {
        this.emailIsError = true;
        this.errorMessage = 'A valid email is required';
        this.submitInProgress = false;
        return;
      }

      try {
        await fetch('/.netlify/functions/email-signup', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
          }),
        });
        this.submitSuccess = true;
        return;
      } catch (e) {
        this.errorMessage = e;
        this.submitInProgress = false;
        this.submitSuccess = false;
        return;
      }
    },
    updateName() {
      if (this.name) {
        this.nameIsError = false;
        this.errorMessage = false;
      }
    },
    updateEmail() {
      if (this.email && this.email.includes('@') && this.email.includes('.')) {
        this.emailIsError = false;
        this.errorMessage = false;
      }
    },
  },
};
</script>
