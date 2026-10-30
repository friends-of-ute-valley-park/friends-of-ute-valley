/** [miles from start, elevation in feet] */
export type ElevationSample = readonly number[];

/**
 * Elevation profile inside a `width × height` viewBox from evenly spaced samples.
 * `pts[i]` and `elevations[i]` describe the same point, so the client can interpolate both by index.
 */
export const buildProfile = (samples: ElevationSample[], width: number, height: number) => {
  const elevations = samples.map(([, ft]) => ft);
  const min = Math.min(...elevations);
  const max = Math.max(...elevations);
  // Leave headroom so the dot (10px on a 26px strip) never clips at the strip's edges.
  const pad = height * 0.2;
  const pts = elevations.map((ft, i): [number, number] => [
    Number(((i / (samples.length - 1)) * width).toFixed(1)),
    Number((height - pad - ((ft - min) / (max - min || 1)) * (height - pad * 2)).toFixed(2)),
  ]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;
  return { line, area, pts, elevations, miles: samples.at(-1)![0] };
};
