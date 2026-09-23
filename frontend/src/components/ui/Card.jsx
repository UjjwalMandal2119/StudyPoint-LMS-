import React from 'react';

/**
 * LMS Card — white surface on the cool-slate background.
 *  title?: string — optional heading rendered above children
 *  actions?: node — optional right-aligned action row in the header
 *  className?: string — extra classes merged onto the card surface
 */
export default function Card({ title, subtitle, actions, className = '', children }) {
  return (
    <section className={`card ${className}`}>
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-lms-border px-5 py-4">
          <div>
            {title && <h2 className="text-lg font-bold text-navy-dark">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}