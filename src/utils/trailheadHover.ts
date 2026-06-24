export type TrailheadMapPoint = {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  url: string;
};

export type TrailheadHoverDetail = {
  trailheadId?: string;
};

export const trailheadHoverEvent = 'visit-trailhead-hover';

export const dispatchTrailheadHover = (trailheadId?: string) => {
  document.dispatchEvent(
    new CustomEvent<TrailheadHoverDetail>(trailheadHoverEvent, {
      detail: { trailheadId },
    }),
  );
};
