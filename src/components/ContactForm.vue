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
  if (!response?.status) return;

  displayMessage.value = "Thanks for reaching out. We'll reply within 2–3 business days.";
  form.name = '';
  form.email = '';
  form.message = '';
  form.category = getInitialCategory(props.defaultOption);
});
</script>

<template>
  <div class="contact-form">
    <div class="contact-form__inner">
      <div class="contact-form__layout">
        <div class="contact-form__intro">
          <div class="contact-form__title-block">
            <div class="contact-form__eyebrow">
              <span></span>
              <span>Contact Us</span>
            </div>

            <slot name="title">
              <h1 class="contact-form__title">
                Get In <br />
                <span>Touch.</span>
              </h1>
            </slot>
          </div>

          <p class="contact-form__subtitle">
            <slot name="subtitle">Have a question, comment, or concern? We'd love to hear from you.</slot>
          </p>

          <div class="contact-form__response-note">
            <p>We usually reply within 2–3 business days.</p>
          </div>
        </div>

        <div class="contact-form__panel-wrap">
          <div class="contact-form__panel">
            <form ref="formElement" action="/contact-form" method="POST" class="contact-form__fields" @submit.prevent="submit">
              <div class="contact-form__field-grid">
                <div class="contact-form__field">
                  <label for="name">Name *</label>
                  <input
                    id="name"
                    v-model="form.name"
                    name="name"
                    type="text"
                    required
                    class="contact-form__input" />
                </div>
                <div class="contact-form__field">
                  <label for="email">Email *</label>
                  <input
                    id="email"
                    v-model="form.email"
                    name="email"
                    autocomplete="email"
                    required
                    type="email"
                    class="contact-form__input" />
                </div>
              </div>

              <div class="contact-form__field">
                <label for="category">What can we help with? *</label>
                <select
                  id="category"
                  v-model="form.category"
                  name="category"
                  class="contact-form__input contact-form__input--select">
                  <option v-for="option in contactOptions" :key="option" :value="option">
                    {{ option.toUpperCase() }}
                  </option>
                </select>
              </div>

              <div v-if="form.category === 'Volunteer'" class="contact-form__volunteer-note">
                <h3>Volunteer Info</h3>
                <p>
                  Tell us whether you want volunteer updates, help planning a group project, or guidance before your first workday. We will point you to the right next step.
                </p>
              </div>

              <div class="contact-form__field">
                <label for="message">Your Message *</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  name="message"
                  required
                  rows="6"
                  class="contact-form__input contact-form__input--message" />
              </div>

              <div ref="turnstileContainer" class="cf-turnstile"></div>

              <div>
                <button :disabled="isFetching" type="submit" class="button button--brand contact-form__submit">
                  <MdiLoading v-if="isFetching" class="contact-form__loading-icon" />
                  Send Message
                </button>
              </div>
            </form>

            <transition
              enter-active-class="contact-form-status-enter-active"
              enter-from-class="contact-form-status-enter-from"
              enter-to-class="contact-form-status-enter-to"
              leave-active-class="contact-form-status-leave-active"
              leave-from-class="contact-form-status-leave-from"
              leave-to-class="contact-form-status-leave-to">
              <div v-if="isFinished || error" :class="['contact-form__status', error ? 'contact-form__status--error' : 'contact-form__status--success']" aria-live="polite">
                <div class="contact-form__status-content">
                  <div class="contact-form__status-icon-wrap">
                    <HeroiconsMegaphone :class="['contact-form__status-icon', error ? 'contact-form__status-icon--error' : 'contact-form__status-icon--success']" />
                  </div>
                  <div>
                    <h3 :class="['contact-form__status-title', error ? 'contact-form__status-title--error' : 'contact-form__status-title--success']">
                      {{ error ? 'Message Not Sent' : 'Message Received' }}
                    </h3>
                    <p :class="['contact-form__status-message', error ? 'contact-form__status-message--error' : 'contact-form__status-message--success']">
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

<style scoped>
  .contact-form {
    background: var(--color-page);
  }

  .contact-form__inner {
    width: min(100% - (var(--space-page-x) * 2), var(--container-wide));
    margin-inline: auto;
    padding-block: clamp(4rem, 8vw, 6rem);
  }

  .contact-form__layout {
    display: grid;
    min-width: 0;
    gap: clamp(2rem, 5vw, 4rem);
  }

  .contact-form__intro,
  .contact-form__title-block,
  .contact-form__fields {
    display: grid;
  }

  .contact-form__intro {
    min-width: 0;
    gap: 1.25rem;
  }

  .contact-form__title-block {
    min-width: 0;
    gap: 0.75rem;
  }

  .contact-form__eyebrow {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .contact-form__eyebrow span:first-child {
    display: inline-block;
    width: 3rem;
    height: 1px;
    background: var(--color-brand-strong);
  }

  .contact-form__eyebrow span:last-child,
  .contact-form__response-note p,
  .contact-form__field label,
  .contact-form__volunteer-note h3,
  .contact-form__status-title {
    font-family: var(--font-label);
    font-size: var(--text-label);
    font-weight: 900;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
  }

  .contact-form__eyebrow span:last-child,
  .contact-form__response-note p,
  .contact-form__field label {
    color: var(--color-text-subtle);
  }

  .contact-form__title {
    margin: 0;
    color: var(--color-text-strong);
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 4.5rem);
    font-weight: 900;
    line-height: 1;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .contact-form__title span {
    color: var(--color-brand-strong);
  }

  .contact-form__subtitle {
    margin: 0;
    color: var(--color-text-muted);
    font-size: var(--text-body-large);
    font-weight: 500;
    line-height: var(--leading-body);
  }

  .contact-form__response-note {
    display: grid;
    gap: 1rem;
    border-top: 1px solid var(--color-border-muted);
    padding-top: 1.25rem;
  }

  .contact-form__response-note p {
    margin: 0;
  }

  .contact-form__panel {
    container-type: inline-size;
    min-width: 0;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    padding: clamp(2rem, 4vw, 3rem);
    box-shadow:
      0 1px 2px rgb(0 0 0 / 5%),
      0 18px 48px rgb(28 25 23 / 8%);
  }

  .contact-form__fields {
    min-width: 0;
    gap: 2rem;
  }

  .contact-form__field-grid {
    display: grid;
    min-width: 0;
    gap: 2rem;
  }

  .contact-form__field {
    display: grid;
    min-width: 0;
    gap: 0.5rem;
  }

  .contact-form__input {
    display: block;
    width: 100%;
    min-width: 0;
    min-height: 2.5rem;
    border: 1px solid var(--color-border);
    border-radius: 0;
    background: color-mix(in oklab, var(--color-page) 50%, transparent);
    color: var(--color-text);
    padding: 0.75rem 1rem;
    font-family: var(--font-label);
    font-size: var(--text-body-small);
    transition:
      background-color 200ms,
      border-color 200ms,
      box-shadow 200ms;
  }

  .contact-form__input:focus-visible {
    border-color: var(--color-brand-strong);
    background: var(--color-surface);
    box-shadow: none;
    outline: 0;
  }

  .contact-form__input--select {
    appearance: none;
  }

  .contact-form__input--message {
    min-height: 9rem;
    resize: vertical;
  }

  .contact-form__volunteer-note {
    border-left: 4px solid var(--color-accent);
    background: var(--color-brand-strong);
    color: var(--color-text-inverse);
    padding: 1.5rem;
  }

  .contact-form__volunteer-note h3 {
    margin: 0 0 0.5rem;
  }

  .contact-form__volunteer-note p {
    margin: 0;
    color: var(--color-text-inverse-muted);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: var(--leading-body);
  }

  .contact-form__submit {
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  .contact-form__submit:disabled {
    opacity: 0.5;
  }

  .contact-form__loading-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    animation: contact-form-spin 1s linear infinite;
  }

  .contact-form__status {
    margin-top: 2rem;
    border: 1px solid;
    padding: 1.5rem;
  }

  .contact-form__status--error {
    border-color: color-mix(in oklab, var(--color-danger) 20%, var(--color-surface));
    background: color-mix(in oklab, var(--color-danger) 8%, var(--color-surface));
  }

  .contact-form__status--success {
    border-color: var(--color-brand-strong);
    background: color-mix(in oklab, var(--color-brand) 5%, transparent);
  }

  .contact-form__status-content {
    display: flex;
    gap: 1rem;
  }

  .contact-form__status-icon-wrap {
    flex-shrink: 0;
  }

  .contact-form__status-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .contact-form__status-icon--error,
  .contact-form__status-title--error,
  .contact-form__status-message--error {
    color: var(--color-danger);
  }

  .contact-form__status-icon--success,
  .contact-form__status-title--success {
    color: var(--color-brand-strong);
  }

  .contact-form__status-title {
    margin: 0;
  }

  .contact-form__status-message {
    margin: 0.5rem 0 0;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .contact-form__status-message--success {
    color: var(--color-text-muted);
  }

  .contact-form-status-enter-active {
    transition:
      opacity 300ms,
      transform 300ms;
  }

  .contact-form-status-leave-active {
    transition:
      opacity 200ms,
      transform 200ms;
  }

  .contact-form-status-enter-from {
    opacity: 0;
    transform: translateY(1rem);
  }

  .contact-form-status-enter-to,
  .contact-form-status-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .contact-form-status-leave-to {
    opacity: 0;
    transform: translateY(0.5rem);
  }

  @keyframes contact-form-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @container (min-width: 38rem) {
    .contact-form__field-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .contact-form__submit {
      width: auto;
    }
  }

  @media (min-width: 64rem) {
    .contact-form__layout {
      grid-template-columns: 5fr 7fr;
    }
  }
</style>
