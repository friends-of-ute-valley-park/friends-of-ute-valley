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
    <a class="trailhead-popup__link" :href="trailhead.url">Trailhead details</a>
  </div>
</template>

<style scoped>
.trailhead-popup__close {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  padding: 0.2rem 0.45rem;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 1.125rem;
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
  margin-bottom: 0.25rem;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: 1rem;
  line-height: 1.1;
  text-transform: uppercase;
}

.trailhead-popup__description {
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  line-height: 1.4;
}

.trailhead-popup__link {
  margin-top: 0.625rem;
  color: var(--color-brand-strong);
  font-family: var(--font-label);
  font-size: 0.75rem;
  font-weight: 900;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
