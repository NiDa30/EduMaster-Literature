/** Explicit navigation may scroll smoothly; reduced motion always takes priority. */
export function getNavigationScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 'auto';
  const root = document.documentElement;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    root.dataset.motion === 'off' || root.dataset.motionScroll === 'false'
    ? 'auto' : 'smooth';
}
