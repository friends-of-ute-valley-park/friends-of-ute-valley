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
  <div class="email-signup">
    <div v-if="!isFinished || error">
      <form class="form" @submit="submit">
        <label for="name" class="sr-only">Name</label>
        <div class="field">
          <MdiAccountOutline class="field-icon" aria-hidden="true" />
          <input
            id="name"
            v-model="payload.name"
            type="text"
            name="name"
            autocomplete="name"
            :disabled="isFetching"
            :class="['input form-input form-input--newsletter', nameIsError && 'form-input--invalid']"
            placeholder="Your name..."
            :aria-invalid="nameIsError"
            aria-describedby="form-errors"
            @blur="validateName(false)" />
        </div>
        <label for="email" class="sr-only">Email</label>
        <div class="field">
          <MdiEmailOutline class="field-icon" aria-hidden="true" />
          <input
            id="email"
            v-model="payload.email"
            type="email"
            name="email"
            autocomplete="email"
            spellcheck="false"
            :disabled="isFetching"
            :class="['input form-input form-input--newsletter', emailIsError && 'form-input--invalid']"
            placeholder="Email address..."
            :aria-invalid="emailIsError"
            aria-describedby="form-errors"
            @blur="validateEmail(false)" />
        </div>
        <button :disabled="isFetching" type="submit" class="button button--accent button--full submit">
          <MdiLoading v-if="isFetching" class="submit-icon loading" />
          <MdiEmailOutline v-else class="submit-icon" aria-hidden="true" />
          Get updates
        </button>
      </form>
      <p v-if="nameValidationError || emailValidationError" id="form-errors" class="error" role="alert">
        {{ nameValidationError }}
        {{ emailValidationError }}
      </p>
      <p class="privacy">
        We only use your email for Friends of Ute Valley Park updates. Read our
        <a href="/privacy/">Privacy Policy</a>.
      </p>
    </div>

    <div v-if="isFinished && !error">
      <p class="success">You're on the list. Check your email to confirm your subscription.</p>
    </div>

    <div v-if="error" class="failure">
      <h2>We couldn't sign you up yet.</h2>
      {{ data?.message || 'Please try again in a moment.' }}
    </div>
  </div>
</template>

<style scoped>
.email-signup {
  width: 100%;
  min-width: 0;
  text-align: left;
}

.email-signup .form {
  display: grid;
  min-width: 0;
  gap: 0.75rem;
}

.email-signup .field {
  position: relative;
  min-width: 0;
}

.email-signup .field-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-text-subtle);
  pointer-events: none;
  transform: translateY(-50%);
}

.email-signup .input::placeholder {
  color: var(--color-text-subtle);
}

.email-signup .submit {
  min-height: 3rem;
  flex-shrink: 0;
  cursor: pointer;
  gap: 0.75rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  padding: 0.75rem 1.5rem;
  font-size: var(--text-body-small);
  letter-spacing: 0.12em;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%);
  transition-duration: 200ms;
}

.email-signup .submit:disabled {
  cursor: not-allowed;
  background: var(--color-accent-hover);
}

.email-signup .submit:hover {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 10%);
}

.email-signup .submit-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-text-inverse);
}

.email-signup .submit-icon.loading {
  animation: email-signup-spin 1s linear infinite;
}

.email-signup .error {
  margin: 0.5rem 0 0;
  color: var(--color-danger);
  font-size: var(--text-body-small);
  font-weight: 500;
}

.email-signup .privacy {
  margin: 1rem 0 0;
  color: var(--color-text-muted);
  font-size: var(--text-body-small);
  line-height: var(--leading-body);
}

.email-signup .privacy a {
  color: var(--color-brand-strong);
  font-weight: 700;
  text-decoration-line: underline;
  text-decoration-color: color-mix(in oklab, var(--color-accent) 70%, transparent);
  transition: text-decoration-color 200ms;
}

.email-signup .privacy a:hover {
  text-decoration-color: var(--color-accent);
}

.email-signup .success {
  color: var(--color-brand-strong);
  font-size: 1rem;
  font-weight: 500;
}

.email-signup .failure {
  margin-top: 0.5rem;
  color: var(--color-danger);
  font-size: var(--text-body-small);
}

.email-signup .failure h2 {
  margin: 0 0 0.5rem;
  color: var(--color-text-strong);
  font-size: 1.25rem;
  font-weight: 500;
}

@keyframes email-signup-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
