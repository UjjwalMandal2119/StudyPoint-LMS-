import React, { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/common/DataTable';
import EntityFormModal from '../components/forms/EntityFormModal';
import ViewModal from '../components/ui/ViewModal';
import { list, get, create, update, remove, review } from '../services/admission.service';

const STATUSES = ['PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'COMPLETED', 'DROPPED', 'SUSPENDED'];

const FIELDS = [
  { name: 'firstName', label: 'First Name', required: true },
  { name: 'lastName', label: 'Last Name', required: true },
  { name: 'email', label: 'Email', required: true },
  { name: 'phone', label: 'Phone', required: true },
  { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
  { name: 'gender', label: 'Gender' },
  { name: 'address', label: 'Address' },
  { name: 'city', label: 'City' },
  { name: 'state', label: 'State' },
  { name: 'postalCode', label: 'Postal Code' },
  { name: 'country', label: 'Country' },
  { name: 'courseId', label: 'Course ID', type: 'number', required: true },
  { name: 'previousSchool', label: 'Previous School' },
  { name: 'previousGrade', label: 'Previous Grade' },
  { name: 'guardianName', label: 'Guardian Name' },
  { name: 'guardianPhone', label: 'Guardian Phone' },
  { name: 'guardianEmail', label: 'Guardian Email' },
  { name: 'documentsUrl', label: 'Documents URL' },
];

const STATUS_BADGE = (s) => (
  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s === 'APPROVED' || s === 'ACTIVE' ? 'bg-green-100 text-green-700' : s === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{s}</span>
);

const COLS = [
  { key: 'id', label: 'ID', className: 'w-16' },
  { key: 'applicationNumber', label: 'App No' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'courseName', label: 'Course' },
  { key: 'status', label: 'Status', render: (r) => STATUS_BADGE(r.status) },
  {
    key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex flex-wrap gap-1">
        <button onClick={() => openView(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">View</button>
        <button onClick={() => openEdit(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Edit</button>
        <button onClick={() => doReview(row.id, 'APPROVED')} className="rounded border px-2 py-1 text-xs text-green-700 hover:bg-green-50">Approve</button>
        <button onClick={() => doReview(row.id, 'REJECTED')} className="rounded border px-2 py-1 text-xs text-red-700 hover:bg-red-50">Reject</button>
        <button onClick={() => doDelete(row.id)} className="rounded border px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
      </div>
    ),
  },
];

export default function Admissions() {
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
  const onSubmit = async (values) => {
    setFormLoading(true);
    try {
      if (editing) await update(editing.id, values); else await create(values);
      setOpenModal(false); setEditing(null); fetchPage(page.number);
    } catch (e) { setError(e.message || 'Save failed'); }
    finally { setFormLoading(false); }
  };

  const doReview = async (id, status) => {
    const remarks = prompt(`Enter remarks for ${status.toLowerCase()} (optional):`);
    setLoading(true);
    try { await review(id, status, remarks || ''); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Review failed'); }
    finally { setLoading(false); }
  };

  const doDelete = async (id) => {
    if (!confirm('Delete this admission application?')) return;
    setLoading(true);
    try { await remove(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Delete failed'); }
    finally { setLoading(false); }
  };

  const viewFields = useMemo(() => [
    { key: 'applicationNumber', label: 'Application No' }, { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' },
    { key: 'dateOfBirth', label: 'Date of Birth' }, { key: 'gender', label: 'Gender' },
    { key: 'address', label: 'Address' }, { key: 'city', label: 'City' }, { key: 'state', label: 'State' },
    { key: 'country', label: 'Country' }, { key: 'courseName', label: 'Course' },
    { key: 'previousSchool', label: 'Previous School' }, { key: 'previousGrade', label: 'Previous Grade' },
    { key: 'guardianName', label: 'Guardian' }, { key: 'guardianPhone', label: 'Guardian Phone' },
    { key: 'status', label: 'Status' }, { key: 'remarks', label: 'Remarks' },
    { key: 'reviewedAt', label: 'Reviewed At' }, { key: 'createdAt', label: 'Created At' },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admissions</h1>
        <button onClick={openCreate} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">New Application</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => fetchPage(0)} className="rounded-full border border-gray-300 px-3 py-1 text-xs hover:bg-gray-100">{s}</button>
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DataTable columns={COLS} data={page.items} loading={loading} error={error} totalElements={page.totalElements} totalPages={page.totalPages} pageNumber={page.number} pageSize={page.size} onPageChange={(n) => fetchPage(n)} />
      <EntityFormModal open={openModal} title={editing ? 'Edit Application' : 'New Application'} fields={FIELDS} initialValues={editing || {}} onSubmit={onSubmit} onClose={() => { setOpenModal(false); setEditing(null); }} loading={formLoading} />
      <ViewModal open={!!viewing} title="Admission Application Details" record={viewing} fields={viewFields} onClose={() => setViewing(null)} />
    </div>
  );
}

