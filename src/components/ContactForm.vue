<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, shallowRef, useTemplateRef, watch } from 'vue';
import { useFetch } from '@vueuse/core';
import HeroiconsMegaphone from 'virtual:icons/heroicons/megaphone';
import MdiLoading from 'virtual:icons/mdi/loading';

interface TurnstileAPI {
  render(container: HTMLElement | string, options: { sitekey: string; theme?: 'light' | 'dark' | 'auto'; size?: 'normal' | 'compact' | 'flexible' }): string;
  remove?(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileAPI;
    __turnstileLoadPromise?: Promise<void>;
  }
}

export interface Props {
  defaultOption?: string | null;
  turnstileSiteKey: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultOption: null,
});

const contactOptions = ['Report a problem', 'Volunteer', 'Information', 'Other'] as const;
type ContactOption = (typeof contactOptions)[number];

const getInitialCategory = (defaultOption: string | null): ContactOption => {
  return contactOptions.find((option) => option === defaultOption) ?? contactOptions[0];
};

const displayMessage = shallowRef('');
const form = reactive({
  name: '',
  email: '',
  category: getInitialCategory(props.defaultOption),
  message: '',
});

const formElement = useTemplateRef<HTMLFormElement>('formElement');
const turnstileContainer = useTemplateRef<HTMLElement>('turnstileContainer');
const turnstileWidgetId = shallowRef<string | null>(null);
const formPayload = shallowRef<FormData | null>(null);

const { isFetching, isFinished, data, error, execute } = useFetch('/contact-form', {
  immediate: false,
})
  .post(formPayload)
  .json();

async function ensureTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined' || window.turnstile) {
    return;
  }

  if (!window.__turnstileLoadPromise) {
    window.__turnstileLoadPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>('script[src*="challenges.cloudflare.com/turnstile/v0/api.js"]');
      if (existingScript) {
        if (window.turnstile) {
          resolve();
          return;
        }

        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(new Error('Failed to load Turnstile script')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Turnstile script'));
      document.head.append(script);
    });
  }

  await window.__turnstileLoadPromise;
}

async function loadAndRenderTurnstile() {
  try {
    await ensureTurnstileScript();

    if (!window.turnstile || !turnstileContainer.value || turnstileWidgetId.value) {
      return;
    }

    turnstileWidgetId.value = window.turnstile.render(turnstileContainer.value, {
      sitekey: props.turnstileSiteKey,
      size: 'flexible',
      theme: 'light',
    });
  } catch (turnstileError) {
    console.error('Turnstile failed to initialize', turnstileError);
  }
}

function submit() {
  error.value = null;
  displayMessage.value = '';

  if (form.name === '' || form.email === '' || form.message === '') {
    error.value = 'Incomplete form';
    displayMessage.value = 'Please fill out your name, email, and message before sending.';
    return;
  }

  const turnstileToken = formElement.value?.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value;

  if (!turnstileToken) {
    error.value = 'Verification failure';
    displayMessage.value = 'Please complete the verification step, then try again.';
    return;
  }

  const nextPayload = new FormData();
  nextPayload.append('name', form.name);
  nextPayload.append('email', form.email);
  nextPayload.append('category', form.category);
  nextPayload.append('message', form.message);
  nextPayload.append('cf-turnstile-response', turnstileToken);

  formPayload.value = nextPayload;
  execute();
}

onMounted(() => {
  void loadAndRenderTurnstile();
});

onBeforeUnmount(() => {
  if (turnstileWidgetId.value && window.turnstile?.remove) {
    window.turnstile.remove(turnstileWidgetId.value);
  }
});

watch(data, (response) => {
  if (!response) return;

  displayMessage.value = "Thanks for reaching out. We'll reply within 2–3 business days.";
  form.name = '';
  form.email = '';
  form.message = '';
  form.category = getInitialCategory(props.defaultOption);
});
</script>

<template>
  <div class="bg-stone-50">
    <div class="mx-auto max-w-(--breakpoint-2xl) px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div class="space-y-8 lg:col-span-5">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <span class="inline-block h-px w-12 bg-primary-dark"></span>
              <span class="font-mono text-[10px] font-black tracking-[0.2em] text-stone-500 uppercase">Contact Us</span>
            </div>

            <slot name="title">
              <h1 class="font-serif text-5xl leading-none font-black tracking-tight text-stone-900 uppercase sm:text-7xl">
                Get In <br />
                <span class="text-primary-dark">Touch.</span>
              </h1>
            </slot>
          </div>

          <p class="text-lg leading-relaxed font-medium text-stone-600">
            <slot name="subtitle">Have a question, comment, or concern? We'd love to hear from you.</slot>
          </p>

          <div class="space-y-4 border-t border-stone-200 pt-8">
            <p class="font-mono text-[10px] font-bold tracking-widest text-stone-500 uppercase">We usually reply within 2–3 business days.</p>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="border border-stone-300 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_18px_48px_rgba(28,25,23,0.08)] md:p-12">
            <form ref="formElement" action="/contact-form" method="POST" class="space-y-8" @submit.prevent="submit">
              <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div class="space-y-2">
                  <label for="name" class="font-mono text-[10px] font-black tracking-widest text-stone-500 uppercase">Name *</label>
                  <input
                    id="name"
                    v-model="form.name"
                    name="name"
                    type="text"
                    required
                    class="block min-h-10 w-full rounded-none border-stone-300 bg-stone-50/50 px-4 py-3 font-mono text-sm transition-[background-color,border-color,box-shadow] duration-200 focus:border-primary-dark focus:bg-white focus:ring-0" />
                </div>
                <div class="space-y-2">
                  <label for="email" class="font-mono text-[10px] font-black tracking-widest text-stone-500 uppercase">Email *</label>
                  <input
                    id="email"
                    v-model="form.email"
                    name="email"
                    autocomplete="email"
                    required
                    type="email"
                    class="block min-h-10 w-full rounded-none border-stone-300 bg-stone-50/50 px-4 py-3 font-mono text-sm transition-[background-color,border-color,box-shadow] duration-200 focus:border-primary-dark focus:bg-white focus:ring-0" />
                </div>
              </div>

              <div class="space-y-2">
                <label for="category" class="font-mono text-[10px] font-black tracking-widest text-stone-500 uppercase">What can we help with? *</label>
                <select
                  id="category"
                  v-model="form.category"
                  name="category"
                  class="block min-h-10 w-full appearance-none rounded-none border-stone-300 bg-stone-50/50 px-4 py-3 font-mono text-sm transition-[background-color,border-color,box-shadow] duration-200 focus:border-primary-dark focus:bg-white focus:ring-0">
                  <option v-for="option in contactOptions" :key="option" :value="option">
                    {{ option.toUpperCase() }}
                  </option>
                </select>
              </div>

              <div v-if="form.category === 'Volunteer'" class="border-l-4 border-accent bg-primary-dark p-6 text-white">
                <h3 class="mb-2 font-mono text-[10px] font-black tracking-widest uppercase">Volunteer Info</h3>
                <p class="text-xs leading-relaxed text-stone-300">
                  Tell us whether you want volunteer updates, help planning a group project, or guidance before your first workday. We will point you to the right next step.
                </p>
              </div>

              <div class="space-y-2">
                <label for="message" class="font-mono text-[10px] font-black tracking-widest text-stone-500 uppercase">Your Message *</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  name="message"
                  required
                  rows="6"
                  class="block w-full rounded-none border-stone-300 bg-stone-50/50 px-4 py-3 font-mono text-sm transition-[background-color,border-color,box-shadow] duration-200 focus:border-primary-dark focus:bg-white focus:ring-0" />
              </div>

              <div ref="turnstileContainer" class="cf-turnstile"></div>

              <div>
                <button :disabled="isFetching" type="submit" class="btn-primary-cta inline-flex w-full items-center justify-center disabled:opacity-50 sm:w-auto">
                  <MdiLoading v-if="isFetching" class="mr-2 h-4 w-4 animate-spin" />
                  Send Message
                </button>
              </div>
            </form>

            <transition
              enter-active-class="transition-[opacity,transform] duration-300 ease-out"
              enter-from-class="opacity-0 translate-y-4"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-[opacity,transform] duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-2">
              <div v-if="isFinished || error" class="mt-8 border p-6" :class="[error ? 'border-red-200 bg-red-50' : 'border-primary-dark bg-primary/5']" aria-live="polite">
                <div class="flex gap-4">
                  <div class="shrink-0">
                    <HeroiconsMegaphone class="h-6 w-6" :class="error ? 'text-red-700' : 'text-primary-dark'" />
                  </div>
                  <div>
                    <h3 :class="[error ? 'text-red-800' : 'text-primary-dark', 'font-mono text-xs font-black tracking-widest uppercase']">
                      {{ error ? 'Message Not Sent' : 'Message Received' }}
                    </h3>
                    <p :class="[error ? 'text-red-700' : 'text-stone-600', 'mt-2 text-xs font-medium']">
                      <span v-if="displayMessage">{{ displayMessage }}</span>
                      <span v-else-if="error">Please try again in a moment.</span>
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
