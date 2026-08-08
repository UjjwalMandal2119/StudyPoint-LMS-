import React, { useEffect, useState } from 'react';

/**
 * Generic modal form driven by `fields`.
 *  fields: { name, label, type?: 'text'|'number'|'textarea'|'select'|'checkbox'|'date'|'datetime',
 *            required?: bool, options?: [{value,label}]|string[], render?: (row)=>node }[]
 *  initialValues?: object
 *  onSubmit(values) / onClose()
 */
export default function EntityFormModal({ open, title, fields, initialValues = {}, onSubmit, onClose, loading }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm({ ...initialValues });
  }, [initialValues, open]);

  if (!open) return null;

  const handleChange = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const fieldValue = (f) => {
    const v = form[f.name];
    if (f.type === 'checkbox') return v ? 'on' : '';
    if (v === null || v === undefined) return '';
    return String(v);
  };

  const renderField = (f) => {
    const common = {
      id: f.name,
      name: f.name,
      required: f.required,
      className: 'w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400',
    };
    switch (f.type) {
      case 'textarea':
        return (
          <textarea
            {...common}
            rows={3}
            value={fieldValue(f)}
            onChange={(e) => handleChange(f.name, e.target.value)}
          />
        );
      case 'select':
        return (
          <select
            {...common}
            value={fieldValue(f)}
            onChange={(e) => handleChange(f.name, e.target.value)}
          >
            <option value="">— select —</option>
            {(f.options || []).map((o) => {
              const val = typeof o === 'object' ? o.value : o;
              const lbl = typeof o === 'object' ? o.label : o;
              return <option key={val} value={val}>{lbl}</option>;
            })}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={f.name}
            checked={!!form[f.name]}
            onChange={(e) => handleChange(f.name, e.target.checked)}
          />
        );
      case 'number':
        return (
          <input
            {...common}
            type="number"
            value={fieldValue(f)}
            onChange={(e) => handleChange(f.name, e.target.value === '' ? '' : Number(e.target.value))}
          />
        );
      case 'date':
        return (
          <input
            {...common}
            type="date"
            value={fieldValue(f)}
            onChange={(e) => handleChange(f.name, e.target.value)}
          />
        );
      case 'datetime':
        return (
          <input
            {...common}
            type="datetime-local"
            value={fieldValue(f)}
            onChange={(e) => handleChange(f.name, e.target.value)}
          />
        );
      default:
        return (
          <input
            {...common}
            type="text"
            value={fieldValue(f)}
            onChange={(e) => handleChange(f.name, e.target.value)}
          />
        );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
              <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor={f.name}>
                {f.label}{f.required && ' *'}
              </label>
              {renderField(f)}
            </div>
          ))}
          <div className="sm:col-span-2 flex justify-end gap-2 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-1.5 text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
