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
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      {(onSearch || error) && (
        <div className="border-b border-gray-200 p-3">
          {onSearch && (
            <input
              type="search"
              placeholder="Search..."
              className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => onSearch(e.target.value)}
            />
          )}
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-2 text-left font-medium text-gray-700 ${col.className || ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="p-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-6 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={row.id ?? i} className="hover:bg-gray-50">
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
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2">
          <div className="text-xs text-gray-600">
            Page {pageNumber + 1} of {totalPages} ({totalElements} records)
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onPageChange && onPageChange(pageNumber - 1)}
              disabled={pageNumber <= 0}
              className="rounded-md border border-gray-300 px-2.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => onPageChange && onPageChange(pageNumber + 1)}
              disabled={pageNumber >= totalPages - 1}
              className="rounded-md border border-gray-300 px-2.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
