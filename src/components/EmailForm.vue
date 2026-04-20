<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import { useFetch } from '@vueuse/core';

const nameIsError = shallowRef(false);
const emailIsError = shallowRef(false);
const emailValidationError = shallowRef('');
const nameValidationError = shallowRef('');
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
    nameValidationError.value = 'Please enter your name.';
  }
};

const validateEmail = (requireValue = true) => {
  const email = payload.value.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && emailRegex.test(email)) {
    emailIsError.value = false;
    emailValidationError.value = '';
  } else if (email) {
    emailIsError.value = true;
    emailValidationError.value = 'Please enter a valid email address.';
  } else if (requireValue) {
    emailIsError.value = true;
    emailValidationError.value = 'Please enter a valid email address.';
  }
};

const validate = () => {
  validateName();
  validateEmail();
};

const submit = (event: SubmitEvent) => {
  event.preventDefault();
  validate();
  if (nameIsError.value || emailIsError.value) return;
  execute();
};
</script>

<template>
  <div class="text-left">
    <div v-if="!isFinished || error">
      <form class="mt-3" @submit="submit">
        <label for="name" class="sr-only">Name</label>
        <input
          id="name"
          v-model="payload.name"
          type="text"
          name="name"
          autocomplete="name"
          :disabled="isFetching"
          :class="{
            'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 focus:outline-hidden': nameIsError,
          }"
          class="block min-h-10 w-full rounded-md border-white/20 bg-white/95 py-3 text-base text-stone-900 placeholder-stone-500 caret-secondary shadow-lg transition-[background-color,border-color,box-shadow] duration-200 focus:border-accent focus:ring-accent disabled:opacity-60"
          placeholder="Your name..."
          :aria-invalid="nameIsError"
          aria-describedby="form-errors"
          @blur="validateName(false)" />
        <label for="email" class="sr-only">Email</label>
        <input
          id="email"
          v-model="payload.email"
          type="email"
          name="email"
          autocomplete="email"
          spellcheck="false"
          :disabled="isFetching"
          :class="{
            'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 focus:outline-hidden': emailIsError,
          }"
          class="mt-3 block min-h-10 w-full rounded-md border-white/20 bg-white/95 py-3 text-base text-stone-900 placeholder-stone-500 caret-secondary shadow-lg transition-[background-color,border-color,box-shadow] duration-200 focus:border-accent focus:ring-accent disabled:opacity-60"
          placeholder="Email address..."
          :aria-invalid="emailIsError"
          aria-describedby="form-errors"
          @blur="validateEmail(false)" />
        <button
          :disabled="isFetching"
          type="submit"
          class="mt-3 inline-flex min-h-10 w-full shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent bg-accent-dark px-6 py-3 text-base font-semibold text-stone-900 shadow-lg transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent hover:shadow-xl focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary-dark focus:outline-hidden active:scale-[0.96] disabled:cursor-not-allowed disabled:bg-accent-dark">
          <i-mdi-loading v-if="isFetching" class="mr-2 h-6 w-6 animate-spin text-stone-900" />
          Get updates
        </button>
      </form>
      <p v-if="nameValidationError || emailValidationError" id="form-errors" class="mt-2 text-sm font-medium text-red-300" role="alert">
        {{ nameValidationError }}
        {{ emailValidationError }}
      </p>
      <p class="mt-3 text-sm text-primary">
        We only use your email for Friends of Ute Valley Park updates. Read our
        <a href="/privacy/" class="font-medium underline decoration-accent/50 transition-colors hover:decoration-accent">Privacy Policy</a>.
      </p>
    </div>

    <div v-if="isFinished && !error">
      <p class="text-base font-medium text-white">You're on the list. Check your email to confirm your subscription.</p>
    </div>

    <div v-if="error" class="mt-2 text-sm text-red-300">
      <h2 class="text-xl font-medium text-white">We couldn't sign you up yet.</h2>
      {{ data?.message || 'Please try again in a moment.' }}
    </div>
  </div>
</template>
