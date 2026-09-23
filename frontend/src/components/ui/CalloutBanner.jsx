import React from 'react';

/**
 * Callout banner for informational / warning / tip messages.
 *  variant: 'info' | 'warn' | 'tip'
 *  title?: string — optional bold heading
 *  children — body content
 */
const ICONS = {
  info: 'ℹ️',
  warn: '⚠️',
  tip: '💡',
};

const VARIANTS = {
  info: 'border-info-banner-border bg-info-banner-bg text-info-banner-text',
  warn: 'border-warn-banner-border bg-warn-banner-bg text-warn-banner-text',
  tip: 'border-tip-banner-border bg-tip-banner-bg text-tip-banner-text',
};

export default function CalloutBanner({ variant = 'info', title, children, className = '' }) {
  return (
    <div className={`flex items-start gap-3 rounded-md border-l-4 px-4 py-3 text-sm ${VARIANTS[variant] || VARIANTS.info} ${className}`}>
      <span className="mt-0.5 text-base leading-none" aria-hidden="true">{ICONS[variant] || ICONS.info}</span>
      <div className="min-w-0">
        {title && <p className="mb-0.5 font-bold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}