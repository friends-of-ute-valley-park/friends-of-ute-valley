import { normalizeTrailData, type TrailFeatureCollection, type TrailProperties } from '@/utils/trailData';
import { conditionColor, conditionOpacity, difficultyColor, type TrailMapMode, type VisitTrailhead } from '@/utils/trailMapModel';
import { createTrailheadActivation, dismissPopupOnEscape, dismissPopupWithFocusReturn } from '@/utils/trailheadPopup';
import { waitForMapLoad } from '@/utils/waitForMapLoad';
import { whenElementVisible } from '@/utils/whenElementVisible';
import { onBeforeUnmount, onMounted, readonly, shallowRef, watch, type Ref, type ShallowRef } from 'vue';
import type { Map as MapLibreMap, Popup, StyleSpecification } from 'maplibre-gl';

type MapStatus = 'loading' | 'ready' | 'error';
type MapLibreApi = typeof import('maplibre-gl');

type UseVisitTrailMapOptions = {
  container: Readonly<ShallowRef<HTMLDivElement | null>>;
  trailheads: readonly VisitTrailhead[];
  activeTrailheadId: Readonly<Ref<string | undefined>>;
  mode: Readonly<Ref<TrailMapMode>>;
  onTrailheadActive: (trailheadId?: string) => void;
};

const parkBasemapUrl = '/images/maps/ute-valley-basemap.webp';
const trailDataUrl = '/data/ute-valley-trails.geojson';
const parkBounds = {
  west: -104.8974609375,
  east: -104.8095703125,
  south: 38.89103282648846,
  north: 38.94232097947903,
} as const;
const trailSourceId = 'ute-valley-trails-source';
const trailCasingLayerId = 'ute-valley-trails-casing';
const trailLineLayerId = 'ute-valley-trails';
const trailInteractionLayerId = 'ute-valley-trails-hit-area';
const mobileViewportQuery = '(max-width: 767px)';
const desktopDefaultZoom = 13.6;
const mobileDefaultZoom = 12.7;
const zoomInRange = 1.5;

const parkMapStyle: StyleSpecification = {
  version: 8,
  sources: {
    basemap: {
      type: 'image',
      url: parkBasemapUrl,
      coordinates: [
        [parkBounds.west, parkBounds.north],
        [parkBounds.east, parkBounds.north],
        [parkBounds.east, parkBounds.south],
        [parkBounds.west, parkBounds.south],
      ],
    },
  },
  layers: [
    { id: 'background', type: 'background', paint: { 'background-color': '#f3f1ea' } },
    {
      id: 'basemap',
      type: 'raster',
      source: 'basemap',
      paint: { 'raster-saturation': -0.72, 'raster-contrast': 0.08, 'raster-opacity': 0.78 },
    },
  ],
};

const isAbortError = (error: unknown, signal: AbortSignal) => signal.aborted || (error instanceof DOMException && error.name === 'AbortError');

const loadTrailData = async (signal: AbortSignal): Promise<TrailFeatureCollection> => {
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
      'line-color': difficultyColor,
      'line-opacity': 0.92,
      'line-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        11,
        ['case', ['boolean', ['feature-state', 'hover'], false], 3.4, 1.5],
        14,
        ['case', ['boolean', ['feature-state', 'hover'], false], 6.2, 3],
        17,
        ['case', ['boolean', ['feature-state', 'hover'], false], 9.2, 5.4],
      ],
    },
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
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

const applyMapMode = (mapInstance: MapLibreMap, mode: TrailMapMode) => {
  if (!mapInstance.getLayer(trailLineLayerId)) return;

  const showingConditions = mode === 'conditions';
  mapInstance.setPaintProperty(trailLineLayerId, 'line-color', showingConditions ? conditionColor : difficultyColor);
  mapInstance.setPaintProperty(trailLineLayerId, 'line-opacity', showingConditions ? conditionOpacity : 0.92);
};

const createTrailheadPopupContent = (trailhead: VisitTrailhead) => {
  const wrapper = document.createElement('div');
  const closeButton = document.createElement('button');
  const title = document.createElement('strong');
  const description = document.createElement('span');
  const link = document.createElement('a');

  wrapper.id = `visit-trailhead-popup-${trailhead.id.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  wrapper.role = 'group';
  wrapper.ariaLabel = `${trailhead.name} details`;
  closeButton.type = 'button';
  closeButton.className = 'visit-trail-map-popup-close';
  closeButton.ariaLabel = `Close ${trailhead.name} details`;
  closeButton.textContent = '×';
  title.textContent = trailhead.name;
  description.textContent = trailhead.description;
  link.href = trailhead.url;
  link.textContent = 'Trailhead details';
  wrapper.append(closeButton, title, description, link);

  return { closeButton, element: wrapper };
};

const installTrailInteractions = (mapInstance: MapLibreMap, maplibregl: MapLibreApi) => {
  const trailHoverContent = document.createElement('div');
  const trailHoverPopup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: 'visit-trail-map-hover-popup',
    offset: 12,
  }).setDOMContent(trailHoverContent);

  let hoveredTrailId: string | number | null = null;

  const clearHover = () => {
    if (hoveredTrailId !== null) {
      mapInstance.setFeatureState({ source: trailSourceId, id: hoveredTrailId }, { hover: false });
    }
    hoveredTrailId = null;
  };

  const dismissTrailPopup = () => {
    clearHover();
    trailHoverPopup.remove();
  };

  const showTrailPopup = (event: { features?: Array<{ id?: string | number; properties?: Partial<TrailProperties> }>; lngLat?: maplibregl.LngLatLike }) => {
    const feature = event.features?.[0];
    const name = feature?.properties?.name;

    if (!feature || typeof name !== 'string' || !event.lngLat) {
      dismissTrailPopup();
      return;
    }

    if (feature.id !== hoveredTrailId) {
      clearHover();
      if (feature.id !== undefined) {
        hoveredTrailId = feature.id;
        mapInstance.setFeatureState({ source: trailSourceId, id: feature.id }, { hover: true });
      }

      const conditionSuffix = feature.properties?.conditionAssumed ? ' · assumed' : '';
      const title = document.createElement('strong');
      const difficulty = document.createElement('span');
      const condition = document.createElement('span');
      title.textContent = name;
      difficulty.textContent = `Difficulty: ${feature.properties?.difficultyLabel ?? 'Unknown'}`;
      condition.textContent = `Conditions: ${feature.properties?.conditionLabel ?? 'Unknown'} · ${feature.properties?.reportAgeBucket ?? 'No recent report'}${conditionSuffix}`;
      trailHoverContent.replaceChildren(title, difficulty, condition);
    }

    trailHoverPopup.setLngLat(event.lngLat).addTo(mapInstance);
  };

  mapInstance.on('mouseenter', trailInteractionLayerId, () => {
    mapInstance.getCanvas().style.cursor = 'pointer';
  });
  mapInstance.on('mousemove', trailInteractionLayerId, showTrailPopup);
  mapInstance.on('click', trailInteractionLayerId, showTrailPopup);
  mapInstance.on('click', (event) => {
    const clickedTrail = mapInstance.queryRenderedFeatures(event.point, { layers: [trailInteractionLayerId] }).length > 0;
    if (!clickedTrail) dismissTrailPopup();
  });
  mapInstance.on('mouseleave', trailInteractionLayerId, () => {
    mapInstance.getCanvas().style.cursor = '';
    dismissTrailPopup();
  });
};

export const useVisitTrailMap = (options: UseVisitTrailMapOptions) => {
  const status = shallowRef<MapStatus>('loading');
  const errorMessage = shallowRef<string>();
  const markerElements = new Map<string, HTMLButtonElement>();
  let mapInstance: MapLibreMap | null = null;
  let setupAbortController: AbortController | null = null;
  let stopWaitingForVisibility: (() => void) | null = null;

  const updateActiveMarker = (trailheadId?: string) => {
    markerElements.forEach((marker, id) => {
      marker.classList.toggle('is-list-highlighted', id === trailheadId);
    });
  };

  const disposeMap = () => {
    stopWaitingForVisibility?.();
    stopWaitingForVisibility = null;
    setupAbortController?.abort();
    setupAbortController = null;
    mapInstance?.remove();
    mapInstance = null;
    markerElements.clear();
  };

  const initializeMap = async () => {
    if (!options.container.value) return;

    disposeMap();
    status.value = 'loading';
    errorMessage.value = undefined;
    const controller = new AbortController();
    setupAbortController = controller;

    try {
      const [maplibreModule, trailData] = await Promise.all([import('maplibre-gl'), loadTrailData(controller.signal)]);
      const maplibregl = ((maplibreModule as unknown as { default?: MapLibreApi }).default ?? maplibreModule) as MapLibreApi;

      if (controller.signal.aborted || !options.container.value) return;

      const defaultZoom = window.matchMedia(mobileViewportQuery).matches ? mobileDefaultZoom : desktopDefaultZoom;
      const instance = new maplibregl.Map({
        container: options.container.value,
        center: [-104.844, 38.9144],
        zoom: defaultZoom,
        minZoom: defaultZoom,
        maxZoom: defaultZoom + zoomInRange,
        maxBounds: [
          [parkBounds.west, parkBounds.south],
          [parkBounds.east, parkBounds.north],
        ],
        renderWorldCopies: false,
        dragPan: true,
        dragRotate: false,
        scrollZoom: true,
        boxZoom: false,
        doubleClickZoom: true,
        touchZoomRotate: true,
        keyboard: false,
        attributionControl: false,
        style: parkMapStyle,
      });

      mapInstance = instance;
      instance.touchZoomRotate.disableRotation();

      await waitForMapLoad(instance, controller.signal);
      if (controller.signal.aborted) return;

      installTrailLayers(instance, trailData);
      applyMapMode(instance, options.mode.value);
      installTrailInteractions(instance, maplibregl);

      instance.addControl(
        new maplibregl.AttributionControl({
          compact: true,
          customAttribution:
            '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a> · <a href="https://www.trailforks.com/" target="_blank" rel="noopener noreferrer">Trail data © Trailforks</a>',
        }),
        'bottom-right',
      );
      instance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

      let openMarkerPopup: Popup | null = null;
      options.trailheads.forEach((trailhead) => {
        const marker = document.createElement('button');
        marker.type = 'button';
        marker.className = 'visit-trail-map-marker';
        marker.ariaLabel = `Show details for ${trailhead.name}`;
        marker.ariaExpanded = 'false';
        marker.dataset.trailheadId = trailhead.id;

        const popupContent = createTrailheadPopupContent(trailhead);
        marker.setAttribute('aria-controls', popupContent.element.id);
        const popup = new maplibregl.Popup({ offset: 18, closeButton: false }).setLngLat(trailhead.coordinates).setDOMContent(popupContent.element);
        const activation = createTrailheadActivation({
          trailheadId: trailhead.id,
          setActiveTrailhead: options.onTrailheadActive,
          isPopupOpen: () => popup.isOpen(),
        });

        popup.on('open', () => {
          marker.ariaExpanded = 'true';
          activation.popupOpened();
        });
        popup.on('close', () => {
          marker.ariaExpanded = 'false';
          if (openMarkerPopup === popup) openMarkerPopup = null;
          activation.popupClosed(document.activeElement === marker);
        });

        popupContent.closeButton.addEventListener('click', () => {
          dismissPopupWithFocusReturn(
            () => marker.focus(),
            () => popup.remove(),
          );
        });
        popupContent.element.addEventListener('keydown', (event) => {
          dismissPopupOnEscape(
            event,
            () => marker.focus(),
            () => popup.remove(),
          );
        });

        marker.addEventListener('mouseenter', activation.activate);
        marker.addEventListener('focus', activation.activate);
        marker.addEventListener('mouseleave', activation.deactivate);
        marker.addEventListener('blur', activation.deactivate);
        marker.addEventListener('click', (event) => {
          event.stopPropagation();
          if (popup.isOpen()) {
            popup.remove();
            return;
          }
          openMarkerPopup?.remove();
          openMarkerPopup = popup;
          popup.addTo(instance);
        });
        marker.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') popup.remove();
        });

        markerElements.set(trailhead.id, marker);
        new maplibregl.Marker({ element: marker, anchor: 'bottom' }).setLngLat(trailhead.coordinates).addTo(instance);
      });

      updateActiveMarker(options.activeTrailheadId.value);
      status.value = 'ready';
    } catch (error) {
      if (isAbortError(error, controller.signal)) return;

      console.error(error);
      disposeMap();
      errorMessage.value = 'The interactive map could not be loaded.';
      status.value = 'error';
    }
  };

  watch(options.activeTrailheadId, updateActiveMarker);
  watch(options.mode, (mode) => {
    if (mapInstance) applyMapMode(mapInstance, mode);
  });

  onMounted(() => {
    if (!options.container.value) return;

    stopWaitingForVisibility = whenElementVisible(options.container.value, () => {
      stopWaitingForVisibility = null;
      void initializeMap();
    });
  });
  onBeforeUnmount(disposeMap);

  return {
    status: readonly(status),
    errorMessage: readonly(errorMessage),
    retry: initializeMap,
  };
};
