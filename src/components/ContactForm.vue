<template>
  <div>
    <!-- contact form -->
    <div class="isolate overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div class="relative mx-auto max-w-7xl">
        <div class="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60" aria-hidden="true">
          <div
            class="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/4 rotate-[30deg] bg-linear-to-tr from-green-200 to-teal-200 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            " />
        </div>
      </div>
      <div class="relative mx-auto max-w-xl">
        <div>
          <slot name="title">
            <p class="text-base font-semibold leading-7 text-green-600">Need Help? Contact Us!</p>
            <h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">Contact Friends of Ute Valley Park</h1>
          </slot>
          <p class="mt-4 text-base leading-6 text-gray-500">
            <slot name="subtitle">
              If you have a question, comment or concern, don't hesitate to reach out. Our team is always here to assist you in any way we can. Before contacting us, please take a moment to browse our
              <a class="font-semibold text-green-700 no-underline" href="/faq/"> FAQ </a> page to see if your question has already been answered. We look forward to hearing from you!
            </slot>
          </p>
        </div>
        <div class="mt-8">
          <p class="mb-1"><span class="text-red-700">*</span> indicates a required field</p>
          <form action="/contact-form" method="POST" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" @submit.prevent="submit">
            <div class="sm:col-span-2">
              <label for="name" class="block text-sm font-semibold text-gray-700">Name <span class="text-red-700">*</span></label>
              <div class="mt-1">
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  name="name"
                  autocomplete="given-name"
                  class="block w-full rounded-md border-gray-300 px-4 py-3 shadow-xs focus:border-green-500 focus:ring-green-500" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-semibold text-gray-700">Email <span class="text-red-700">*</span></label>
              <div class="relative mt-1 rounded-md shadow-xs">
                <input
                  id="email"
                  v-model="form.email"
                  autocomplete="email"
                  required
                  type="email"
                  class="block w-full rounded-md border-gray-300 px-4 py-3 shadow-xs focus:border-green-500 focus:ring-green-500" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="category" class="mb-1 block text-sm font-semibold text-gray-700">Category <span class="text-red-700">*</span></label>
              <select id="category" v-model="form.category" class="block w-full rounded-md border-gray-300 px-3 py-3 shadow-xs focus:border-green-500 focus:ring-green-500">
                <option v-for="option in options" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>

            <div v-if="form.category == 'Volunteer'" class="sm:col-span-2">
              <div class="rounded-md bg-green-50/60 p-4">
                <div class="flex">
                  <div class="shrink-0">
                    <i-heroicons-exclamation-circle class="mt-1 h-6 w-6 text-green-800" aria-hidden="true" />
                  </div>
                  <div class="ml-3">
                    <h3 class="text-xl font-medium text-green-800">Volunteer Information</h3>
                    <div class="mt-2 text-sm text-green-700">
                      <p>
                        We hold volunteer work events the first and third Wednesday of the month April through September. You can find more information on our
                        <a class="text-green-800 underline" href="/volunteer/"> volunteer </a>
                        page. Also, consider following our
                        <a class="text-green-800 underline" href="https://www.facebook.com/FriendsOfUteValleyPark">Facebook</a>
                        or
                        <a class="text-green-800 underline" href="https://www.instagram.com/friendsofutevalleypark/">Instagram</a>
                        for updates.
                      </p>
                      <p class="mt-2">If you have any questions regarding volunteering or organizing a volunteer event please contact us.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="message" class="block text-sm font-semibold text-gray-700">Message <span class="text-red-700">*</span></label>
              <div class="relative mt-1 rounded-md shadow-xs">
                <textarea id="message" v-model="form.message" required rows="4" class="block w-full rounded-md border-gray-300 px-4 py-3 shadow-xs focus:border-green-500 focus:ring-green-500" />
              </div>
            </div>

            <div class="sm:col-span-2">
              <div class="cf-turnstile" :data-sitekey="turnstileSiteKey"></div>
            </div>

            <div class="sm:col-span-2">
              <span class="inline-flex w-full rounded-md shadow-xs">
                <button
                  :disabled="isFetching"
                  type="submit"
                  class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-700 px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-green-500 focus:outline-hidden focus:ring-2 focus:ring-green-500 active:bg-green-700 disabled:opacity-25">
                  <span>
                    <i-mdi-loading v-if="isFetching" class="-ml-1 mr-2 h-6 w-6 animate-spin text-white" />
                  </span>
                  Submit
                </button>
              </span>
            </div>
          </form>
        </div>

        <!-- notification banner -->
        <div v-if="isFinished" class="my-8 rounded-md p-4" :class="[error ? 'bg-red-50' : 'bg-green-50']">
          <div class="flex">
            <div class="shrink-0">
              <i-heroicons-megaphone class="size-6" :class="[error ? 'text-red-800' : 'text-green-800']" />
            </div>
            <div class="ml-3">
              <h3 :class="[error ? 'text-red-800' : 'text-green-800', 'text-lg font-medium']">{{ error ? 'There were errors with your submission' : 'Thank you for contacting us!' }}</h3>
              <div :class="[error ? 'text-red-700' : 'text-green-700', 'mt-2 text-sm ']">
                <p class="text-pretty font-medium">
                  <span v-if="displayMessage">{{ displayMessage }}</span>
                  <span v-else-if="error">There was an error processing your request: {{ error }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFetch } from '@vueuse/core';

export interface Props {
  defaultOption?: string | null;
  turnstileSiteKey: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultOption: null,
});

const displayMessage = ref('');
const options = ['Report a problem', 'Volunteer', 'Information', 'Other'];
const form = ref({
  name: '',
  email: '',
  category: props.defaultOption || 'Report a problem',
  message: '',
});

const { isFetching, isFinished, data, error, execute } = useFetch('/contact-form', { immediate: false })
  .post({
    payload: form.value,
  })
  .json();

function submit() {
  if (form.value.name === '' || form.value.email === '' || form.value.message === '') {
    error.value = 'Please fill out the form completely';
    isFinished.value = true;
    return;
  }
  execute();
}

watch(data, () => {
  displayMessage.value = "Thank you for contacting Friends of Ute Valley Park! We'll review your message shortly.";
  form.value.name = '';
  form.value.email = '';
  form.value.message = '';
});
</script>
