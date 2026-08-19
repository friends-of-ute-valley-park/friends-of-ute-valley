export interface TurnstileAPI {
  render(container: HTMLElement | string, options: { sitekey: string; theme?: 'light' | 'dark' | 'auto'; size?: 'normal' | 'compact' | 'flexible' }): string;
  reset(widgetId: string): void;
  remove?(widgetId: string): void;
}

export function resetTurnstileAfterSubmission(turnstile: Pick<TurnstileAPI, 'reset'> | undefined, widgetId: string | null, submitted: boolean): void {
  if (submitted && turnstile && widgetId) {
    turnstile.reset(widgetId);
  }
}
