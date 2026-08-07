import React, { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import EntityFormModal from '../components/EntityFormModal';
import ViewModal from '../components/ViewModal';
import RoleBadge from '../components/RoleBadge';
import { list, get, update, remove, lock, unlock } from '../services/user.service';

const FIELDS = [
  { name: 'username', label: 'Username', required: true },
  { name: 'email', label: 'Email', required: true },
  { name: 'password', label: 'Password', type: 'text', required: true },
  { name: 'firstName', label: 'First Name', required: true },
  { name: 'lastName', label: 'Last Name', required: true },
  { name: 'phone', label: 'Phone' },
  { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
  { name: 'gender', label: 'Gender' },
  { name: 'address', label: 'Address' },
  { name: 'city', label: 'City' },
  { name: 'state', label: 'State' },
  { name: 'postalCode', label: 'Postal Code' },
  { name: 'country', label: 'Country' },
  { name: 'profileImageUrl', label: 'Profile Image URL' },
  { name: 'role', label: 'Role', type: 'select', required: true, options: ['SUPER_ADMIN','ADMIN','TEACHER','STUDENT','PARENT','RECEPTIONIST','ACCOUNTANT','LIBRARIAN'] },
];

const COLS = [
  { key: 'id', label: 'ID', className: 'w-16' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'role', label: 'Role', render: (r) => <RoleBadge role={r.role} /> },
  { key: 'active', label: 'Active', render: (r) => (r.active ? 'Yes' : 'No') },
  { key: 'locked', label: 'Locked', render: (r) => (r.locked ? 'Yes' : 'No') },
  {
    key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex flex-wrap gap-1">
        <button onClick={() => openView(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">View</button>
        <button onClick={() => openEdit(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Edit</button>
        <button onClick={() => doToggleLock(row.id, row.locked)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">{row.locked ? 'Unlock' : 'Lock'}</button>
        <button onClick={() => doDelete(row.id)} className="rounded border px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
      </div>
    ),
  },
];

export default function Users() {
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

  const openCreate = null;
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
      if (editing) await update(editing.id, values); else await update(values.id, values);
      setOpenModal(false); setEditing(null); fetchPage(page.number);
    } catch (e) { setError(e.message || 'Save failed'); }
    finally { setFormLoading(false); }
  };

  const doDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    setLoading(true);
    try { await remove(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Delete failed'); }
    finally { setLoading(false); }
  };

  const doToggleLock = async (id, locked) => {
    setLoading(true);
    try { if (locked) await unlock(id); else await lock(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Lock toggle failed'); }
    finally { setLoading(false); }
  };

  const viewFields = useMemo(() => [
    { key: 'id', label: 'ID' }, { key: 'username', label: 'Username' }, { key: 'email', label: 'Email' },
    { key: 'firstName', label: 'First Name' }, { key: 'lastName', label: 'Last Name' },
    { key: 'phone', label: 'Phone' }, { key: 'dateOfBirth', label: 'Date of Birth' },
    { key: 'gender', label: 'Gender' }, { key: 'address', label: 'Address' },
    { key: 'city', label: 'City' }, { key: 'state', label: 'State' },
    { key: 'postalCode', label: 'Postal Code' }, { key: 'country', label: 'Country' },
    { key: 'role', label: 'Role' }, { key: 'emailVerified', label: 'Email Verified', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'phoneVerified', label: 'Phone Verified', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'locked', label: 'Locked', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'failedAttempts', label: 'Failed Attempts' }, { key: 'active', label: 'Active', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'createdAt', label: 'Created At' }, { key: 'updatedAt', label: 'Updated At' },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        
      </div>
      <input type="search" placeholder="Search users..." className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchPage(0)} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DataTable columns={COLS} data={page.items} loading={loading} error={error} totalElements={page.totalElements} totalPages={page.totalPages} pageNumber={page.number} pageSize={page.size} onPageChange={(n) => fetchPage(n)} />
      <EntityFormModal open={openModal} title={editing ? 'Edit User' : 'New User'} fields={FIELDS} initialValues={editing || {}} onSubmit={onSubmit} onClose={() => { setOpenModal(false); setEditing(null); }} loading={formLoading} />
      <ViewModal open={!!viewing} title="User Details" record={viewing} fields={viewFields} onClose={() => setViewing(null)} />
    </div>
  );
}

