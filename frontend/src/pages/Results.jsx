import React, { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/common/DataTable';
import EntityFormModal from '../components/forms/EntityFormModal';
import ViewModal from '../components/ui/ViewModal';
import { list, get, create, publish } from '../services/result.service';

const FIELDS = [
  { name: 'examId', label: 'Exam ID', type: 'number', required: true },
  { name: 'studentId', label: 'Student ID', type: 'number', required: true },
  { name: 'marksObtained', label: 'Marks Obtained', type: 'number', required: true },
  { name: 'percentage', label: 'Percentage', type: 'number', required: true },
  { name: 'grade', label: 'Grade' },
  { name: 'rank', label: 'Rank', type: 'number' },
  { name: 'passed', label: 'Passed', type: 'checkbox' },
  { name: 'remarks', label: 'Remarks', type: 'textarea' },
];

const COLS = [
  { key: 'id', label: 'ID', className: 'w-16' },
  { key: 'studentName', label: 'Student' },
  { key: 'examTitle', label: 'Exam' },
  { key: 'marksObtained', label: 'Marks' },
  { key: 'totalMarks', label: 'Total' },
  { key: 'percentage', label: 'Percentage' },
  { key: 'grade', label: 'Grade' },
  { key: 'rank', label: 'Rank' },
  { key: 'passed', label: 'Passed', render: (r) => (r.passed ? 'Yes' : 'No') },
  { key: 'published', label: 'Published', render: (r) => (r.published ? 'Yes' : 'No') },
  {
    key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex flex-wrap gap-1">
        <button onClick={() => openView(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">View</button>
        <button onClick={() => openEdit(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Edit</button>
        {!row.published && <button onClick={() => doPublish(row.id)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Publish</button>}
      </div>
    ),
  },
];

export default function Results() {
  const [page, setPage] = useState({ items: [], totalElements: 0, totalPages: 0, number: 0, size: 10 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  const doPublish = async (id) => {
    setLoading(true);
    try { await publish(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Publish failed'); }
    finally { setLoading(false); }
  };

  const viewFields = useMemo(() => [
    { key: 'id', label: 'ID' }, { key: 'studentName', label: 'Student' },
    { key: 'examTitle', label: 'Exam' }, { key: 'marksObtained', label: 'Marks Obtained' },
    { key: 'totalMarks', label: 'Total Marks' }, { key: 'percentage', label: 'Percentage' },
    { key: 'grade', label: 'Grade' }, { key: 'rank', label: 'Rank' },
    { key: 'passed', label: 'Passed', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'published', label: 'Published', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'remarks', label: 'Remarks' }, { key: 'publishedAt', label: 'Published At' },
    { key: 'createdAt', label: 'Created At' },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Results</h1>
        <button onClick={openCreate} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">New Result</button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DataTable columns={COLS} data={page.items} loading={loading} error={error} totalElements={page.totalElements} totalPages={page.totalPages} pageNumber={page.number} pageSize={page.size} onPageChange={(n) => fetchPage(n)} />
      <EntityFormModal open={openModal} title={editing ? 'Edit Result' : 'New Result'} fields={FIELDS} initialValues={editing || {}} onSubmit={onSubmit} onClose={() => { setOpenModal(false); setEditing(null); }} loading={formLoading} />
      <ViewModal open={!!viewing} title="Result Details" record={viewing} fields={viewFields} onClose={() => setViewing(null)} />
    </div>
  );
}

