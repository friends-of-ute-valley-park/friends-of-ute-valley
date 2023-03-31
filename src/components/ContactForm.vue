<template>
  <div>
    <!-- notification banner -->
    <div v-if="message" class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="p-2 rounded-lg bg-green-600 shadow-lg sm:p-3">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-green-800">
              <MegaphoneIcon class="h-6 w-6 text-white" />
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
            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
        <svg class="absolute right-full bottom-0 transform -translate-x-1/2" width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
        <div>
          <slot name="title">
            <p class="text-base font-semibold leading-7 text-green-600">Need Help? Contact Us!</p>
            <h1 class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">Contact Friends of Ute Valley Park</h1>
          </slot>
          <p class="mt-4 text-base leading-6 text-gray-500">
            <slot name="subtitle">
              If you have a question, comment or concern, don't hesitate to reach out. Our team is always here to assist you in any way we can. Before contacting us, please take a moment to browse our
              <a class="font-semibold no-underline text-green-700" href="/faq"> FAQ </a> page to see if your question has already been answered. We look forward to hearing from you!
            </slot>
          </p>
        </div>
        <p class="my-2"><span class="text-red-700">*</span> indicates a required field</p>
        <div class="mt-8">
          <form action="/.netlify/functions/contact-form" method="POST" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" @submit.prevent="submit">
            <div class="sm:col-span-2">
              <label for="name" class="block text-sm font-semibold text-gray-700">Name <span class="text-red-700">*</span></label>
              <div class="mt-1">
                <input
                  id="name"
                  v-model="form.name"
                  required
                  type="text"
                  name="name"
                  autocomplete="given-name"
                  class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-semibold text-gray-700">Email <span class="text-red-700">*</span></label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  v-model="form.email"
                  autocomplete="email"
                  required
                  type="email"
                  class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="category" class="block text-sm font-semibold text-gray-700 mb-1">Category <span class="text-red-700">*</span></label>
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
                    <ExclamationCircleIcon class="w-5 h-5 text-green-800" aria-hidden="true" />
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-green-800">Volunteer Information</h3>
                    <div class="mt-2 text-sm text-green-700">
                      <p>
                        We hold volunteer work events the first and third Wednesday of the month April through September. You can find more information on our
                        <a class="underline text-green-800" href="/volunteer"> volunteer </a>
                        page. Also, consider following our
                        <a class="underline text-green-800" href="https://www.facebook.com/FriendsOfUteValleyPark">Facebook</a>
                        or
                        <a class="underline text-green-800" href="https://www.instagram.com/friendsofutevalleypark/">Instagram</a>
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
              <div class="mt-1 relative rounded-md shadow-sm">
                <textarea id="message" v-model="form.message" required rows="4" class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md" />
              </div>
            </div>

            <div class="sm:col-span-2">
              <span class="w-full inline-flex rounded-md shadow-sm">
                <button
                  :disabled="submitInProgress"
                  type="submit"
                  class="disabled:opacity-25 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-700 hover:bg-green-500 focus:outline-none focus:ring-green-500 focus:ring-2 active:bg-green-700 transition ease-in-out duration-150">
                  <span>
                    <svg v-if="submitInProgress" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
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

<script setup lang="ts">
import { ref } from 'vue';
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid/esm/index.js';
import { MegaphoneIcon } from '@heroicons/vue/24/outline/esm/index.js';
const props = defineProps({
  defaultOption: {
    type: String,
    default: null,
  },
});

const message = ref('');
const options = ['Report a problem', 'Volunteer', 'Information', 'Other'];
const form = ref({
  name: '',
  email: '',
  category: props.defaultOption || 'Report a problem',
  message: '',
});
const submitInProgress = ref(false);

async function submit() {
  submitInProgress.value = true;
  if (form.value.name === '' || form.value.email === '' || form.value.message === '') {
    message.value = 'Please fill out the form completely';
    return;
  }
  try {
    const res = await fetch('/.netlify/functions/contact-form', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        category: form.value.category,
        message: form.value.message,
      }),
    });
    if (res.ok === true) {
      message.value = "Thank you for contacting Friends of Ute Valley Park! We'll review your message shortly.";
      form.value.name = '';
      form.value.email = '';
      form.value.message = '';
    } else {
      message.value = `There was an error processing your request: ${res.statusText}`;
    }
  } catch (err: any) {
    message.value = err.message;
  } finally {
    submitInProgress.value = false;
  }
}
</script>
