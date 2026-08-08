import React from 'react';

/**
 * Read-only detail modal.
 *  fields: { key, label, render?: (value, row) => node }[]
 */
export default function ViewModal({ open, title, record, fields, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <table className="w-full text-sm">
          <tbody>
            {fields.map((f) => (
              <tr key={f.key} className="border-b">
                <th className="w-1/3 py-2 text-left font-medium text-gray-600">{f.label}</th>
                <td className="w-2/3 py-2 text-gray-800">
                  {f.render ? f.render(record?.[f.key], record) : record?.[f.key] ?? '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-1.5 text-sm hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
