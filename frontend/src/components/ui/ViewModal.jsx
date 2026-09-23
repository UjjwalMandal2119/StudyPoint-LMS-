import React from 'react';

/**
 * Read-only detail modal.
 *  fields: { key, label, render?: (value, row) => node }[]
 */
export default function ViewModal({ open, title, record, fields, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-navy-dark/50 p-4">
      <div className="w-full max-w-xl rounded-lg bg-lms-card p-6 shadow-lift">
        <div className="mb-4 flex items-center justify-between border-b border-lms-border pb-3">
          <h2 className="text-xl font-bold text-navy-dark">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-navy-dark"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {fields.map((f) => (
              <tr key={f.key} className="border-b border-lms-border last:border-0">
                <th className="w-1/3 py-2 text-left font-medium text-slate-500">{f.label}</th>
                <td className="w-2/3 py-2 text-slate-800">
                  {f.render ? f.render(record?.[f.key], record) : record?.[f.key] ?? '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="btn btn-ghost">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}