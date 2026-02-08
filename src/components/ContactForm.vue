<template>
  <div class="bg-stone-50">
    <div class="mx-auto max-w-(--breakpoint-2xl) px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <!-- Technical Label & Title -->
        <div class="lg:col-span-5 space-y-8">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <span class="inline-block h-px w-12 bg-primary-dark"></span>
              <span class="font-mono text-[10px] font-black tracking-[0.2em] uppercase text-stone-500">
                Contact Us
              </span>
            </div>

            <slot name="title">
              <h1
                class="text-5xl sm:text-7xl font-serif font-black uppercase tracking-tight text-stone-900 leading-none">
                Get In <br /> <span class="text-primary-dark">Touch.</span>
              </h1>
            </slot>
          </div>

          <p class="text-lg text-stone-600 font-medium leading-relaxed">
            <slot name="subtitle">
              Have a question, comment, or concern? We'd love to hear from you!
            </slot>
          </p>

          <div class="pt-8 border-t border-stone-200 space-y-4">
            <p class="font-mono text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              We typically respond within 2–3 business days.
            </p>
          </div>
        </div>

        <!-- Form Interface -->
        <div class="lg:col-span-7">
          <div class="bg-white border border-stone-300 p-8 md:p-12 shadow-sm">
            <form action="/contact-form" method="POST" class="space-y-8" @submit.prevent="submit">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label for="name"
                    class="font-mono text-[10px] font-black uppercase tracking-widest text-stone-500">Name *</label>
                  <input id="name" v-model="form.name" type="text" required name="name"
                    class="block w-full border-stone-300 px-4 py-3 font-mono text-sm focus:border-primary-dark focus:ring-0 rounded-none bg-stone-50/50" />
                </div>
                <div class="space-y-2">
                  <label for="email"
                    class="font-mono text-[10px] font-black uppercase tracking-widest text-stone-500">Email *</label>
                  <input id="email" v-model="form.email" autocomplete="email" required type="email"
                    class="block w-full border-stone-300 px-4 py-3 font-mono text-sm focus:border-primary-dark focus:ring-0 rounded-none bg-stone-50/50" />
                </div>
              </div>

              <div class="space-y-2">
                <label for="category"
                  class="font-mono text-[10px] font-black uppercase tracking-widest text-stone-500">Category *</label>
                <select id="category" v-model="form.category"
                  class="block w-full border-stone-300 px-4 py-3 font-mono text-sm focus:border-primary-dark focus:ring-0 rounded-none bg-stone-50/50 appearance-none">
                  <option v-for="option in options" :key="option">
                    {{ option.toUpperCase() }}
                  </option>
                </select>
              </div>

              <div v-if="form.category == 'Volunteer'" class="p-6 bg-primary-dark text-white border-l-4 border-accent">
                <h3 class="font-mono text-[10px] font-black uppercase tracking-widest mb-2">Volunteer Info</h3>
                <p class="text-xs leading-relaxed text-stone-300">
                  We host volunteer events April through September. Check out the <a
                    class="underline decoration-accent/50 transition-colors hover:decoration-accent font-bold"
                    href="/volunteer/">volunteer page</a> for details and upcoming events.
                </p>
              </div>

              <div class="space-y-2">
                <label for="message"
                  class="font-mono text-[10px] font-black uppercase tracking-widest text-stone-500">Your Message *</label>
                <textarea id="message" v-model="form.message" required rows="6"
                  class="block w-full border-stone-300 px-4 py-3 font-mono text-sm focus:border-primary-dark focus:ring-0 rounded-none bg-stone-50/50" />
              </div>

              <div class="cf-turnstile" :data-sitekey="turnstileSiteKey" data-size="flexible" data-theme="light"></div>

              <div>
                <button :disabled="isFetching" type="submit"
                  class="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary-dark text-white font-mono text-sm font-bold uppercase transition-all duration-300 hover:bg-primary hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_0px_var(--color-accent)] active:scale-95 shadow-[4px_4px_0px_0px_var(--color-accent)] disabled:opacity-50">
                  <i-mdi-loading v-if="isFetching" class="mr-2 h-4 w-4 animate-spin" />
                  Send Message
                </button>
              </div>
            </form>

            <!-- Notification Banner -->
            <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-4"
              enter-to-class="opacity-100 translate-y-0">
              <div v-if="isFinished || error" class="mt-8 p-6 border"
                :class="[error ? 'bg-red-50 border-red-200' : 'bg-primary/5 border-primary-dark']">
                <div class="flex gap-4">
                  <div class="shrink-0">
                    <i-heroicons-megaphone class="h-6 w-6" :class="error ? 'text-red-700' : 'text-primary-dark'" />
                  </div>
                  <div>
                    <h3
                      :class="[error ? 'text-red-800' : 'text-primary-dark', 'font-mono text-xs font-black uppercase tracking-widest']">
                      {{ error ? 'Something Went Wrong' : 'Message Sent' }}
                    </h3>
                    <p :class="[error ? 'text-red-700' : 'text-stone-600', 'mt-2 text-xs font-medium']">
                      <span v-if="displayMessage">{{ displayMessage }}</span>
                      <span v-else-if="error">There was an error: {{ error }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </transition>
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

const formPayload = ref<FormData | null>(null);

const { isFetching, isFinished, data, error, execute } = useFetch('/contact-form', {
  immediate: false,
})
  .post(formPayload)
  .json();

function submit() {
  error.value = null;
  if (form.value.name === '' || form.value.email === '' || form.value.message === '') {
    error.value = 'Incomplete form';
    displayMessage.value = 'Please fill out all required fields.';
    return;
  }

  const turnstileToken = (document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value;

  if (!turnstileToken || turnstileToken === '') {
    error.value = 'Verification failure';
    displayMessage.value = 'Please verify you are not a robot and try again.';
    return;
  }

  const formData = new FormData();
  formData.append('name', form.value.name);
  formData.append('email', form.value.email);
  formData.append('category', form.value.category);
  formData.append('message', form.value.message);
  formData.append('cf-turnstile-response', turnstileToken);

  formPayload.value = formData;
  execute();
}

watch(data, () => {
  displayMessage.value = "Thank you for contacting Friends of Ute Valley Park! We'll get back to you soon.";
  form.value.name = '';
  form.value.email = '';
  form.value.message = '';
});
</script>

<style scoped>
.font-serif {
  font-family: 'EditorialSerif', serif;
}
</style>
