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
  // The rider (about 13px tall on a 26px strip) sits on the line, so keep the top half of the strip clear for it.
  const top = height * 0.5;
  const bottom = height * 0.12;
  const pts = elevations.map((ft, i): [number, number] => [
    Number(((i / (samples.length - 1)) * width).toFixed(1)),
    Number((height - bottom - ((ft - min) / (max - min || 1)) * (height - top - bottom)).toFixed(2)),
  ]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;
  return { line, area, pts, elevations, miles: samples.at(-1)![0] };
};
