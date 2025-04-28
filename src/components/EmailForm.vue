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
          :class="{
            'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-hidden focus:ring-red-500': nameIsError,
          }"
          class="mr-4 block w-full rounded-md border-gray-300 py-3 text-base placeholder-gray-500 shadow-xs focus:border-green-500 focus:ring-green-500 sm:flex-1"
          placeholder="Full name"
          @blur="validate" />
        <label for="email" class="sr-only">Email</label>
        <input
          id="email"
          v-model="payload.email"
          type="text"
          name="email"
          :class="{
            'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-hidden focus:ring-red-500': emailIsError,
          }"
          class="mt-3 block w-full rounded-md border-gray-300 py-3 text-base placeholder-gray-500 shadow-xs focus:border-green-500 focus:ring-green-500 sm:mt-0 sm:flex-1"
          placeholder="Email"
          @blur="validate" />
        <button
          :disabled="isFetching"
          type="submit"
          class="mt-3 w-full rounded-md border border-transparent bg-green-700 px-6 py-3 text-base font-medium text-green-50 shadow-xs hover:bg-green-800 focus:outline-hidden focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-600 sm:ml-3 sm:mt-0 sm:inline-flex sm:w-auto sm:shrink-0 sm:items-center">
          <span>
            <i-mdi-loading v-if="isFetching" class="-ml-2 mr-2 h-6 w-6 animate-spin text-white" />
          </span>
          Notify me
        </button>
      </form>
      <p v-if="nameValidationError || emailValidationError" class="mt-2 text-sm text-red-600">
        {{ nameValidationError }}
        {{ emailValidationError }}
      </p>
      <p class="mt-3 text-sm text-gray-500">
        We care about your data. Read our
        <a href="/privacy/" class="font-medium text-gray-900 underline"> Privacy Policy</a>.
      </p>
    </div>
    <div v-if="isFinished && !error">
      <p class="text-base font-medium text-gray-900">Thank you for signing up. Please check your email for a confirmation email.</p>
    </div>
    <div v-if="error" class="mt-2 text-sm text-red-600">
      <h2 class="text-3xl font-medium">Submit Error</h2>
      {{ data.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { ref } from 'vue';

const nameIsError = ref(false);
const emailIsError = ref(false);
const emailValidationError = ref('');
const nameValidationError = ref('');
const payload = ref({ name: '', email: '' });

const { isFetching, isFinished, error, data, execute } = useFetch('/email-signup', { updateDataOnError: true, immediate: false })
  .post({
    payload: payload.value,
  })
  .json();

const submit = async function (e: Event) {
  e.preventDefault();
  validate();
  if (nameValidationError.value || emailValidationError.value) return;
  execute();
};

const validate = function () {
  if (payload.value.name) {
    nameIsError.value = false;
    nameValidationError.value = '';
  } else {
    nameIsError.value = true;
    nameValidationError.value = 'Please enter your name.';
  }
  if (payload.value.email && payload.value.email.includes('@') && payload.value.email.includes('.')) {
    emailIsError.value = false;
    emailValidationError.value = '';
  } else {
    emailIsError.value = true;
    emailValidationError.value = 'Please enter a valid email address.';
  }
};
</script>
