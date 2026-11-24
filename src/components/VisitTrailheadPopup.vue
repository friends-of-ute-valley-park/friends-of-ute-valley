<script setup lang="ts">
import type { VisitTrailhead } from '@/utils/trailMapModel';

defineProps<{
  trailhead: VisitTrailhead;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div id="visit-trailhead-popup" class="trailhead-popup" role="group" :aria-label="`${trailhead.name} details`">
    <button type="button" class="trailhead-popup__close" :aria-label="`Close ${trailhead.name} details`" @click="emit('close')">×</button>
    <strong class="trailhead-popup__title">{{ trailhead.name }}</strong>
    <span class="trailhead-popup__description">{{ trailhead.description }}</span>
    <a class="trailhead-popup__link" :href="trailhead.url">Trailhead details →</a>
  </div>
</template>

<style scoped>
.trailhead-popup {
  font-family: var(--font-body);
}

.trailhead-popup__close {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  border: 0;
  padding: 0.25rem 0.5rem;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
}

.trailhead-popup__close:focus-visible {
  outline: 2px solid var(--color-brand-strong);
  outline-offset: 1px;
}

.trailhead-popup__title,
.trailhead-popup__description,
.trailhead-popup__link {
  display: block;
}

.trailhead-popup__title {
  padding-right: 1.5rem;
  margin-bottom: 0.375rem;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.15;
}

.trailhead-popup__description {
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  line-height: 1.45;
}

.trailhead-popup__link {
  margin-top: 0.625rem;
  color: var(--color-brand-strong);
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  font-weight: 700;
  text-decoration-line: underline;
  text-decoration-color: var(--color-accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2rem;
}
</style>
