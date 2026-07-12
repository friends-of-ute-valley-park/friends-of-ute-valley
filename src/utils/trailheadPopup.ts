type TrailheadActivationOptions = {
  trailheadId: string;
  setActiveTrailhead: (trailheadId?: string) => void;
  isPopupOpen: () => boolean;
};

export const createTrailheadActivation = ({ trailheadId, setActiveTrailhead, isPopupOpen }: TrailheadActivationOptions) => ({
  activate: () => setActiveTrailhead(trailheadId),
  deactivate: () => {
    if (!isPopupOpen()) setActiveTrailhead();
  },
  popupOpened: () => setActiveTrailhead(trailheadId),
  popupClosed: (triggerHasFocus: boolean) => setActiveTrailhead(triggerHasFocus ? trailheadId : undefined),
});
