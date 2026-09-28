import React from 'react';

/**
 * Destructive-action confirmation modal.
 *  variant: 'danger' | 'primary'
 *  Busy state disables both actions so a double-click cannot submit twice.
 */
export default function ConfirmDialog({
  open,
  title = 'Please confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
  onConfirm,
  onClose,
}) {
  if (!open) return null;

  const isDanger = variant === 'danger';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/50 p-4">
      <div
        className="w-full max-w-md rounded-lg bg-lms-card p-6 shadow-lift"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <div className="flex items-start gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
              isDanger ? 'bg-status-hard-bg text-status-hard-text' : 'bg-info-banner-bg text-info-banner-text'
            }`}
            aria-hidden="true"
          >
            {isDanger ? '!' : 'i'}
          </span>
          <div className="min-w-0">
            <h2 id="confirm-dialog-title" className="text-lg font-bold text-navy-dark">
              {title}
            </h2>
            {message && <p className="mt-1 text-sm text-slate-600">{message}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Working...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
