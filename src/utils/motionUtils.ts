/** Runtime policy shared by CSS settings, navigation and guided tours. */
export function isReducedMotionEnabled(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  return document.documentElement.dataset.respectReducedMotion !== 'false' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
export function getNavigationScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 'auto';
  const root = document.documentElement;
  return isReducedMotionEnabled() ||
    root.dataset.motion === 'off' || root.dataset.motionScroll === 'false'
    ? 'auto' : 'smooth';
}
