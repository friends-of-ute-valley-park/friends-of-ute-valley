<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import { useFetch } from '@vueuse/core';
import MdiAccountOutline from 'virtual:icons/mdi/account-outline';
import MdiEmailOutline from 'virtual:icons/mdi/email-outline';
import MdiLoading from 'virtual:icons/mdi/loading';

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
      <form class="space-y-3" @submit="submit">
        <label for="name" class="sr-only">Name</label>
        <div class="relative">
          <MdiAccountOutline class="pointer-events-none absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-stone-500" aria-hidden="true" />
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
            class="block min-h-12 w-full rounded-md border border-stone-200 bg-white py-3 pr-4 pl-12 text-base text-stone-900 caret-secondary shadow-md transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-stone-500 focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-hidden disabled:opacity-60"
            placeholder="Your name..."
            :aria-invalid="nameIsError"
            aria-describedby="form-errors"
            @blur="validateName(false)" />
        </div>
        <label for="email" class="sr-only">Email</label>
        <div class="relative">
          <MdiEmailOutline class="pointer-events-none absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-stone-500" aria-hidden="true" />
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
            class="block min-h-12 w-full rounded-md border border-stone-200 bg-white py-3 pr-4 pl-12 text-base text-stone-900 caret-secondary shadow-md transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-stone-500 focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-hidden disabled:opacity-60"
            placeholder="Email address..."
            :aria-invalid="emailIsError"
            aria-describedby="form-errors"
            @blur="validateEmail(false)" />
        </div>
        <button
          :disabled="isFetching"
          type="submit"
          class="inline-flex min-h-12 w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-md border border-transparent bg-accent-dark px-6 py-3 font-mono text-sm font-black tracking-widest text-white uppercase shadow-lg transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent-darker hover:shadow-xl focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-white focus:outline-hidden active:scale-96 disabled:cursor-not-allowed disabled:bg-accent-dark">
          <MdiLoading v-if="isFetching" class="h-5 w-5 animate-spin text-white" />
          <MdiEmailOutline v-else class="h-5 w-5 text-white" aria-hidden="true" />
          Get updates
        </button>
      </form>
      <p v-if="nameValidationError || emailValidationError" id="form-errors" class="mt-2 text-sm font-medium text-red-700" role="alert">
        {{ nameValidationError }}
        {{ emailValidationError }}
      </p>
      <p class="mt-4 text-sm leading-relaxed text-stone-700">
        We only use your email for Friends of Ute Valley Park updates. Read our
        <a href="/privacy/" class="font-bold text-primary-dark underline decoration-accent/70 transition-colors hover:decoration-accent">Privacy Policy</a>.
      </p>
    </div>

    <div v-if="isFinished && !error">
      <p class="text-base font-medium text-primary-dark">You're on the list. Check your email to confirm your subscription.</p>
    </div>

    <div v-if="error" class="mt-2 text-sm text-red-700">
      <h2 class="text-xl font-medium text-stone-900">We couldn't sign you up yet.</h2>
      {{ data?.message || 'Please try again in a moment.' }}
    </div>
  </div>
</template>
