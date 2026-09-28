import React, { useEffect, useId, useRef } from 'react';
import { FORM_SECTIONS, CODE_CHECK } from './courseConfig';

/**
 * Shared create/edit modal driven by FORM_SECTIONS.
 * One component serves both modes, so a field change lands in a single place.
 *
 *  open, mode: 'create' | 'edit', course
 *  values, errors, codeStatus, onChange(name, value), onRegenerateCode
 *  onSubmit, onClose, saving
 */
export default function CourseFormModal({
  open,
  mode = 'create',
  course,
  values,
  errors = {},
  formError = '',
  codeStatus = 'idle',
  onChange,
  onRegenerateCode,
  onSubmit,
  onClose,
  saving = false,
}) {
  const titleId = useId();
  const formId = useId();
  const dialogRef = useRef(null);
  const isEdit = mode === 'edit';
  const check = CODE_CHECK[codeStatus] || CODE_CHECK.idle;
  const codeError = errors.code || (codeStatus === 'taken' ? check.message : '');

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !saving) onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const firstField = dialogRef.current?.querySelector('input, textarea, select');
    firstField?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, saving, onClose]);

  if (!open) return null;

  const handleChange = (field) => (event) => {
    const raw = event.target.value;
    const next = field.type === 'number' ? (raw === '' ? '' : Number(raw)) : raw;
    onChange(field.name, next);
  };

  const renderField = (field) => {
    const isCode = field.name === 'code';
    const fieldError = isCode ? codeError : errors[field.name];
    const errorId = `${field.name}-error`;
    const helpId = `${field.name}-help`;

    const shared = {
      id: field.name,
      name: field.name,
      required: field.required,
      value: values[field.name] ?? '',
      onChange: handleChange(field),
      'aria-invalid': fieldError ? 'true' : undefined,
      'aria-describedby': [field.help ? helpId : null, fieldError ? errorId : null].filter(Boolean).join(' ') || undefined,
    };
    const controlClass = `input ${fieldError ? 'border-red-400' : ''}`;

    const plainControl =
      field.type === 'textarea' ? (
        <textarea {...shared} className={controlClass} rows={field.rows || 3} maxLength={field.maxLength} />
      ) : (
        <input
          {...shared}
          className={controlClass}
          type={field.type === 'number' ? 'number' : 'text'}
          placeholder={field.placeholder}
          min={field.min}
          step={field.step}
          maxLength={field.maxLength}
        />
      );

    return (
      <div key={field.name} className={field.span === 2 ? 'sm:col-span-2' : ''}>
        <label htmlFor={field.name} className="mb-1 block text-sm font-medium text-slate-600">
          {field.label}
          {field.required && <span className="text-red-500"> *</span>}
        </label>

        {isCode ? (
          <div className="flex gap-2">
            <input {...shared} className={controlClass} placeholder={field.placeholder} maxLength={field.maxLength} />
            <button
              type="button"
              className="btn btn-ghost shrink-0"
              onClick={onRegenerateCode}
              disabled={!values.name || saving}
              title="Regenerate the code from the course name"
            >
              Auto
            </button>
          </div>
        ) : (
          plainControl
        )}

        {isCode && check.message && !fieldError && (
          <p
            id={helpId}
            role="status"
            className={`mt-1 text-xs ${
              check.tone === 'success'
                ? 'text-status-easy-text'
                : check.tone === 'danger'
                  ? 'text-red-600'
                  : 'text-slate-500'
            }`}
          >
            {check.message}
          </p>
        )}

        {field.help && !isCode && (
          <p id={helpId} className="mt-1 text-xs text-slate-500">
            {field.help}
          </p>
        )}

        {fieldError && (
          <p id={errorId} role="alert" className="mt-1 text-xs text-red-600">
            {fieldError}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-dark/50 p-4 sm:p-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-3xl rounded-lg bg-lms-card shadow-lift"
      >
        <div className="flex items-start justify-between gap-4 rounded-t-lg border-b border-lms-border bg-lms-bg px-6 py-4">
          <div>
            <h2 id={titleId} className="text-xl font-bold text-navy-dark">
              {isEdit ? `Edit ${course?.name || 'course'}` : 'Create a new course'}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Fields marked with <span className="text-red-500">*</span> are required.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-navy-dark"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form
          id={formId}
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5"
        >
          {formError && (
            <div
              role="alert"
              className="rounded-md border-l-4 border-warn-banner-border bg-warn-banner-bg px-4 py-3 text-sm text-warn-banner-text"
            >
              {formError}
            </div>
          )}

          {FORM_SECTIONS.map((section) => (
            <section key={section.id}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-navy-dark">{section.title}</h3>
              {section.description && <p className="mt-0.5 text-xs text-slate-500">{section.description}</p>}
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">{section.fields.map(renderField)}</div>
            </section>
          ))}
        </form>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-lms-border px-6 py-4">
          <p className="text-xs text-slate-500">
            {isEdit ? 'Changes apply immediately.' : 'The course is created as an unpublished draft.'}
          </p>
          <div className="flex gap-2">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" form={formId} disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Save changes' : 'Create course'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
