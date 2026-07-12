import type { Map as MapLibreMap } from 'maplibre-gl';

export const waitForMapLoad = (mapInstance: MapLibreMap, signal: AbortSignal) => {
  if (mapInstance.loaded()) return Promise.resolve();

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
    const handleError = (event: { error?: Error }) => {
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
