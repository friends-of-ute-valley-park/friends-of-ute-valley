# Interactive map loading measurements

Measured September 9, 2026 against production builds, preserving the existing uncommitted hover-popup and paint-update improvements in both versions.

## Results

Time from the first map data request until MapLibre's first idle event with rendered trail features:

| Run    |   Before |    After |
| ------ | -------: | -------: |
| 1      | 4,115 ms | 2,356 ms |
| 2      | 4,144 ms | 2,394 ms |
| 3      | 4,159 ms | 2,392 ms |
| Median | 4,144 ms | 2,392 ms |

The median improved by 42%. These are controlled local measurements, not production Core Web Vitals or predictions for every device.

| Resource            |        Before |         After |
| ------------------- | ------------: | ------------: |
| Background image    | 416,992 bytes | 262,418 bytes |
| Trail GeoJSON, gzip |   8,215 bytes |   8,215 bytes |
| Map library, gzip   | 254,603 bytes | 254,603 bytes |
| Map worker, gzip    | 131,932 bytes | 131,932 bytes |

The background is 37% smaller at the same 2048 × 1536 resolution. It is encoded from the retained WebP original using Sharp AVIF quality 45, effort 6. Desktop, zoomed, and mobile rendering were visually checked.

## Changes and data efficiency

Previously, the background request waited roughly 1.5 seconds for the library. The loader now fetches the background, trail data, and library concurrently. A local object URL passes the downloaded image to MapLibre without another network download; disposal revokes it and aborts unfinished fetches.

The existing visible-section hydration remains. There is one small trail-data request, with no browser call to the Trailforks API. Difficulty and conditions reuse that data and change paint properties. Geometry, properties, validation, and the data generation schedule are unchanged. MapLibre and its worker remain the largest JavaScript cost; their existing Vite configuration follows the current upstream installation guidance.

## Method

- Built both versions with `pnpm exec astro build`, using the same existing generated trail data without refreshing the external API.
- Served baseline and optimized builds on separate localhost ports with `Cache-Control: no-store`, gzip for text assets, and a per-response delay of `150 ms + encoded bytes / 200 bytes per ms`.
- This models latency and resource size independently; it does **not** simulate shared connection bandwidth or slow-device CPU throttling.
- Used the desktop in-app browser at 1280 × 720. Measured from GeoJSON request start, excluding visitor scroll delay and island hydration, until an idle map had visible features in the trail layer. The panel's earlier ready state was not used as completion.
- Temporary instrumentation was served identically to both builds and was not added to shipped source. Resource byte counts above exclude instrumentation.
- Successful production build, typecheck, lint, formatting check, and all 39 existing tests. Browser checks covered difficulty/conditions, trailhead popup, zoom, and mobile layout at 390 × 844. A deliberately missing background produced the error state; restoring it and choosing Try Again restored the map and all five markers.

Upstream worker guidance: <https://github.com/maplibre/maplibre-gl-js/blob/main/docs/index.md>.
