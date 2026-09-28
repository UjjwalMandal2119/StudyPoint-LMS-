import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import DataTable from '../common/DataTable';
import CalloutBanner from '../ui/CalloutBanner';
import ConfirmDialog from '../ui/ConfirmDialog';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import * as courseService from '../../services/course.service';
import { MANAGE_ROLES, buildTableColumns } from './courseConfig';
import {
  EMPTY_FORM,
  applyRowFilters,
  buildCoursePayload,
  generateCode,
  toFormValues,
  validateForm,
} from './courseUtils';
import CourseFilters from './CourseFilters';
import CourseFormModal from './CourseFormModal';
import CourseViewModal from './CourseViewModal';

const PAGE_SIZE = 10;
const EMPTY_PAGE = { items: [], totalElements: 0, totalPages: 0, number: 0, size: PAGE_SIZE };

/**
 * Course administration surface.
 *
 * Owns all data access, form state and permission checks; the presentational
 * children receive plain data and callbacks. Read-only roles get the view
 * modal only, which matches the @PreAuthorize rules on CourseController.
 */
export default function CourseManagement() {
  const role = useSelector((state) => state.auth?.role);
  const canManage = MANAGE_ROLES.includes(role);

  const [page, setPage] = useState(EMPTY_PAGE);
  const [loading, setLoading] = useState(false);
  const [rowError, setRowError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  const [published, setPublished] = useState('all');

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [editing, setEditing] = useState(null);
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [codeStatus, setCodeStatus] = useState('idle');
  const [codeTouched, setCodeTouched] = useState(false);

  const [viewing, setViewing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const debouncedSearch = useDebouncedValue(searchTerm, 400);
  const debouncedCode = useDebouncedValue(values.code, 500);

  const fetchPage = useCallback(async (targetPage = 0, term = '') => {
    setLoading(true);
    setRowError('');
    try {
      const query = `?page=${targetPage}&size=${PAGE_SIZE}`;
      const response = term.trim()
        ? await courseService.search(term.trim(), targetPage, PAGE_SIZE)
        : await courseService.list({ page: targetPage, size: PAGE_SIZE });
      const body = response.data || {};
      setPage({
        items: body.content || [],
        totalElements: body.totalElements || 0,
        totalPages: body.totalPages || 0,
        number: body.number ?? targetPage,
        size: body.size || PAGE_SIZE,
      });
    } catch (error) {
      setPage(EMPTY_PAGE);
      setRowError(error.message || 'Could not load courses.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(0, debouncedSearch);
  }, [fetchPage, debouncedSearch]);

  const visibleRows = useMemo(
    () => applyRowFilters(page.items, { status, published }),
    [page.items, status, published],
  );

  const isFiltered = status !== 'all' || published !== 'all';

  const closeForm = useCallback(() => {
    if (saving) return;
    setFormOpen(false);
    setEditing(null);
    setValues(EMPTY_FORM);
    setErrors({});
    setFormError('');
    setCodeStatus('idle');
    setCodeTouched(false);
  }, [saving]);

  const openCreate = useCallback(() => {
    setFormMode('create');
    setEditing(null);
    setValues({ ...EMPTY_FORM });
    setErrors({});
    setFormError('');
    setCodeStatus('idle');
    setCodeTouched(false);
    setFormOpen(true);
  }, []);

  const loadForEdit = useCallback(async (row) => {
    setRowError('');
    try {
      const response = row.description === undefined ? await courseService.get(row.id) : row;
      setFormMode('edit');
      setEditing(response.data || row);
      setValues(toFormValues(response.data || row));
      setErrors({});
      setFormError('');
      setCodeStatus('idle');
      setCodeTouched(true);
      setFormOpen(true);
    } catch (error) {
      setRowError(error.message || 'Could not load the course.');
    }
  }, []);

  const handleChange = useCallback((name, value) => {
    setValues((current) => {
      const next = { ...current, [name]: value };
      if (name === 'name' && !codeTouched) {
        next.code = generateCode(value);
      }
      return next;
    });
    if (name === 'name' && !codeTouched) {
      setCodeStatus('idle');
    }
    if (name === 'code') {
      setCodeTouched(true);
      setCodeStatus('idle');
    }
    setFormError('');
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  }, [codeTouched]);

  const handleRegenerateCode = useCallback(() => {
    setValues((current) => ({ ...current, code: generateCode(current.name) }));
    setCodeTouched(false);
    setCodeStatus('idle');
  }, []);

  useEffect(() => {
    if (!formOpen) return;
    const code = (debouncedCode || '').trim();
    if (!code || code.length < 2) {
      setCodeStatus('idle');
      return;
    }

    let cancelled = false;
    setCodeStatus('checking');
    courseService
      .getByCode(code)
      .then((response) => {
        if (cancelled) return;
        const found = response?.data;
        setCodeStatus(found && String(found.id) !== String(editing?.id) ? 'taken' : 'available');
      })
      .catch(() => {
        if (!cancelled) setCodeStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedCode, formOpen, editing?.id]);

  const handleSubmit = useCallback(async () => {
    const payload = buildCoursePayload(values);
    const validation = validateForm({ ...values, code: payload.code });
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSaving(true);
    setErrors({});
    setFormError('');
    try {
      if (formMode === 'edit' && editing) {
        await courseService.update(editing.id, payload);
      } else {
        await courseService.create(payload);
      }
      setFormOpen(false);
      setEditing(null);
      setValues(EMPTY_FORM);
      setCodeTouched(false);
      await fetchPage(formMode === 'edit' ? page.number : 0, debouncedSearch);
    } catch (error) {
      setFormError(error.message || 'Could not save the course.');
    } finally {
      setSaving(false);
    }
  }, [values, formMode, editing, page.number, debouncedSearch, fetchPage]);

  const openView = useCallback(async (row) => {
    setRowError('');
    try {
      const response = await courseService.get(row.id);
      setViewing(response.data);
    } catch (error) {
      setRowError(error.message || 'Could not load the course.');
    }
  }, []);

  const handlePublish = useCallback(async (row) => {
    setBusyId(row.id);
    setRowError('');
    const snapshot = page.items;
    try {
      const response = await courseService.publish(row.id);
      const updated = response.data;
      setPage((current) => ({
        ...current,
        items: current.items.map((item) => (item.id === row.id ? { ...item, ...updated } : item)),
      }));
    } catch (error) {
      setPage((current) => ({ ...current, items: snapshot }));
      setRowError(error.message || 'Could not publish the course.');
    } finally {
      setBusyId(null);
    }
  }, [page.items]);

  const handleToggleActive = useCallback(async (row) => {
    setBusyId(row.id);
    setRowError('');
    const snapshot = page.items;
    try {
      const response = await courseService.toggleActive(row.id);
      const updated = response.data;
      setPage((current) => ({
        ...current,
        items: current.items.map((item) => (item.id === row.id ? { ...item, ...updated } : item)),
      }));
    } catch (error) {
      setPage((current) => ({ ...current, items: snapshot }));
      setRowError(error.message || 'Could not change the course status.');
    } finally {
      setBusyId(null);
    }
  }, [page.items]);

  const handleDelete = useCallback(async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    setRowError('');
    try {
      await courseService.remove(pendingDelete.id);
      const remaining = page.items.filter((item) => item.id !== pendingDelete.id);
      const isLastRowOnPage = remaining.length === 0 && page.totalElements > 0;
      const targetPage = isLastRowOnPage ? Math.max(page.number - 1, 0) : page.number;
      setPendingDelete(null);
      await fetchPage(targetPage, debouncedSearch);
    } catch (error) {
      setRowError(error.message || 'Could not delete the course.');
    } finally {
      setDeleting(false);
    }
  }, [pendingDelete, page.items, page.number, page.totalElements, debouncedSearch, fetchPage]);

  const columns = useMemo(
    () =>
      buildTableColumns({
        canManage,
        busyId,
        onView: openView,
        onEdit: loadForEdit,
        onPublish: handlePublish,
        onToggleActive: handleToggleActive,
        onDelete: setPendingDelete,
      }),
    [canManage, busyId, openView, loadForEdit, handlePublish, handleToggleActive],
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-navy-dark">Courses</h1>
        <p className="text-sm text-slate-500">
          Manage the catalogue, pricing and publishing state for every programme.
        </p>
      </div>

      {!canManage && (
        <CalloutBanner variant="info" title="Read-only access">
          You can browse the catalogue and open course details. Creating, editing, publishing and deleting
          courses requires an administrator account.
        </CalloutBanner>
      )}

      <CourseFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        status={status}
        onStatusChange={setStatus}
        published={published}
        onPublishedChange={setPublished}
        onCreate={openCreate}
        canManage={canManage}
      />

      {rowError && (
        <CalloutBanner variant="warn" title="Request failed">
          {rowError}
        </CalloutBanner>
      )}

      {isFiltered && !loading && !rowError && (
        <CalloutBanner variant="tip" title="Filters apply to the current page">
          Showing {visibleRows.length} of {page.items.length} courses on page {page.number + 1}. Clear the
          status or visibility filter to see the rest of this page.
        </CalloutBanner>
      )}

      <DataTable
        columns={columns}
        data={visibleRows}
        loading={loading}
        totalElements={page.totalElements}
        totalPages={page.totalPages}
        pageNumber={page.number}
        pageSize={page.size}
        onPageChange={(next) => fetchPage(next, debouncedSearch)}
      />

      <CourseFormModal
        open={formOpen}
        mode={formMode}
        course={editing}
        values={values}
        errors={errors}
        formError={formError}
        codeStatus={codeStatus}
        onChange={handleChange}
        onRegenerateCode={handleRegenerateCode}
        onSubmit={handleSubmit}
        onClose={closeForm}
        saving={saving}
      />

      <CourseViewModal
        open={!!viewing}
        course={viewing}
        canManage={canManage}
        onClose={() => setViewing(null)}
        onEdit={loadForEdit}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete course"
        message={
          pendingDelete
            ? `"${pendingDelete.name}" will be permanently removed. Existing enrollments are not affected by this screen, but the course will no longer be selectable.`
            : ''
        }
        confirmLabel="Delete course"
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setPendingDelete(null)}
      />
    </div>
  );
}
