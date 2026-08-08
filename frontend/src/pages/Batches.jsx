import React, { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/common/DataTable';
import EntityFormModal from '../components/forms/EntityFormModal';
import ViewModal from '../components/ui/ViewModal';
import { list, get, create, update, remove, toggleActive } from '../services/batch.service';

const FIELDS = [
  { name: 'name', label: 'Name', required: true },
  { name: 'code', label: 'Code', required: true },
  { name: 'courseId', label: 'Course ID', type: 'number', required: true },
  { name: 'teacherId', label: 'Teacher ID', type: 'number' },
  { name: 'startDate', label: 'Start Date', type: 'date', required: true },
  { name: 'endDate', label: 'End Date', type: 'date' },
  { name: 'classTime', label: 'Class Time', type: 'time' },
  { name: 'classDays', label: 'Class Days' },
  { name: 'roomNumber', label: 'Room Number' },
  { name: 'maxStudents', label: 'Max Students', type: 'number' },
];

const COLS = [
  { key: 'id', label: 'ID', className: 'w-16' },
  { key: 'name', label: 'Name' },
  { key: 'code', label: 'Code' },
  { key: 'courseName', label: 'Course' },
  { key: 'teacherName', label: 'Teacher' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'endDate', label: 'End Date' },
  { key: 'active', label: 'Active', render: (r) => (r.active ? 'Yes' : 'No') },
  {
    key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex flex-wrap gap-1">
        <button onClick={() => openView(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">View</button>
        <button onClick={() => openEdit(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Edit</button>
        <button onClick={() => doToggle(row.id)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">{row.active ? 'Deactivate' : 'Activate'}</button>
        <button onClick={() => doDelete(row.id)} className="rounded border px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
      </div>
    ),
  },
];

export default function Batches() {
  const [page, setPage] = useState({ items: [], totalElements: 0, totalPages: 0, number: 0, size: 10 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchPage = async (n = 0) => {
    setLoading(true); setError('');
    try {
      const res = await list({ page: n, size: 10 });
      const p = res.data || {};
      setPage({ items: p.content || [], totalElements: p.totalElements || 0, totalPages: p.totalPages || 0, number: p.number || 0, size: p.size || 10 });
    } catch (e) { setError(e.message || 'Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPage(0); }, []);

  const openCreate = () => { setEditing(null); setOpenModal(true); };
  const openEdit = async (row) => {
    setLoading(true);
    try { const res = await get(row.id); setEditing(res.data); setOpenModal(true); }
    catch (e) { setError(e.message || 'Failed to load'); }
    finally { setLoading(false); }
  };
  const openView = async (row) => {
    setLoading(true);
    try { const res = await get(row.id); setViewing(res.data); }
    catch (e) { setError(e.message || 'Failed to load'); }
    finally { setLoading(false); }
  };

  const onSubmit = async (values) => {
    setFormLoading(true);
    try {
      if (editing) await update(editing.id, values); else await create(values);
      setOpenModal(false); setEditing(null); fetchPage(page.number);
    } catch (e) { setError(e.message || 'Save failed'); }
    finally { setFormLoading(false); }
  };

  const doDelete = async (id) => {
    if (!confirm('Delete this batch?')) return;
    setLoading(true);
    try { await remove(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Delete failed'); }
    finally { setLoading(false); }
  };

  const doToggle = async (id) => {
    setLoading(true);
    try { await toggleActive(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Toggle failed'); }
    finally { setLoading(false); }
  };

  const viewFields = useMemo(() => [
    { key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }, { key: 'code', label: 'Code' },
    { key: 'courseId', label: 'Course ID' }, { key: 'courseName', label: 'Course Name' },
    { key: 'teacherId', label: 'Teacher ID' }, { key: 'teacherName', label: 'Teacher Name' },
    { key: 'startDate', label: 'Start Date' }, { key: 'endDate', label: 'End Date' },
    { key: 'classTime', label: 'Class Time' }, { key: 'classDays', label: 'Class Days' },
    { key: 'roomNumber', label: 'Room Number' }, { key: 'maxStudents', label: 'Max Students' },
    { key: 'active', label: 'Active', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'createdAt', label: 'Created At' }, { key: 'updatedAt', label: 'Updated At' },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Batches</h1>
        <button onClick={openCreate} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">New Batch</button>
      </div>
      <input type="search" placeholder="Search batches..." className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchPage(0)} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DataTable columns={COLS} data={page.items} loading={loading} error={error} totalElements={page.totalElements} totalPages={page.totalPages} pageNumber={page.number} pageSize={page.size} onPageChange={(n) => fetchPage(n)} />
      <EntityFormModal open={openModal} title={editing ? 'Edit Batch' : 'New Batch'} fields={FIELDS} initialValues={editing || {}} onSubmit={onSubmit} onClose={() => { setOpenModal(false); setEditing(null); }} loading={formLoading} />
      <ViewModal open={!!viewing} title="Batch Details" record={viewing} fields={viewFields} onClose={() => setViewing(null)} />
    </div>
  );
}

