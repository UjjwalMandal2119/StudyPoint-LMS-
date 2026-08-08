import React, { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/common/DataTable';
import EntityFormModal from '../components/forms/EntityFormModal';
import ViewModal from '../components/ui/ViewModal';
import { list, get, create, update, remove, approve } from '../services/question.service';

const FIELDS = [
  { name: 'questionText', label: 'Question Text', type: 'textarea', required: true },
  { name: 'questionType', label: 'Question Type', type: 'select', required: true, options: ['MULTIPLE_CHOICE','TRUE_FALSE','SHORT_ANSWER','LONG_ANSWER','MATCHING','FILL_IN_BLANK'] },
  { name: 'subjectId', label: 'Subject ID', type: 'number', required: true },
  { name: 'options', label: 'Options', type: 'textarea' },
  { name: 'correctAnswer', label: 'Correct Answer' },
  { name: 'explanation', label: 'Explanation', type: 'textarea' },
  { name: 'marks', label: 'Marks', type: 'number', required: true },
  { name: 'difficultyLevel', label: 'Difficulty Level' },
];

const COLS = [
  { key: 'id', label: 'ID', className: 'w-16' },
  { key: 'questionText', label: 'Question' },
  { key: 'questionType', label: 'Type' },
  { key: 'subjectName', label: 'Subject' },
  { key: 'marks', label: 'Marks' },
  { key: 'difficultyLevel', label: 'Difficulty' },
  { key: 'approved', label: 'Approved', render: (r) => (r.approved ? 'Yes' : 'No') },
  {
    key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex flex-wrap gap-1">
        <button onClick={() => openView(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">View</button>
        <button onClick={() => openEdit(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Edit</button>
        {!row.approved && <button onClick={() => doApprove(row.id)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Approve</button>}
        <button onClick={() => doDelete(row.id)} className="rounded border px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
      </div>
    ),
  },
];

export default function Questions() {
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
    if (!confirm('Delete this question?')) return;
    setLoading(true);
    try { await remove(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Delete failed'); }
    finally { setLoading(false); }
  };

  const doApprove = async (id) => {
    setLoading(true);
    try { await approve(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Approve failed'); }
    finally { setLoading(false); }
  };

  const viewFields = useMemo(() => [
    { key: 'id', label: 'ID' }, { key: 'questionText', label: 'Question' },
    { key: 'questionType', label: 'Type' }, { key: 'subjectId', label: 'Subject ID' },
    { key: 'subjectName', label: 'Subject Name' }, { key: 'options', label: 'Options' },
    { key: 'correctAnswer', label: 'Correct Answer' }, { key: 'explanation', label: 'Explanation' },
    { key: 'marks', label: 'Marks' }, { key: 'difficultyLevel', label: 'Difficulty' },
    { key: 'createdBy', label: 'Created By' }, { key: 'approved', label: 'Approved', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'active', label: 'Active', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'createdAt', label: 'Created At' },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Questions</h1>
        <button onClick={openCreate} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">New Question</button>
      </div>
      <input type="search" placeholder="Search questions..." className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchPage(0)} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DataTable columns={COLS} data={page.items} loading={loading} error={error} totalElements={page.totalElements} totalPages={page.totalPages} pageNumber={page.number} pageSize={page.size} onPageChange={(n) => fetchPage(n)} />
      <EntityFormModal open={openModal} title={editing ? 'Edit Question' : 'New Question'} fields={FIELDS} initialValues={editing || {}} onSubmit={onSubmit} onClose={() => { setOpenModal(false); setEditing(null); }} loading={formLoading} />
      <ViewModal open={!!viewing} title="Question Details" record={viewing} fields={viewFields} onClose={() => setViewing(null)} />
    </div>
  );
}

