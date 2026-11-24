<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, shallowRef, useTemplateRef } from 'vue';
import HeroiconsMegaphone from 'virtual:icons/heroicons/megaphone';
import MdiLoading from 'virtual:icons/mdi/loading';
import { resetTurnstileAfterSubmission, type TurnstileAPI } from './contactFormTurnstile';
import { runFormSubmission, type FormLifecycle } from './formLifecycle';

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
const lifecycle = shallowRef<FormLifecycle>('idle');
const isSubmitting = computed(() => lifecycle.value === 'submitting');
const isSuccess = computed(() => lifecycle.value === 'success');
const isError = computed(() => lifecycle.value === 'error');
const form = reactive({
  name: '',
  email: '',
  category: getInitialCategory(props.defaultOption),
  message: '',
});

const formElement = useTemplateRef<HTMLFormElement>('formElement');
const turnstileContainer = useTemplateRef<HTMLElement>('turnstileContainer');
const turnstileWidgetId = shallowRef<string | null>(null);

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

async function submit() {
  displayMessage.value = '';

  let turnstileToken = '';
  const result = await runFormSubmission(lifecycle, {
    validate: () => {
      if (form.name === '' || form.email === '' || form.message === '') {
        displayMessage.value = 'Please fill out your name, email, and message before sending.';
        return false;
      }

      turnstileToken = formElement.value?.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value ?? '';
      if (!turnstileToken) {
        displayMessage.value = 'Please complete the verification step, then try again.';
        return false;
      }

      return true;
    },
    request: () => {
      const nextPayload = new FormData();
      nextPayload.append('name', form.name);
      nextPayload.append('email', form.email);
      nextPayload.append('category', form.category);
      nextPayload.append('message', form.message);
      nextPayload.append('cf-turnstile-response', turnstileToken);

      return fetch('/contact-form', {
        method: 'POST',
        body: nextPayload,
      });
    },
  });
  resetTurnstileAfterSubmission(window.turnstile, turnstileWidgetId.value, result.submitted);

  if (lifecycle.value === 'success') {
    displayMessage.value = "Thanks for reaching out. We'll reply within 2 to 3 business days.";
    form.name = '';
    form.email = '';
    form.message = '';
    form.category = getInitialCategory(props.defaultOption);
  } else if (!displayMessage.value) {
    displayMessage.value = result.data?.message || 'Please try again in a moment.';
  }
}

onMounted(() => {
  void loadAndRenderTurnstile();
});

onBeforeUnmount(() => {
  if (turnstileWidgetId.value && window.turnstile?.remove) {
    window.turnstile.remove(turnstileWidgetId.value);
  }
});
</script>

<template>
  <div class="contact-form">
    <div class="inner l-container">
      <div class="layout">
        <div class="intro">
          <div class="folio-rule-header">
            <div class="title-block">
              <slot name="title">
                <h2 class="title">Get in touch.</h2>
              </slot>
            </div>
          </div>

          <p class="subtitle">
            <slot name="subtitle">Have a question, trail report, or volunteer inquiry? Send our all-volunteer board a note.</slot>
          </p>

          <div class="response-note">
            <p>Replies typically arrive within 2 to 3 business days.</p>
          </div>
        </div>

        <div class="panel-wrap">
          <div class="panel panel-card panel-card--raised">
            <form ref="formElement" action="/contact-form" method="POST" class="fields" @submit.prevent="submit">
              <div class="field-grid">
                <div class="field form-field">
                  <label for="name" class="form-label">Name</label>
                  <input id="name" v-model="form.name" name="name" type="text" required class="input form-input form-input--quiet" />
                </div>
                <div class="field form-field">
                  <label for="email" class="form-label">Email</label>
                  <input id="email" v-model="form.email" name="email" autocomplete="email" required type="email" class="input form-input form-input--quiet" />
                </div>
              </div>

              <div class="field form-field">
                <label for="category" class="form-label">What can we help with?</label>
                <select id="category" v-model="form.category" name="category" class="input form-input form-input--quiet select">
                  <option v-for="option in contactOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>

              <div class="field form-field">
                <label for="message" class="form-label">Your message</label>
                <textarea id="message" v-model="form.message" name="message" required rows="6" class="input form-input form-input--quiet message" />
              </div>

              <div ref="turnstileContainer" class="cf-turnstile"></div>

              <div>
                <button :disabled="isSubmitting" type="submit" class="button button--brand submit">
                  <MdiLoading v-if="isSubmitting" class="loading-icon" />
                  Send message
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
              <div v-if="isSuccess || isError" :class="['status', isError ? 'error' : 'success']" aria-live="polite">
                <div class="status-content">
                  <div class="status-icon-wrap">
                    <HeroiconsMegaphone :class="['status-icon', isError ? 'error' : 'success']" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 :class="['status-title', isError ? 'error' : 'success']">
                      {{ isError ? 'Message not sent' : 'Message received' }}
                    </h3>
                    <p :class="['status-message', isError ? 'error' : 'success']">
                      <span v-if="displayMessage">{{ displayMessage }}</span>
                      <span v-else-if="isError">Please try again in a moment.</span>
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
  font-family: var(--font-body);
  font-variant-numeric: tabular-nums;
}

.contact-form .inner {
  padding-block: clamp(3rem, 6vw, 4.75rem);
}

.contact-form .layout {
  display: grid;
  min-width: 0;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

.contact-form .intro,
.contact-form .title-block,
.contact-form .fields {
  display: grid;
}

.contact-form .intro {
  min-width: 0;
  gap: 1.25rem;
}

.contact-form .folio-rule-header {
  margin-bottom: 0;
}

.contact-form .title-block :deep(h1),
.contact-form .title-block :deep(h2),
.contact-form .title {
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.6vw, 3.125rem);
  font-weight: 700;
  line-height: 1.06;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.contact-form .subtitle {
  max-width: 44ch;
  margin: 0;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: var(--text-body-large);
  font-weight: 400;
  line-height: 1.6;
}

.contact-form .response-note {
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
}

.contact-form .response-note p {
  margin: 0;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  font-weight: 500;
  line-height: 1.5;
}

.contact-form .panel {
  container-type: inline-size;
}

.contact-form .fields {
  min-width: 0;
  gap: 1.5rem;
}

.contact-form .field-grid {
  display: grid;
  min-width: 0;
  gap: 1.5rem;
}

.contact-form .field {
  --form-field-gap: 0.375rem;
}

.contact-form .input.select {
  display: inline-block;
  -webkit-appearance: none;
  appearance: none;
  padding-right: 2.75rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2344403c'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.875rem center;
  background-size: 1.125rem 1.125rem;
}

.contact-form .input.message {
  min-height: 9rem;
  resize: vertical;
}

.contact-form .submit {
  width: 100%;
  justify-content: center;
}

.contact-form .submit:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.contact-form .loading-icon {
  width: 1rem;
  height: 1rem;
  animation: contact-form-spin 1s linear infinite;
}

.contact-form .status {
  margin-top: 1.5rem;
  border: 1px solid;
  padding: 1.25rem;
}

.contact-form .status.error {
  border-color: color-mix(in oklab, var(--color-danger) 35%, var(--color-surface));
  background: color-mix(in oklab, var(--color-danger) 7%, var(--color-surface));
}

.contact-form .status.success {
  border-color: var(--color-brand-strong);
  background: color-mix(in oklab, var(--color-brand) 6%, var(--color-surface));
}

.contact-form .status-content {
  display: flex;
  gap: 1rem;
}

.contact-form .status-icon-wrap {
  flex-shrink: 0;
}

.contact-form .status-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.contact-form .status-icon.error,
.contact-form .status-title.error,
.contact-form .status-message.error {
  color: var(--color-danger);
}

.contact-form .status-icon.success,
.contact-form .status-title.success {
  color: var(--color-brand-strong);
}

.contact-form .status-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 700;
}

.contact-form .status-message {
  margin: 0.375rem 0 0;
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  font-weight: 500;
  line-height: 1.5;
}

.contact-form .status-message.success {
  color: var(--color-text-muted);
}

.contact-form-status-enter-active {
  transition:
    opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.contact-form-status-leave-active {
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.contact-form-status-enter-from {
  opacity: 0;
  transform: translateY(0.75rem);
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

@container (min-width: 36rem) {
  .contact-form .field-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contact-form .submit {
    width: auto;
  }
}

@media (min-width: 64rem) {
  .contact-form .layout {
    grid-template-columns: 5fr 7fr;
  }
}
</style>
