<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css';

import VisitTrailheadPopup from '@/components/VisitTrailheadPopup.vue';
import { useVisitTrailMap } from '@/composables/useVisitTrailMap';
import { trailMapModes, type TrailMapMode, type VisitTrailhead } from '@/utils/trailMapModel';
import { onKeyStroke, useFocus } from '@vueuse/core';
import { computed, shallowRef, toRef, useTemplateRef } from 'vue';

const props = defineProps<{
  trailheads: VisitTrailhead[];
  activeTrailheadId?: string;
  conditionNote: string;
}>();

const emit = defineEmits<{
  activeChange: [trailheadId?: string];
  popupChange: [trailheadId?: string];
}>();

const mapCanvas = useTemplateRef<HTMLDivElement>('mapCanvas');
const mapMode = shallowRef<TrailMapMode>('difficulty');
const modeDetails = computed(() => trailMapModes[mapMode.value]);

const { status, errorMessage, retry, popupHost, popupTrailhead, popupTrigger, closePopup } = useVisitTrailMap({
  container: mapCanvas,
  trailheads: props.trailheads,
  activeTrailheadId: toRef(props, 'activeTrailheadId'),
  mode: mapMode,
  onTrailheadActive: (trailheadId) => emit('activeChange', trailheadId),
  onPopupChange: (trailheadId) => emit('popupChange', trailheadId),
});

const { focused: popupTriggerFocused } = useFocus(popupTrigger, { preventScroll: true });

const closeTrailheadPopup = () => {
  popupTriggerFocused.value = true;
  closePopup();
};

onKeyStroke('Escape', (event) => {
  if (!popupTrailhead.value) return;

  event.preventDefault();
  closeTrailheadPopup();
});
</script>

<template>
  <div class="visit-trail-map">
    <div ref="mapCanvas" class="visit-trail-map__canvas" aria-label="Interactive map of Ute Valley Park trails and trailheads"></div>

    <Teleport v-if="popupHost && popupTrailhead" :to="popupHost">
      <VisitTrailheadPopup :trailhead="popupTrailhead" @close="closeTrailheadPopup" />
    </Teleport>

    <div v-if="status !== 'ready'" class="visit-trail-map__status" :role="status === 'error' ? 'alert' : 'status'">
      <p>{{ status === 'error' ? errorMessage : 'Loading interactive trail map…' }}</p>
      <div v-if="status === 'error'" class="visit-trail-map__status-actions">
        <button type="button" @click="retry">Try Again</button>
        <a href="/images/maps/ute-valley-park-map-full.jpg" target="_blank" rel="noopener noreferrer"> Open Official Map </a>
      </div>
    </div>

    <div v-if="status === 'ready'" class="visit-trail-map__panel">
      <div class="visit-trail-map__panel-heading">
        <div>
          <p class="visit-trail-map__kicker">Interactive trail map</p>
          <p class="visit-trail-map__title">{{ modeDetails.label }}</p>
        </div>
        <div class="visit-trail-map__actions">
          <div class="visit-trail-map__toggle" role="group" aria-label="Color trails by">
            <button type="button" :aria-pressed="mapMode === 'difficulty'" @click="mapMode = 'difficulty'">Difficulty</button>
            <button type="button" :aria-pressed="mapMode === 'conditions'" @click="mapMode = 'conditions'">Conditions</button>
          </div>
          <a
            href="https://www.trailforks.com/region/ute-valley-park/?activitytype=6&z=13.9&lat=38.91440&lon=-104.84102&content=trails,labels,region,poi,directory,polygon,waypoint,nst,route_popular,routes_featured"
            target="_blank"
            rel="noopener noreferrer">
            Open Trailforks
          </a>
        </div>
      </div>

      <ul class="visit-trail-map__legend" :aria-label="`${modeDetails.label} legend`">
        <li v-for="item in modeDetails.legend" :key="item.label">
          <span class="visit-trail-map__legend-swatch" :class="{ 'is-faded': item.treatment === 'faded' }" :style="{ backgroundColor: item.color }"></span>
          {{ item.label }}
        </li>
      </ul>
      <p v-if="mapMode === 'conditions'" class="visit-trail-map__condition-note">{{ conditionNote }}</p>
    </div>
  </div>
</template>

<style scoped>
.visit-trail-map {
  position: relative;
  min-height: clamp(28rem, 48vw, 42rem);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface-muted);
}

.visit-trail-map__canvas {
  position: absolute;
  inset: 0;
}

.visit-trail-map__status {
  position: absolute;
  inset: 50% auto auto 50%;
  z-index: 2;
  width: min(24rem, calc(100% - 2rem));
  border: 1px solid var(--color-border);
  background: color-mix(in oklab, var(--color-surface) 94%, transparent);
  padding: 1.5rem;
  text-align: center;
  transform: translate(-50%, -50%);
}

.visit-trail-map__status p {
  margin: 0;
  color: var(--color-text-strong);
  font-weight: 700;
}

.visit-trail-map__status-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.visit-trail-map__status-actions button,
.visit-trail-map__status-actions a {
  border: 0;
  background: none;
  color: var(--color-brand-strong);
  cursor: pointer;
  font-family: var(--font-label);
  font-size: var(--text-label);
  font-weight: 900;
  text-decoration: underline;
  text-transform: uppercase;
}

.visit-trail-map__panel {
  position: absolute;
  right: 1rem;
  bottom: 2.4375rem;
  left: 1rem;
  z-index: 2;
  display: grid;
  gap: 0.75rem;
  border: 1px solid color-mix(in oklab, var(--color-border) 70%, transparent);
  background: color-mix(in oklab, var(--color-surface) 92%, transparent);
  padding: 1rem;
  box-shadow: 0 1rem 3rem color-mix(in oklab, var(--color-text-strong) 12%, transparent);
  pointer-events: none;
}

.visit-trail-map__panel-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.visit-trail-map__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  pointer-events: auto;
}

.visit-trail-map__toggle {
  display: flex;
  border: 1px solid var(--color-border);
  background: var(--color-surface-muted);
  padding: 0.1875rem;
}

.visit-trail-map__toggle button {
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  font-family: var(--font-label);
  font-size: 0.6875rem;
  font-weight: 900;
  padding: 0.5rem 0.625rem;
  text-transform: uppercase;
}

.visit-trail-map__toggle button[aria-pressed='true'] {
  background: var(--color-brand-strong);
  color: var(--color-surface);
}

.visit-trail-map__toggle button:focus-visible {
  outline: 3px solid var(--color-accent-strong);
  outline-offset: 2px;
}

.visit-trail-map__panel p {
  margin: 0;
}

.visit-trail-map__kicker {
  color: var(--color-text-subtle);
  font-family: var(--font-label);
  font-size: var(--text-label);
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.visit-trail-map__title {
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  font-weight: 800;
  line-height: 1.1;
  text-transform: uppercase;
}

.visit-trail-map__panel a {
  color: var(--color-brand-strong);
  font-family: var(--font-label);
  font-size: var(--text-label);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  pointer-events: auto;
}

.visit-trail-map__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;
  pointer-events: auto;
}

.visit-trail-map__legend li {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-text-muted);
  font-family: var(--font-label);
  font-size: 0.625rem;
  font-weight: 800;
  text-transform: uppercase;
}

.visit-trail-map__legend-swatch {
  width: 0.85rem;
  height: 0.28rem;
  border-radius: 999px;
}

.visit-trail-map__legend-swatch.is-faded {
  background: linear-gradient(90deg, #2f7d4a, #23708a, #a34f22) !important;
  opacity: 0.38;
}

.visit-trail-map__condition-note {
  color: var(--color-text-subtle);
  font-size: 0.6875rem;
  line-height: 1.35;
  pointer-events: auto;
}

.visit-trail-map :deep(.maplibregl-ctrl-top-right) {
  top: 1rem;
  right: 1rem;
}

.visit-trail-map :deep(.maplibregl-ctrl-bottom-right) {
  right: 1rem;
  bottom: 0.625rem;
  z-index: 1;
}

.visit-trail-map :deep(.maplibregl-ctrl-group) {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 0;
  background: var(--color-surface);
  box-shadow: none;
}

.visit-trail-map :deep(.maplibregl-ctrl-attrib) {
  max-width: calc(100vw - 4rem);
  overflow: hidden;
  background: color-mix(in oklab, var(--color-surface) 82%, transparent);
  font-family: var(--font-label);
  font-size: 0.625rem;
  opacity: 0.72;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.visit-trail-map :deep(.maplibregl-ctrl-attrib:hover),
.visit-trail-map :deep(.maplibregl-ctrl-attrib:focus-within) {
  opacity: 1;
}

.visit-trail-map :deep(.maplibregl-popup-content) {
  position: relative;
  border: 1px solid var(--color-border);
  border-radius: 0;
  padding: 0.875rem;
  box-shadow: 0 1rem 2rem color-mix(in oklab, var(--color-text-strong) 18%, transparent);
}

.visit-trail-map :deep(.visit-trail-map-hover-popup) {
  pointer-events: none;
}

.visit-trail-map :deep(.visit-trail-map-hover-popup .maplibregl-popup-content) {
  padding: 0.5rem 0.625rem;
}

.visit-trail-map :deep(.visit-trail-map-hover-popup .maplibregl-popup-content strong) {
  display: block;
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-label);
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
}

.visit-trail-map :deep(.visit-trail-map-hover-popup .maplibregl-popup-content span) {
  display: block;
  margin-top: 0.2rem;
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

:global(.visit-trail-map-marker) {
  position: absolute;
  top: 0 !important;
  left: 0 !important;
  display: block;
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0;
}

:global(.visit-trail-map-marker)::before {
  position: absolute;
  bottom: 7px;
  left: 6px;
  width: 14px;
  height: 14px;
  border: 3px solid var(--color-surface);
  border-radius: 999px;
  background: var(--color-brand-strong);
  box-shadow:
    0 0 0 2px color-mix(in oklab, var(--color-brand-strong) 50%, transparent),
    0 0.5rem 1rem color-mix(in oklab, var(--color-text-strong) 22%, transparent);
  content: '';
  transition:
    background-color var(--duration-fast),
    box-shadow var(--duration-fast),
    transform var(--duration-fast);
}

:global(.visit-trail-map-marker)::after {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  border-top: 8px solid var(--color-brand-strong);
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  content: '';
  transform: translateX(-50%);
  transition: border-top-color var(--duration-fast);
}

:global(.visit-trail-map-marker:hover)::before,
:global(.visit-trail-map-marker:focus-visible)::before,
:global(.visit-trail-map-marker.is-list-highlighted)::before {
  background: var(--color-accent-strong);
  box-shadow:
    0 0 0 3px color-mix(in oklab, var(--color-accent-strong) 60%, transparent),
    0 0.75rem 1.5rem color-mix(in oklab, var(--color-text-strong) 28%, transparent);
  transform: translateY(-2px);
}

:global(.visit-trail-map-marker:hover)::after,
:global(.visit-trail-map-marker:focus-visible)::after,
:global(.visit-trail-map-marker.is-list-highlighted)::after {
  border-top-color: var(--color-accent-strong);
}

@media (max-width: 39rem) {
  .visit-trail-map {
    min-height: 34rem;
  }

  .visit-trail-map__panel-heading,
  .visit-trail-map__actions {
    align-items: start;
    flex-direction: column;
  }

  .visit-trail-map__actions {
    width: 100%;
  }

  .visit-trail-map__status-actions {
    align-items: center;
    flex-direction: column;
  }
}
</style>
