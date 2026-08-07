import React, { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import EntityFormModal from '../components/EntityFormModal';
import ViewModal from '../components/ViewModal';
import { list, get, create, update, remove, publish } from '../services/exam.service';

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'batchId', label: 'Batch ID', type: 'number', required: true },
  { name: 'subjectId', label: 'Subject ID', type: 'number', required: true },
  { name: 'examType', label: 'Exam Type', type: 'select', required: true, options: ['UNIT_TEST','MID_TERM','FINAL_TERM','MOCK_TEST','PRACTICAL','QUIZ'] },
  { name: 'startTime', label: 'Start Time', type: 'datetime', required: true },
  { name: 'endTime', label: 'End Time', type: 'datetime', required: true },
  { name: 'totalMarks', label: 'Total Marks', type: 'number', required: true },
  { name: 'passMarks', label: 'Pass Marks', type: 'number', required: true },
  { name: 'instructions', label: 'Instructions', type: 'textarea' },
];

const COLS = [
  { key: 'id', label: 'ID', className: 'w-16' },
  { key: 'title', label: 'Title' },
  { key: 'batchName', label: 'Batch' },
  { key: 'subjectName', label: 'Subject' },
  { key: 'examType', label: 'Type' },
  { key: 'startTime', label: 'Start' },
  { key: 'endTime', label: 'End' },
  { key: 'totalMarks', label: 'Total' },
  { key: 'passMarks', label: 'Pass' },
  { key: 'published', label: 'Published', render: (r) => (r.published ? 'Yes' : 'No') },
  { key: 'active', label: 'Active', render: (r) => (r.active ? 'Yes' : 'No') },
  {
    key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex flex-wrap gap-1">
        <button onClick={() => openView(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">View</button>
        <button onClick={() => openEdit(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Edit</button>
        <button onClick={() => doPublish(row.id)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">{row.published ? 'Unpublish' : 'Publish'}</button>
        <button onClick={() => doDelete(row.id)} className="rounded border px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
      </div>
    ),
  },
];

export default function Exams() {
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
    if (!confirm('Delete this exam?')) return;
    setLoading(true);
    try { await remove(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Delete failed'); }
    finally { setLoading(false); }
  };

  const doPublish = async (id) => {
    setLoading(true);
    try { await publish(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Publish failed'); }
    finally { setLoading(false); }
  };

  const viewFields = useMemo(() => [
    { key: 'id', label: 'ID' }, { key: 'title', label: 'Title' }, { key: 'description', label: 'Description' },
    { key: 'batchId', label: 'Batch ID' }, { key: 'batchName', label: 'Batch Name' },
    { key: 'subjectId', label: 'Subject ID' }, { key: 'subjectName', label: 'Subject Name' },
    { key: 'examType', label: 'Exam Type' }, { key: 'startTime', label: 'Start Time' },
    { key: 'endTime', label: 'End Time' }, { key: 'totalMarks', label: 'Total Marks' },
    { key: 'passMarks', label: 'Pass Marks' }, { key: 'instructions', label: 'Instructions' },
    { key: 'published', label: 'Published', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'active', label: 'Active', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'createdAt', label: 'Created At' },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Exams</h1>
        <button onClick={openCreate} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">New Exam</button>
      </div>
      <input type="search" placeholder="Search exams..." className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchPage(0)} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DataTable columns={COLS} data={page.items} loading={loading} error={error} totalElements={page.totalElements} totalPages={page.totalPages} pageNumber={page.number} pageSize={page.size} onPageChange={(n) => fetchPage(n)} />
      <EntityFormModal open={openModal} title={editing ? 'Edit Exam' : 'New Exam'} fields={FIELDS} initialValues={editing || {}} onSubmit={onSubmit} onClose={() => { setOpenModal(false); setEditing(null); }} loading={formLoading} />
      <ViewModal open={!!viewing} title="Exam Details" record={viewing} fields={viewFields} onClose={() => setViewing(null)} />
    </div>
  );
}
