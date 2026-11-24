<script setup lang="ts">
import VisitTrailheadList from '@components/VisitTrailheadList.vue';
import VisitTrailMap from '@components/VisitTrailMap.vue';
import { parkHoursVisitLines } from '@/utils/date';
import type { VisitTrailhead } from '@/utils/trailMapModel';
import { computed, shallowRef } from 'vue';

defineProps<{
  trailheads: VisitTrailhead[];
  conditionNote: string;
}>();

const interactionTrailheadId = shallowRef<string>();
const popupTrailheadId = shallowRef<string>();
const activeTrailheadId = computed(() => popupTrailheadId.value ?? interactionTrailheadId.value);
</script>

<template>
  <div class="visit-map editorial-folio">
    <div class="trailheads">
      <div class="folio-rule-header visit-section-heading">
        <h2 class="folio-rule-header__title">Where to park.</h2>
        <p class="folio-rule-header__deck">Select a trailhead for lot details, amenities, and directions.</p>
      </div>

      <VisitTrailheadList :trailheads="trailheads" :active-trailhead-id="activeTrailheadId" @active-change="interactionTrailheadId = $event" />
    </div>

    <div class="map-context">
      <div class="sticky-context">
        <VisitTrailMap
          :trailheads="trailheads"
          :active-trailhead-id="activeTrailheadId"
          :condition-note="conditionNote"
          @active-change="interactionTrailheadId = $event"
          @popup-change="popupTrailheadId = $event" />
        <a class="static-map-link" href="/images/maps/ute-valley-park-map-full.jpg" target="_blank" rel="noopener noreferrer">
          <span>Official park map</span>
          <span>Open full image →</span>
        </a>
        <dl class="visit-fact-grid">
          <div>
            <dt>Park hours</dt>
            <dd v-for="hours in parkHoursVisitLines" :key="hours">{{ hours }}</dd>
          </div>
          <div>
            <dt>Entry fee</dt>
            <dd>Free daily entry</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
.visit-map {
  display: grid;
  font-family: var(--font-body);
  font-variant-numeric: tabular-nums;
}

.trailheads {
  padding: clamp(1.75rem, 4vw, 2.75rem);
}

.visit-section-heading {
  margin-bottom: 1.5rem;
}

.visit-section-heading .folio-rule-header__title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
}

.visit-section-heading .folio-rule-header__deck {
  font-size: 1rem;
}

.map-context {
  border-top: 1px solid var(--color-border-strong);
  background: var(--color-page);
  padding: clamp(1.5rem, 3.5vw, 2.5rem);
}

.sticky-context {
  display: grid;
  gap: 1rem;
}

.static-map-link {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: inherit;
  padding: 0.875rem 1.125rem;
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  text-decoration: none;
  transition:
    border-color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}

.static-map-link:hover {
  border-color: var(--color-brand-strong);
  background: var(--color-surface-muted);
}

.static-map-link span:first-child {
  color: var(--color-text-strong);
  font-weight: 700;
}

.static-map-link span:last-child {
  color: var(--color-brand-strong);
  font-weight: 700;
}

.visit-fact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1px;
  margin: 0;
  border: 1px solid var(--color-border);
  background: var(--color-border);
}

.visit-fact-grid > div {
  background: var(--color-surface);
  padding: 1.125rem 1.25rem;
}

.visit-fact-grid dt {
  margin-bottom: 0.375rem;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  font-weight: 500;
}

.visit-fact-grid dd {
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  font-weight: 700;
  line-height: 1.45;
}

@media (min-width: 64rem) {
  .visit-map {
    grid-template-columns: 5fr 7fr;
  }

  .map-context {
    border-top: 0;
    border-left: 1px solid var(--color-border-strong);
  }

  .sticky-context {
    position: sticky;
    top: 5.5rem;
  }
}
</style>
