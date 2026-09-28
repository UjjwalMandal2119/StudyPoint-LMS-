import React, { useEffect, useId } from 'react';
import { VIEW_SECTIONS } from './courseConfig';

/**
 * Read-only course detail panel, driven by VIEW_SECTIONS.
 *  open, course, onClose, onEdit, canManage
 */
export default function CourseViewModal({ open, course, onClose, onEdit, canManage = false }) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open || !course) return null;

  const renderValue = (field) => {
    if (field.render) return field.render(course[field.key], course);
    const raw = course[field.key];
    if (raw === null || raw === undefined || raw === '') return field.empty || '—';
    if (field.mono) return <span className="font-mono text-xs">{raw}</span>;
    return raw;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-dark/50 p-4 sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-3xl rounded-lg bg-lms-card shadow-lift"
      >
        <div className="flex items-start justify-between gap-4 border-b border-lms-border bg-lms-bg px-6 py-4">
          <div className="min-w-0">
            <h2 id={titleId} className="truncate text-xl font-bold text-navy-dark">
              {course.name}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-slate-500">{course.code}</span>
              <span
                className={`badge ${
                  course.active ? 'bg-status-easy-bg text-status-easy-text' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {course.active ? 'Active' : 'Inactive'}
              </span>
              <span
                className={`badge ${
                  course.published ? 'bg-info-banner-bg text-info-banner-text' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {course.published ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-navy-dark"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[65vh] space-y-5 overflow-y-auto px-6 py-5">
          {course.imageUrl && (
            <img
              src={course.imageUrl}
              alt={`${course.name} cover art`}
              className="h-40 w-full rounded-lg border border-lms-border object-cover"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          )}

          {VIEW_SECTIONS.map((section) => (
            <section key={section.id}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-navy-dark">{section.title}</h3>
              <dl className="mt-2 divide-y divide-lms-border rounded-lg border border-lms-border">
                {section.fields.map((field) => (
                  <div
                    key={field.key}
                    className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[12rem_1fr]"
                  >
                    <dt className="text-sm font-medium text-slate-500 sm:pr-4">{field.label}</dt>
                    <dd className="break-words whitespace-pre-wrap text-sm text-slate-800">{renderValue(field)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <div className="flex justify-end gap-2 border-t border-lms-border px-6 py-4">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
          {canManage && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onEdit(course);
              }}
            >
              Edit course
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
