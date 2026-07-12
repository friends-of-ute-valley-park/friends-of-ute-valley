type EscapeKeyEvent = Pick<KeyboardEvent, 'key' | 'preventDefault'>;

type TrailheadActivationOptions = {
  trailheadId: string;
  setActiveTrailhead: (trailheadId?: string) => void;
  isPopupOpen: () => boolean;
};

export const dismissPopupWithFocusReturn = (restoreTriggerFocus: () => void, dismissPopup: () => void) => {
  restoreTriggerFocus();
  dismissPopup();
};

export const dismissPopupOnEscape = (event: EscapeKeyEvent, restoreTriggerFocus: () => void, dismissPopup: () => void) => {
  if (event.key !== 'Escape') return false;

  event.preventDefault();
  dismissPopupWithFocusReturn(restoreTriggerFocus, dismissPopup);
  return true;
};

export const createTrailheadActivation = ({ trailheadId, setActiveTrailhead, isPopupOpen }: TrailheadActivationOptions) => ({
  activate: () => setActiveTrailhead(trailheadId),
  deactivate: () => {
    if (!isPopupOpen()) setActiveTrailhead();
  },
  popupOpened: () => setActiveTrailhead(trailheadId),
  popupClosed: (triggerHasFocus: boolean) => setActiveTrailhead(triggerHasFocus ? trailheadId : undefined),
});
