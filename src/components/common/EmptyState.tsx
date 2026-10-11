import React from 'react';

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-muted)] border border-stone-200/80 flex items-center justify-center text-[var(--color-text-secondary)] mb-3.5 shadow-2xs">
        <Icon className="w-6 h-6 stroke-[1.75]" />
      </div>
      <h3 className="font-serif font-semibold text-[var(--color-text-strong)] text-base mb-1">
        {title}
      </h3>
      <p className="text-metadata text-[var(--color-text-secondary)] text-center leading-relaxed mb-4">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn-primary text-metadata py-2 px-4 shadow-xs"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
