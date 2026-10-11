import React, { useEffect, useState } from 'react';
import { getPrefersReducedMotion } from '../../utils/tourUtils';

interface TourOverlayProps {
  targetElement: HTMLElement | null;
  isCenter: boolean;
}

export const TourOverlay: React.FC<TourOverlayProps> = ({ targetElement, isCenter }) => {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [borderRadius, setBorderRadius] = useState<string>('12px');
  const reducedMotion = getPrefersReducedMotion();

  useEffect(() => {
    if (isCenter || !targetElement) {
      setRect(null);
      return;
    }

    const updateRect = () => {
      if (!targetElement.isConnected) {
        setRect(null);
        return;
      }
      const r = targetElement.getBoundingClientRect();
      setRect(r);

      try {
        const computed = window.getComputedStyle(targetElement);
        const radius = computed.borderRadius;
        if (radius && radius !== '0px') {
          setBorderRadius(radius);
        } else {
          setBorderRadius('12px');
        }
      } catch {
        setBorderRadius('12px');
      }
    };

    updateRect();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateRect();
      });
      resizeObserver.observe(targetElement);
    }

    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [targetElement, isCenter]);

  // If centered or no target, render a full dim overlay
  if (isCenter || !rect) {
    return (
      <div 
        className="fixed inset-0 z-[9990] bg-[rgba(20,18,17,0.42)] transition-opacity pointer-events-auto"
        aria-hidden="true"
      />
    );
  }

  const padding = 4;
  const top = Math.max(0, rect.top - padding);
  const left = Math.max(0, rect.left - padding);
  const width = rect.width + padding * 2;
  const height = rect.height + padding * 2;

  return (
    <div 
      className="fixed inset-0 z-[9990] pointer-events-none" 
      aria-hidden="true"
    >
      {/* SVG Mask overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-auto">
        <defs>
          <mask id="tour-spotlight-mask">
            {/* White covers entire viewport */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Black hole cuts out the target */}
            <rect
              x={left}
              y={top}
              width={width}
              height={height}
              rx={parseFloat(borderRadius) || 12}
              ry={parseFloat(borderRadius) || 12}
              fill="black"
              style={{
                transition: reducedMotion ? 'none' : 'x var(--motion-normal, 200ms) var(--ease-smooth, ease), y var(--motion-normal, 200ms) var(--ease-smooth, ease), width var(--motion-normal, 200ms) var(--ease-smooth, ease), height var(--motion-normal, 200ms) var(--ease-smooth, ease)',
              }}
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(20, 18, 17, 0.42)"
          mask="url(#tour-spotlight-mask)"
        />
      </svg>

      {/* Target Spotlight Highlight Ring */}
      <div
        className="absolute pointer-events-none z-[9992]"
        style={{
          top: `${top}px`,
          left: `${left}px`,
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: borderRadius,
          border: '2px solid rgba(122, 41, 56, 0.35)',
          boxShadow: '0 0 0 4px rgba(122, 41, 56, 0.08)',
          transition: reducedMotion ? 'none' : 'top var(--motion-normal, 200ms) var(--ease-smooth, ease), left var(--motion-normal, 200ms) var(--ease-smooth, ease), width var(--motion-normal, 200ms) var(--ease-smooth, ease), height var(--motion-normal, 200ms) var(--ease-smooth, ease)',
        }}
      />
    </div>
  );
};
