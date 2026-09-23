import React from 'react';

/**
 * Server-side table.
 *  columns: { key, label, className?, render?: (row) => node }[]
 *  onPageChange: (pageNumber) => void
 *  onSearch: (term) => void   (debounced by caller)
 */
export default function DataTable({
  columns,
  data = [],
  loading,
  error,
  totalElements = 0,
  totalPages = 0,
  pageNumber = 0,
  pageSize = 10,
  onPageChange,
  onSearch,
}) {
  return (
    <div className="card overflow-hidden">
      {(onSearch || error) && (
        <div className="border-b border-lms-border p-3">
          {onSearch && (
            <input
              type="search"
              placeholder="Search..."
              className="input max-w-sm"
              onChange={(e) => onSearch(e.target.value)}
            />
          )}
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-lms-border text-sm">
          <thead className="bg-lms-bg">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-2 text-left font-semibold text-navy-dark ${col.className || ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-lms-border bg-lms-card">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="p-6 text-center text-slate-500">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-6 text-center text-slate-500">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={row.id ?? i} className="transition hover:bg-lms-bg">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-2 align-top ${col.className || ''}`}>
                      {col.render ? col.render(row) : row[col.key] ?? '-'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-lms-border px-4 py-2">
          <div className="text-xs text-slate-600">
            Page {pageNumber + 1} of {totalPages} ({totalElements} records)
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onPageChange && onPageChange(pageNumber - 1)}
              disabled={pageNumber <= 0}
              className="rounded-md border border-lms-border px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => onPageChange && onPageChange(pageNumber + 1)}
              disabled={pageNumber >= totalPages - 1}
              className="rounded-md border border-lms-border px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}