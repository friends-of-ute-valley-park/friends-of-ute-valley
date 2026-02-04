<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { ref, computed } from 'vue';

const nameIsError = ref(false);
const emailIsError = ref(false);
const emailValidationError = ref('');
const nameValidationError = ref('');
const payload = ref({ name: '', email: '' });

const requestBody = computed(() => ({ payload: payload.value }));

const { isFetching, isFinished, error, data, execute } = useFetch('/email-signup', {
  updateDataOnError: true,
  immediate: false,
})
  .post(requestBody)
  .json();

const validateName = (requireValue = true) => {
  const name = payload.value.name.trim();
  if (name) {
    nameIsError.value = false;
    nameValidationError.value = '';
  } else if (requireValue) {
    nameIsError.value = true;
    nameValidationError.value = 'Please enter your name. ';
  }
};

const validateEmail = (requireValue = true) => {
  const email = payload.value.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && emailRegex.test(email)) {
    emailIsError.value = false;
    emailValidationError.value = '';
  } else if (email) {
    // Only show error if they've typed something invalid
    emailIsError.value = true;
    emailValidationError.value = 'Please enter a valid email address.';
  } else if (requireValue) {
    // Empty field - only error on submit
    emailIsError.value = true;
    emailValidationError.value = 'Please enter a valid email address.';
  }
};

const validate = () => {
  validateName();
  validateEmail();
};

const submit = (e: SubmitEvent) => {
  e.preventDefault();
  validate();
  if (nameIsError.value || emailIsError.value) return;
  execute();
};
</script>

<template>
  <div class="sm:text-center lg:mx-0 lg:text-left">
    <div v-if="!isFinished || error">
      <form class="mt-3 sm:flex" @submit="submit">
        <label for="name" class="sr-only">Name</label>
        <input
          id="name"
          v-model="payload.name"
          type="text"
          name="name"
          :disabled="isFetching"
          :class="{
            'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 focus:outline-hidden': nameIsError,
          }"
          class="mr-4 block w-full rounded-md border-white/20 bg-white/95 py-3 text-base text-gray-900 placeholder-gray-500 caret-secondary shadow-lg focus:border-accent focus:ring-accent disabled:opacity-60 sm:flex-1"
          placeholder="Full name"
          :aria-invalid="nameIsError"
          aria-describedby="form-errors"
          @blur="validateName(false)"
        />
        <label for="email" class="sr-only">Email</label>
        <input
          id="email"
          v-model="payload.email"
          type="email"
          name="email"
          :disabled="isFetching"
          :class="{
            'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 focus:outline-hidden': emailIsError,
          }"
          class="mt-3 block w-full rounded-md border-white/20 bg-white/95 py-3 text-base text-gray-900 placeholder-gray-500 caret-secondary shadow-lg focus:border-accent focus:ring-accent disabled:opacity-60 sm:mt-0 sm:flex-1"
          placeholder="Email"
          :aria-invalid="emailIsError"
          aria-describedby="form-errors"
          @blur="validateEmail(false)"
        />
        <button
          :disabled="isFetching"
          type="submit"
          class="mt-3 w-full rounded-md border border-transparent bg-accent-dark px-6 py-3 text-base font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:bg-accent hover:shadow-xl focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary-dark focus:outline-hidden disabled:bg-amber-600 sm:mt-0 sm:ml-3 sm:inline-flex sm:w-auto sm:shrink-0 sm:items-center"
        >
          <span>
            <i-mdi-loading v-if="isFetching" class="mr-2 -ml-2 h-6 w-6 animate-spin text-gray-900" />
          </span>
          Notify me
        </button>
      </form>
      <p
        v-if="nameValidationError || emailValidationError"
        id="form-errors"
        class="mt-2 text-sm font-medium text-red-300"
        role="alert"
      >
        {{ nameValidationError }}
        {{ emailValidationError }}
      </p>
      <p class="mt-3 text-sm text-primary-100/80">
        We care about your data. Read our
        <a
          href="/privacy/"
          class="font-medium text-white underline decoration-accent/50 transition-colors hover:decoration-accent"
        >
          Privacy Policy</a>.
      </p>
    </div>
    <div v-if="isFinished && !error">
      <p class="text-base font-medium text-white">
        Thank you for signing up. Please check your email for a confirmation email.
      </p>
    </div>
    <div v-if="error" class="mt-2 text-sm text-red-300">
      <h2 class="text-3xl font-medium text-white">Submit Error</h2>
      {{ data?.message || 'An error occurred.' }}
    </div>
  </div>
</template>