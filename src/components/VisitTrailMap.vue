<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css';

import { dispatchTrailheadHover, trailheadHoverEvent, type TrailheadHoverDetail, type TrailheadMapPoint } from '@/utils/trailheadHover';
import { onBeforeUnmount, onMounted, shallowRef, useTemplateRef } from 'vue';
import type { Map as MapLibreMap } from 'maplibre-gl';

type TrailProperties = {
  id: string | number;
  name: string;
  color?: string;
  opacity?: number;
};

type TrailFeatureCollection = GeoJSON.FeatureCollection<GeoJSON.LineString, TrailProperties>;

const trailforksMapUrl =
  'https://www.trailforks.com/region/ute-valley-park/?activitytype=6&z=13.9&lat=38.91440&lon=-104.84102&content=trails,labels,region,poi,directory,polygon,waypoint,nst,route_popular,routes_featured';
const openFreeMapStyleUrl = 'https://tiles.openfreemap.org/styles/positron';
const trailDataUrl = '/data/ute-valley-trails.geojson';
const trailSourceId = 'ute-valley-trails-source';
const trailCasingLayerId = 'ute-valley-trails-casing';
const trailLineLayerId = 'ute-valley-trails';
const trailLabelLayerId = 'ute-valley-trail-labels';
const trailInteractionLayerId = 'ute-valley-trails-hit-area';
const mobileViewportQuery = '(max-width: 767px)';
const desktopDefaultZoom = 13.6;
const mobileDefaultZoom = 12.7;
const minZoom = 12.3;

const props = defineProps<{
  trailheads: TrailheadMapPoint[];
}>();

const mapCanvas = useTemplateRef<HTMLElement>('mapCanvas');
const map = shallowRef<MapLibreMap | null>(null);
const markerElements: HTMLElement[] = [];
const setupAbortController = new AbortController();

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const isAbortError = (error: unknown) => setupAbortController.signal.aborted || (error instanceof DOMException && error.name === 'AbortError');

const createTrailheadPopupContent = (trailhead: TrailheadMapPoint) => {
  const wrapper = document.createElement('div');
  const title = document.createElement('strong');
  const description = document.createElement('span');
  const link = document.createElement('a');

  title.textContent = trailhead.name;
  description.textContent = trailhead.description;
  link.href = trailhead.url;
  link.textContent = 'Trailhead details';

  wrapper.append(title, description, link);

  return wrapper;
};

const createParkMapStyle = async (signal: AbortSignal) => {
  const hillshadeSource = {
    type: 'raster',
    tiles: ['https://services.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}'],
    tileSize: 256,
    attribution: 'Esri World Hillshade',
  };

  const hillshadeLayer = {
    id: 'hillshade-relief',
    type: 'raster',
    source: 'hillshade',
    paint: {
      'raster-opacity': 0.26,
      'raster-saturation': -1,
      'raster-contrast': 0.12,
    },
  };

  try {
    const response = await fetch(openFreeMapStyleUrl, { signal });

    if (!response.ok) {
      throw new Error(`Map style failed to load: ${response.status}`);
    }

    const style = await response.json();
    const layers = Array.isArray(style.layers) ? style.layers : [];

    return {
      ...style,
      sources: {
        ...style.sources,
        hillshade: hillshadeSource,
      },
      layers: [...layers.filter((layer: { type?: string }) => layer.type !== 'symbol'), hillshadeLayer],
    };
  } catch (error) {
    if (signal.aborted) {
      throw error;
    }

    return {
      version: 8,
      sources: {
        hillshade: hillshadeSource,
      },
      layers: [
        {
          id: 'background',
          type: 'background',
          paint: {
            'background-color': '#f3f1ea',
          },
        },
        {
          ...hillshadeLayer,
          paint: {
            ...hillshadeLayer.paint,
            'raster-opacity': 0.32,
          },
        },
      ],
    };
  }
};

const normalizeTrailData = (data: unknown): TrailFeatureCollection => {
  if (!isRecord(data) || data.type !== 'FeatureCollection' || !Array.isArray(data.features)) {
    throw new Error('Trail data is not a GeoJSON FeatureCollection');
  }

  const trailIds = new Set<string>();
  const features = data.features.map((feature, index) => {
    if (!isRecord(feature) || feature.type !== 'Feature' || !isRecord(feature.properties) || !isRecord(feature.geometry)) {
      throw new Error(`Trail feature ${index} is invalid`);
    }

    const propertyTrailId = feature.properties.id;

    if (feature.id !== undefined && propertyTrailId !== undefined && String(feature.id) !== String(propertyTrailId)) {
      throw new Error(`Trail feature ${index} has conflicting IDs`);
    }

    const trailId = feature.id ?? propertyTrailId;

    if ((typeof trailId !== 'string' && typeof trailId !== 'number') || feature.geometry.type !== 'LineString') {
      throw new Error(`Trail feature ${index} needs a stable ID and LineString geometry`);
    }

    if (typeof feature.properties.name !== 'string') {
      throw new Error(`Trail feature ${trailId} needs a name`);
    }

    const trailIdKey = String(trailId);

    if (trailIds.has(trailIdKey)) {
      throw new Error(`Duplicate trail feature ID: ${trailId}`);
    }

    trailIds.add(trailIdKey);

    return {
      ...feature,
      id: trailId,
      properties: {
        ...feature.properties,
        id: trailId,
        name: feature.properties.name,
      },
    } as GeoJSON.Feature<GeoJSON.LineString, TrailProperties>;
  });

  return { ...data, features } as TrailFeatureCollection;
};

const loadTrailData = async (signal: AbortSignal) => {
  const response = await fetch(trailDataUrl, { signal });

  if (!response.ok) {
    throw new Error(`Trail data failed to load: ${response.status}`);
  }

  return normalizeTrailData(await response.json());
};

const installTrailLayers = (mapInstance: MapLibreMap, trailData: TrailFeatureCollection) => {
  mapInstance.addSource(trailSourceId, {
    type: 'geojson',
    data: trailData,
  });

  mapInstance.addLayer({
    id: trailCasingLayerId,
    type: 'line',
    source: trailSourceId,
    paint: {
      'line-color': '#ffffff',
      'line-opacity': 0.94,
      'line-width': ['interpolate', ['linear'], ['zoom'], 11, 3, 14, 5.4, 17, 9],
    },
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
  });

  mapInstance.addLayer({
    id: trailLineLayerId,
    type: 'line',
    source: trailSourceId,
    paint: {
      'line-color': ['coalesce', ['get', 'color'], '#2f6f48'],
      'line-opacity': ['*', 0.9, ['coalesce', ['to-number', ['get', 'opacity']], 1]],
      'line-width': ['interpolate', ['linear'], ['zoom'], 11, 1.3, 14, 2.7, 17, 5.2],
    },
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
  });

  mapInstance.addLayer({
    id: trailLabelLayerId,
    type: 'symbol',
    source: trailSourceId,
    minzoom: 11,
    layout: {
      'symbol-placement': 'line-center',
      'text-field': ['get', 'name'],
      'text-font': ['Noto Sans Regular'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 11, 7.5, 13, 9, 15, 10.5],
      'text-allow-overlap': false,
      'text-ignore-placement': false,
      'text-keep-upright': true,
      'text-letter-spacing': 0.02,
      'text-max-angle': 35,
      'text-padding': 3,
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'map',
    },
    paint: {
      'text-color': ['coalesce', ['get', 'color'], '#2f6f48'],
      'text-halo-color': 'rgba(255, 255, 255, 0.9)',
      'text-halo-width': 1.4,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 11, 0.72, 12, 0.95],
    },
  });

  mapInstance.addLayer({
    id: trailInteractionLayerId,
    type: 'line',
    source: trailSourceId,
    paint: {
      'line-color': 'rgba(0, 0, 0, 0.01)',
      'line-opacity': 0.01,
      'line-width': ['interpolate', ['linear'], ['zoom'], 11, 18, 14, 24, 17, 32],
    },
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
  });
};

const installTrailInteractions = (mapInstance: MapLibreMap, maplibregl: typeof import('maplibre-gl').default) => {
  const trailHoverContent = document.createElement('strong');
  const trailHoverPopup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: 'visit-trail-map-hover-popup',
    offset: 12,
  }).setDOMContent(trailHoverContent);

  const showTrailPopup = (event: { features?: Array<{ properties?: { name?: unknown } }>; lngLat?: maplibregl.LngLatLike }) => {
    const feature = event.features?.[0];
    const name = feature?.properties?.name;

    if (typeof name !== 'string' || !event.lngLat) {
      trailHoverPopup.remove();
      return;
    }

    trailHoverContent.textContent = name;
    trailHoverPopup.setLngLat(event.lngLat).addTo(mapInstance);
  };

  mapInstance.on('mouseenter', trailInteractionLayerId, () => {
    mapInstance.getCanvas().style.cursor = 'pointer';
  });

  mapInstance.on('mousemove', trailInteractionLayerId, showTrailPopup);
  mapInstance.on('click', trailInteractionLayerId, showTrailPopup);
  mapInstance.on('touchstart', trailInteractionLayerId, showTrailPopup);

  mapInstance.on('mouseleave', trailInteractionLayerId, () => {
    mapInstance.getCanvas().style.cursor = '';
    trailHoverPopup.remove();
  });
};

const handleTrailheadHover = (event: Event) => {
  if (!(event instanceof CustomEvent)) {
    return;
  }

  const activeTrailheadId = (event as CustomEvent<TrailheadHoverDetail>).detail?.trailheadId;

  markerElements.forEach((marker) => {
    marker.classList.toggle('is-list-highlighted', marker.dataset.trailheadId === activeTrailheadId);
  });
};

onMounted(async () => {
  if (!mapCanvas.value) {
    return;
  }

  try {
    const [{ default: maplibregl }, style] = await Promise.all([import('maplibre-gl'), createParkMapStyle(setupAbortController.signal)]);

    if (setupAbortController.signal.aborted || !mapCanvas.value) {
      return;
    }

    const defaultZoom = window.matchMedia(mobileViewportQuery).matches ? mobileDefaultZoom : desktopDefaultZoom;

    const mapInstance = new maplibregl.Map({
      container: mapCanvas.value,
      center: [-104.844, 38.9144],
      zoom: defaultZoom,
      maxZoom: 14.4,
      minZoom,
      attributionControl: false,
      style,
    });

    map.value = mapInstance;

    mapInstance.on('load', async () => {
      try {
        const trailData = await loadTrailData(setupAbortController.signal);

        if (setupAbortController.signal.aborted) {
          return;
        }

        installTrailLayers(mapInstance, trailData);
        installTrailInteractions(mapInstance, maplibregl);
      } catch (error) {
        if (!isAbortError(error)) {
          console.error(error);
        }
      }
    });

    mapInstance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    mapInstance.addControl(
      new maplibregl.AttributionControl({
        compact: true,
        customAttribution: '<a href="https://www.trailforks.com/" target="_blank" rel="noopener noreferrer">Trail data © Trailforks</a>',
      }),
      'bottom-right',
    );

    const trailheadBounds = new maplibregl.LngLatBounds();

    props.trailheads.forEach((trailhead) => {
      const coordinates = trailhead.coordinates;
      const marker = document.createElement('a');
      marker.className = 'visit-trail-map-marker';
      marker.href = trailhead.url;
      marker.ariaLabel = trailhead.name;
      marker.dataset.trailheadId = trailhead.id;

      const activateTrailhead = () => {
        dispatchTrailheadHover(trailhead.id);
      };

      const clearTrailhead = () => {
        dispatchTrailheadHover();
      };

      marker.addEventListener('mouseenter', activateTrailhead);
      marker.addEventListener('focus', activateTrailhead);
      marker.addEventListener('mouseleave', clearTrailhead);
      marker.addEventListener('blur', clearTrailhead);

      markerElements.push(marker);
      trailheadBounds.extend(coordinates);

      new maplibregl.Marker({ element: marker, anchor: 'bottom' })
        .setLngLat(coordinates)
        .setPopup(new maplibregl.Popup({ offset: 18 }).setDOMContent(createTrailheadPopupContent(trailhead)))
        .addTo(mapInstance);
    });

    if (!trailheadBounds.isEmpty()) {
      mapInstance.fitBounds(trailheadBounds, {
        duration: 0,
        maxZoom: defaultZoom,
        padding: {
          top: 72,
          right: 72,
          bottom: 160,
          left: 72,
        },
      });
    }

    document.addEventListener(trailheadHoverEvent, handleTrailheadHover);
  } catch (error) {
    if (!isAbortError(error)) {
      console.error(error);
    }
  }
});

onBeforeUnmount(() => {
  setupAbortController.abort();
  document.removeEventListener(trailheadHoverEvent, handleTrailheadHover);
  map.value?.remove();
  map.value = null;
  markerElements.length = 0;
});
</script>

<template>
  <div class="visit-trail-map">
    <div ref="mapCanvas" class="visit-trail-map__canvas"></div>
    <div class="visit-trail-map__panel">
      <div>
        <p class="visit-trail-map__kicker">Interactive Trail Map</p>
        <p class="visit-trail-map__title">Ute Valley Park</p>
      </div>
      <a :href="trailforksMapUrl" target="_blank" rel="noopener noreferrer"> Open Trailforks </a>
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

.visit-trail-map__panel {
  position: absolute;
  right: 1rem;
  bottom: 2.4375rem;
  left: 1rem;
  z-index: 2;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid color-mix(in oklab, var(--color-border) 70%, transparent);
  background: color-mix(in oklab, var(--color-surface) 92%, transparent);
  padding: 1rem;
  box-shadow: 0 1rem 3rem color-mix(in oklab, var(--color-text-strong) 12%, transparent);
  pointer-events: none;
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
  border: 1px solid var(--color-border);
  border-radius: 0;
  padding: 0.875rem;
  box-shadow: 0 1rem 2rem color-mix(in oklab, var(--color-text-strong) 18%, transparent);
}

.visit-trail-map :deep(.maplibregl-popup-content strong),
.visit-trail-map :deep(.maplibregl-popup-content span),
.visit-trail-map :deep(.maplibregl-popup-content a) {
  display: block;
}

.visit-trail-map :deep(.maplibregl-popup-content strong) {
  margin-bottom: 0.25rem;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: 1rem;
  line-height: 1.1;
  text-transform: uppercase;
}

.visit-trail-map :deep(.maplibregl-popup-content span) {
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  line-height: 1.4;
}

.visit-trail-map :deep(.maplibregl-popup-content a) {
  margin-top: 0.625rem;
  color: var(--color-brand-strong);
  font-family: var(--font-label);
  font-size: 0.75rem;
  font-weight: 900;
  text-decoration: none;
  text-transform: uppercase;
}

.visit-trail-map :deep(.visit-trail-map-hover-popup) {
  pointer-events: none;
}

.visit-trail-map :deep(.visit-trail-map-hover-popup .maplibregl-popup-content) {
  padding: 0.5rem 0.625rem;
}

.visit-trail-map :deep(.visit-trail-map-hover-popup .maplibregl-popup-content strong) {
  margin: 0;
  font-family: var(--font-label);
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
}

:global(.visit-trail-map-marker) {
  position: absolute;
  top: 0 !important;
  left: 0 !important;
  display: block;
  width: 1.25rem;
  height: 1.58rem;
}

:global(.visit-trail-map-marker)::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 1.25rem;
  height: 1.25rem;
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
  top: 1.08rem;
  left: 50%;
  width: 0;
  height: 0;
  border-top: 0.5rem solid var(--color-brand-strong);
  border-right: 0.32rem solid transparent;
  border-left: 0.32rem solid transparent;
  content: '';
  transform: translateX(-50%);
  transition: border-top-color var(--duration-fast);
}

:global(.visit-trail-map-marker:hover)::before,
:global(.visit-trail-map-marker.is-list-highlighted)::before {
  background: var(--color-accent-strong);
  box-shadow:
    0 0 0 3px color-mix(in oklab, var(--color-accent-strong) 60%, transparent),
    0 0.75rem 1.5rem color-mix(in oklab, var(--color-text-strong) 28%, transparent);
  transform: translateY(-0.125rem);
}

:global(.visit-trail-map-marker:hover)::after,
:global(.visit-trail-map-marker.is-list-highlighted)::after {
  border-top-color: var(--color-accent-strong);
}

@media (max-width: 39rem) {
  .visit-trail-map {
    min-height: 31rem;
  }

  .visit-trail-map__panel {
    align-items: start;
    flex-direction: column;
  }
}
</style>
