import React from 'react';
import { STATUS_FILTERS, PUBLISHED_FILTERS } from './courseUtils';

/**
 * Course toolbar: debounced search, page filters and the create action.
 *  searchTerm, onSearchChange, status, onStatusChange, published, onPublishedChange
 *  onCreate, canManage, canSearch
 */
export default function CourseFilters({
  searchTerm,
  onSearchChange,
  status,
  onStatusChange,
  published,
  onPublishedChange,
  onCreate,
  canManage,
  canSearch = true,
}) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      {canSearch && (
        <div className="min-w-[16rem] flex-1">
          <label htmlFor="course-search" className="mb-1 block text-xs font-medium text-slate-500">
            Search
          </label>
          <input
            id="course-search"
            type="search"
            className="input"
            placeholder="Search by name or code..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      )}

      <div className="w-40">
        <label htmlFor="course-status" className="mb-1 block text-xs font-medium text-slate-500">
          Status
        </label>
        <select
          id="course-status"
          className="input"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          {STATUS_FILTERS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-44">
        <label htmlFor="course-published" className="mb-1 block text-xs font-medium text-slate-500">
          Visibility
        </label>
        <select
          id="course-published"
          className="input"
          value={published}
          onChange={(event) => onPublishedChange(event.target.value)}
        >
          {PUBLISHED_FILTERS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {canManage && (
        <button type="button" className="btn btn-primary" onClick={onCreate}>
          <span aria-hidden="true">+</span>
          New course
        </button>
      )}
    </div>
  );
}
