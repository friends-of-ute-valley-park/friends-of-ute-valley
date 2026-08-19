import type { ErrorEvent, Map as MapLibreMap } from 'maplibre-gl';

export const waitForMapLoad = (mapInstance: MapLibreMap, signal: AbortSignal) => {
  if (mapInstance.loaded()) return Promise.resolve();
  if (signal.aborted) {
    return Promise.reject(new DOMException('Map setup was aborted', 'AbortError'));
  }

  return new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      mapInstance.off('load', handleLoad);
      mapInstance.off('error', handleError);
      signal.removeEventListener('abort', handleAbort);
    };
    const handleLoad = () => {
      cleanup();
      resolve();
    };
    const handleError = (event: ErrorEvent) => {
      cleanup();
      reject(event.error ?? new Error('The map basemap failed to load'));
    };
    const handleAbort = () => {
      cleanup();
      reject(new DOMException('Map setup was aborted', 'AbortError'));
    };

    void mapInstance.once('load', handleLoad);
    void mapInstance.once('error', handleError);
    signal.addEventListener('abort', handleAbort, { once: true });
  });
};
