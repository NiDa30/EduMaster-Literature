import React from 'react';

export type BadgeVariant = 'emerald' | 'amber' | 'rose' | 'blue' | 'purple' | 'stone' | 'burgundy';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  dot?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  emerald: 'badge-soft-emerald',
  amber: 'badge-soft-amber',
  rose: 'badge-soft-rose',
  blue: 'badge-soft-blue',
  purple: 'badge-soft-purple',
  stone: 'badge-soft-stone',
  burgundy: 'badge-soft-burgundy'
};

const dotColors: Record<BadgeVariant, string> = {
  emerald: 'bg-emerald-600',
  amber: 'bg-amber-600',
  rose: 'bg-rose-600',
  blue: 'bg-blue-600',
  purple: 'bg-slate-500',
  stone: 'bg-stone-400',
  burgundy: 'bg-[#7A2938]'
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'stone',
  size = 'sm',
  className = '',
  dot = false,
  icon
}) => {
  const sizeClass = size === 'sm' 
    ? 'text-[11px] px-2 py-0.5 leading-tight' 
    : 'text-[12px] px-2.5 py-1 leading-tight';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full shrink-0 tabular-nums ${variantClasses[variant]} ${sizeClass} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </span>
  );
};
