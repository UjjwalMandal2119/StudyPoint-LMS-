import React, { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import EntityFormModal from '../components/EntityFormModal';
import ViewModal from '../components/ViewModal';
import { list, get, create, approve, reject } from '../services/enrollment.service';

const FIELDS = [
  { name: 'studentId', label: 'Student ID', type: 'number', required: true },
  { name: 'batchId', label: 'Batch ID', type: 'number', required: true },
  { name: 'enrollmentDate', label: 'Enrollment Date', type: 'date', required: true },
  { name: 'status', label: 'Status', type: 'select', required: true, options: ['PENDING','APPROVED','REJECTED','COMPLETED','DROPPED'] },
  { name: 'remarks', label: 'Remarks', type: 'textarea' },
];

const COLS = [
  { key: 'id', label: 'ID', className: 'w-16' },
  { key: 'studentName', label: 'Student' },
  { key: 'batchName', label: 'Batch' },
  { key: 'enrollmentDate', label: 'Enrollment Date' },
  { key: 'status', label: 'Status' },
  { key: 'approvedByName', label: 'Approved By' },
  { key: 'remarks', label: 'Remarks' },
  {
    key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex flex-wrap gap-1">
        <button onClick={() => openView(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">View</button>
        {row.status === 'PENDING' && (
          <>
            <button onClick={() => doApprove(row.id)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Approve</button>
            <button onClick={() => doReject(row.id)} className="rounded border px-2 py-1 text-xs text-red-700 hover:bg-red-50">Reject</button>
          </>
        )}
      </div>
    ),
  },
];

export default function Enrollments() {
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

  const doApprove = async (id) => {
    setLoading(true);
    try { await approve(id, 1); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Approve failed'); }
    finally { setLoading(false); }
  };

  const doReject = async (id) => {
    const remarks = prompt('Rejection remarks:');
    if (remarks === null) return;
    setLoading(true);
    try { await reject(id, remarks || ''); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Reject failed'); }
    finally { setLoading(false); }
  };

  const viewFields = useMemo(() => [
    { key: 'id', label: 'ID' }, { key: 'studentName', label: 'Student' },
    { key: 'batchName', label: 'Batch' }, { key: 'enrollmentDate', label: 'Enrollment Date' },
    { key: 'status', label: 'Status' }, { key: 'approvedByName', label: 'Approved By' },
    { key: 'remarks', label: 'Remarks' }, { key: 'active', label: 'Active', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'createdAt', label: 'Created At' }, { key: 'updatedAt', label: 'Updated At' },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Enrollments</h1>
        <button onClick={openCreate} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">New Enrollment</button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DataTable columns={COLS} data={page.items} loading={loading} error={error} totalElements={page.totalElements} totalPages={page.totalPages} pageNumber={page.number} pageSize={page.size} onPageChange={(n) => fetchPage(n)} />
      <EntityFormModal open={openModal} title={editing ? 'Edit Enrollment' : 'New Enrollment'} fields={FIELDS} initialValues={editing || {}} onSubmit={onSubmit} onClose={() => { setOpenModal(false); setEditing(null); }} loading={formLoading} />
      <ViewModal open={!!viewing} title="Enrollment Details" record={viewing} fields={viewFields} onClose={() => setViewing(null)} />
    </div>
  );
}
