<script setup lang="ts">
import VisitTrailheadList from '@components/VisitTrailheadList.vue';
import VisitTrailMap from '@components/VisitTrailMap.vue';
import type { VisitTrailhead } from '@/utils/trailMapModel';
import { shallowRef } from 'vue';

defineProps<{
  trailheads: VisitTrailhead[];
  conditionNote: string;
}>();

const activeTrailheadId = shallowRef<string>();
</script>

<template>
  <div class="visit-map">
    <div class="trailheads">
      <div class="visit-section-heading section-heading">
        <h2 class="section-heading__title">Where to <span>Park.</span></h2>
        <p class="section-heading__copy">Find your trailhead and get directions.</p>
      </div>

      <VisitTrailheadList :trailheads="trailheads" :active-trailhead-id="activeTrailheadId" @active-change="activeTrailheadId = $event" />
    </div>

    <div class="map-context">
      <div class="sticky-context">
        <VisitTrailMap :trailheads="trailheads" :active-trailhead-id="activeTrailheadId" :condition-note="conditionNote" @active-change="activeTrailheadId = $event" />
        <a class="static-map-link" href="/images/maps/ute-valley-park-map-full.jpg" target="_blank" rel="noopener noreferrer">
          <span>Official Park Map</span>
          <span>Open Full Size</span>
        </a>
        <div class="visit-fact-grid">
          <div>
            <p>Park Hours</p>
            <p>5:00 AM — 9:00 PM Winter</p>
            <p>5:00 AM — 10:00 PM Summer</p>
          </div>
          <div>
            <p>Entry Fee</p>
            <p>NO CHARGE</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.visit-map {
  display: grid;
}

.trailheads {
  padding: var(--space-section) var(--space-page-x);
}

.visit-section-heading {
  --section-heading-title-size: clamp(1.875rem, 5vw, 3.75rem);
  --section-heading-title-leading: normal;
  --section-heading-copy-size: var(--text-body-small);
  --section-heading-copy-margin: 0;
}

.map-context {
  background: var(--color-page);
  padding: clamp(2rem, 4vw, 3rem);
}

.sticky-context {
  display: grid;
  gap: 1rem;
}

.static-map-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid var(--color-border-muted);
  background: var(--color-surface);
  color: inherit;
  padding: 1rem;
  text-decoration: none;
  transition:
    background-color var(--duration-fast),
    color var(--duration-fast);
}

.static-map-link:hover {
  background: var(--color-surface-muted);
}

.static-map-link span {
  font-family: var(--font-label);
  font-size: var(--text-label);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.static-map-link span:first-child {
  color: var(--color-text-subtle);
}

.static-map-link span:last-child {
  color: var(--color-brand-strong);
}

.visit-fact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.visit-fact-grid > div {
  border: 1px solid var(--color-border-muted);
  background: color-mix(in oklab, var(--color-surface-muted) 50%, transparent);
  padding: 1.5rem;
}

.visit-fact-grid p {
  margin: 0;
  font-family: var(--font-label);
  text-transform: uppercase;
}

.visit-fact-grid p:first-child {
  margin-bottom: 0.5rem;
  color: var(--color-text-subtle);
  font-size: var(--text-label);
  letter-spacing: 0.12em;
}

.visit-fact-grid p:not(:first-child) {
  color: var(--color-text-strong);
  font-size: var(--text-body-small);
  font-weight: 900;
}

@media (min-width: 64rem) {
  .visit-map {
    grid-template-columns: 5fr 7fr;
  }

  .trailheads {
    border-right: 1px solid var(--color-border);
    padding-inline: var(--space-page-x) 3rem;
  }

  .sticky-context {
    position: sticky;
    top: 6rem;
  }
}
</style>
