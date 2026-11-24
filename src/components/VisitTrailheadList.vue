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
      <div class="trailhead-copy">
        <h3>{{ trailhead.name }}</h3>
        <p>{{ trailhead.description }}</p>
      </div>
      <span class="trailhead-arrow" aria-hidden="true">→</span>
    </a>
  </div>
</template>

<style scoped>
.trailhead-list {
  border-top: 1px solid var(--color-border);
  font-family: var(--font-body);
}

.trailhead-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--color-border-muted);
  color: inherit;
  padding: 1.125rem 0.75rem;
  text-decoration: none;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.trailhead-item:hover,
.trailhead-item.is-map-highlighted {
  background: var(--color-page);
}

.trailhead-item.is-map-highlighted {
  box-shadow: inset 4px 0 0 var(--color-brand-strong);
}

.trailhead-copy {
  display: grid;
  gap: 0.25rem;
}

.trailhead-copy h3 {
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  text-decoration-line: underline;
  text-decoration-color: var(--color-accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 0.22rem;
  transition: color var(--duration-fast) var(--ease-out);
}

.trailhead-item:hover h3,
.trailhead-item.is-map-highlighted h3 {
  color: var(--color-brand-strong);
}

.trailhead-copy p {
  max-width: 34ch;
  margin: 0;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  font-weight: 400;
  line-height: 1.45;
}

.trailhead-arrow {
  flex-shrink: 0;
  color: var(--color-text-subtle);
  font-size: 1.125rem;
  transition:
    color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.trailhead-item:hover .trailhead-arrow,
.trailhead-item.is-map-highlighted .trailhead-arrow {
  color: var(--color-brand-strong);
  transform: translateX(0.2rem);
}
</style>
