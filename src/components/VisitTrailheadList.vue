<script setup lang="ts">
import type { VisitTrailhead } from '@/utils/trailMapModel';

defineProps<{
  trailheads: VisitTrailhead[];
  activeTrailheadId?: string;
}>();

const emit = defineEmits<{
  activeChange: [trailheadId?: string];
}>();
</script>

<template>
  <div class="trailhead-list">
    <a
      v-for="trailhead in trailheads"
      :key="trailhead.id"
      :href="trailhead.url"
      class="trailhead-item"
      :class="{ 'is-map-highlighted': trailhead.id === activeTrailheadId }"
      @mouseenter="emit('activeChange', trailhead.id)"
      @focus="emit('activeChange', trailhead.id)"
      @mouseleave="emit('activeChange')"
      @blur="emit('activeChange')">
      <div>
        <div class="trailhead-title">
          <span>[{{ trailhead.displayId }}]</span>
          <h3>{{ trailhead.name }}</h3>
        </div>
        <p>{{ trailhead.description }}</p>
      </div>
      <span aria-hidden="true">→</span>
    </a>
  </div>
</template>

<style scoped>
.trailhead-list {
  border-top: 1px solid var(--color-border-muted);
}

.trailhead-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border-muted);
  color: inherit;
  padding: 1.5rem 0.5rem;
  text-decoration: none;
  transition: background-color var(--duration-fast);
}

.trailhead-item:hover,
.trailhead-item.is-map-highlighted {
  background: var(--color-surface-muted);
}

.trailhead-item.is-map-highlighted {
  box-shadow: inset 0.25rem 0 0 var(--color-brand-strong);
}

.trailhead-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.trailhead-title span {
  color: var(--color-accent-strong);
  font-family: var(--font-label);
  font-size: 0.75rem;
  font-weight: 900;
}

.trailhead-title h3 {
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: var(--text-body-large);
  font-weight: 700;
  letter-spacing: 0;
  text-decoration: underline;
  text-decoration-color: var(--color-brand-strong);
  text-decoration-thickness: 4px;
  text-underline-offset: 0.125rem;
  text-transform: uppercase;
  transition: color var(--duration-fast);
}

.trailhead-item:hover h3,
.trailhead-item:hover > span,
.trailhead-item.is-map-highlighted h3,
.trailhead-item.is-map-highlighted > span {
  color: var(--color-brand-strong);
}

.trailhead-item p {
  max-width: 24rem;
  margin: 0.25rem 0 0 2rem;
  color: var(--color-text-subtle);
  font-size: 0.75rem;
  font-weight: 500;
}

.trailhead-item > span {
  color: var(--color-accent-strong);
  transition: color var(--duration-fast);
}
</style>
