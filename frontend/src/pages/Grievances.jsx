import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import EntityFormModal from '../components/EntityFormModal';
import ViewModal from '../components/ViewModal';
import { list, get, create, updateStatus, remove } from '../services/grievance.service';

const STATUSES = ['SUBMITTED', 'IN_REVIEW', 'RESOLVED', 'REJECTED'];
const CATEGORIES = ['ACADEMIC', 'ADMINISTRATIVE', 'FEES', 'FACILITY', 'OTHER'];

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'category', label: 'Category', type: 'select', options: CATEGORIES },
];

const STATUS_BADGE = (s) => (
  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s === 'RESOLVED' ? 'bg-green-100 text-green-700' : s === 'REJECTED' ? 'bg-red-100 text-red-700' : s === 'IN_REVIEW' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{s}</span>
);

const COLS = [
  { key: 'id', label: 'ID', className: 'w-16' },
  { key: 'trackingNumber', label: 'Tracking #' },
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'userName', label: 'Submitted By' },
  { key: 'status', label: 'Status', render: (r) => STATUS_BADGE(r.status) },
  { key: 'createdAt', label: 'Created At' },
  {
    key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex flex-wrap gap-1">
        <button onClick={() => openView(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">View</button>
        <button onClick={() => doStatus(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Update Status</button>
        <button onClick={() => doDelete(row.id)} className="rounded border px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
      </div>
    ),
  },
];

export default function Grievances() {
  const [page, setPage] = useState({ items: [], totalElements: 0, totalPages: 0, number: 0, size: 10 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
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

  const openView = async (row) => {
    setLoading(true);
    try { const res = await get(row.id); setViewing(res.data); }
    catch (e) { setError(e.message || 'Failed to load'); }
    finally { setLoading(false); }
  };

  const doStatus = async (row) => {
    const status = prompt('New status (' + STATUSES.join('/') + '):', row.status);
    if (!status || !STATUSES.includes(status.toUpperCase())) { alert('Invalid status'); return; }
    const response = prompt('Admin response (optional):');
    setLoading(true);
    try { await updateStatus(row.id, status.toUpperCase(), response || ''); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Update failed'); }
    finally { setLoading(false); }
  };

  const doDelete = async (id) => {
    if (!confirm('Delete this grievance?')) return;
    setLoading(true);
    try { await remove(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Delete failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Grievances</h1>
        <button onClick={() => setOpenModal(true)} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">Submit Grievance</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => fetchPage(0)} className="rounded-full border border-gray-300 px-3 py-1 text-xs hover:bg-gray-100">{s}</button>
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DataTable columns={COLS} data={page.items} loading={loading} error={error} totalElements={page.totalElements} totalPages={page.totalPages} pageNumber={page.number} pageSize={page.size} onPageChange={(n) => fetchPage(n)} />
      <EntityFormModal open={openModal} title="Submit Grievance" fields={FIELDS} onSubmit={onSubmit} onClose={() => setOpenModal(false)} loading={formLoading} />
      <ViewModal open={!!viewing} title="Grievance Details" record={viewing} fields={[
        { key: 'trackingNumber', label: 'Tracking #' }, { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description' }, { key: 'category', label: 'Category' },
        { key: 'userName', label: 'Submitted By' }, { key: 'status', label: 'Status' },
        { key: 'adminResponse', label: 'Admin Response' }, { key: 'resolvedAt', label: 'Resolved At' },
        { key: 'createdAt', label: 'Created At' },
      ]} onClose={() => setViewing(null)} />
    </div>
  );
}
