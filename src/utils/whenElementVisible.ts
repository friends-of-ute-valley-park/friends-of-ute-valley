type VisibleEntry = Pick<IntersectionObserverEntry, 'isIntersecting'>;
type VisibilityObserver = Pick<IntersectionObserver, 'disconnect' | 'observe'>;
type VisibilityObserverFactory = (callback: (entries: VisibleEntry[]) => void) => VisibilityObserver;

export const whenElementVisible = (element: Element, callback: () => void, createObserver: VisibilityObserverFactory = (onChange) => new IntersectionObserver(onChange)) => {
  let started = false;
  const observer = createObserver((entries) => {
    if (started || !entries.some((entry) => entry.isIntersecting)) return;

    started = true;
    observer.disconnect();
    callback();
  });

  observer.observe(element);
  return () => observer.disconnect();
};
