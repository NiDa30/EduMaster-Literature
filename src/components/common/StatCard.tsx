import React from 'react';
import { Badge } from './Badge';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  badgeText?: string;
  badgeVariant?: 'emerald' | 'amber' | 'blue' | 'burgundy';
  icon?: React.ReactNode;
  accentBarColor?: string;
  progressPercent?: number;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  badgeText,
  badgeVariant = 'blue',
  icon,
  accentBarColor = '#7A2938',
  progressPercent,
  onClick,
  className = ''
}) => {
  return (
    <div
      onClick={onClick}
      className={`card-interactive p-4 relative overflow-hidden flex flex-col justify-between ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Top row: Label + Badge/Icon */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-metadata font-medium text-stone-500 line-clamp-1">
          {label}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {badgeText && (
            <Badge variant={badgeVariant} size="sm">
              {badgeText}
            </Badge>
          )}
          {icon && <span className="text-stone-400">{icon}</span>}
        </div>
      </div>

      {/* Main value */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold font-serif text-[#211E1C] tracking-tight tabular-nums">
          {value}
        </span>
        {subtitle && (
          <span className="text-metadata text-stone-500 font-normal truncate">
            {subtitle}
          </span>
        )}
      </div>

      {/* Progress or Accent line */}
      {progressPercent !== undefined ? (
        <div className="mt-3 w-full bg-[#F5F3F0] h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%`, backgroundColor: accentBarColor }}
          />
        </div>
      ) : (
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60"
          style={{ backgroundColor: accentBarColor }}
        />
      )}
    </div>
  );
};
