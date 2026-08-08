import React, { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/common/DataTable';
import EntityFormModal from '../components/forms/EntityFormModal';
import ViewModal from '../components/ui/ViewModal';
import { list, get, create, update, remove, search } from '../services/teacher.service';

const FIELDS = [
  { name: 'userId', label: 'User ID', type: 'number', required: true },
  { name: 'employeeId', label: 'Employee ID', required: true },
  { name: 'qualification', label: 'Qualification' },
  { name: 'specialization', label: 'Specialization' },
  { name: 'joiningDate', label: 'Joining Date', type: 'date' },
  { name: 'yearsOfExperience', label: 'Years of Experience', type: 'number' },
  { name: 'salary', label: 'Salary', type: 'number' },
  { name: 'bankAccountNumber', label: 'Bank Account Number' },
  { name: 'bankName', label: 'Bank Name' },
  { name: 'ifscCode', label: 'IFSC Code' },
  { name: 'panNumber', label: 'PAN Number' },
  { name: 'aadhaarNumber', label: 'Aadhaar Number' },
  { name: 'fullTime', label: 'Full Time', type: 'checkbox' },
];

const COLS = [
  { key: 'id', label: 'ID', className: 'w-16' },
  { key: 'userName', label: 'Teacher Name' },
  { key: 'userEmail', label: 'Email' },
  { key: 'employeeId', label: 'Employee ID' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'specialization', label: 'Specialization' },
  { key: 'joiningDate', label: 'Joining Date' },
  { key: 'yearsOfExperience', label: 'Experience' },
  { key: 'active', label: 'Active', render: (r) => (r.active ? 'Yes' : 'No') },
  {
    key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex flex-wrap gap-1">
        <button onClick={() => openView(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">View</button>
        <button onClick={() => openEdit(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Edit</button>
        <button onClick={() => doDelete(row.id)} className="rounded border px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
      </div>
    ),
  },
];


export default function Teachers() {
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
      const res = searchTerm ? await search(searchTerm, n, 10) : await list({ page: n, size: 10 });
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
    if (!confirm('Delete this teacher?')) return;
    setLoading(true);
    try { await remove(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Delete failed'); }
    finally { setLoading(false); }
  };

  const viewFields = useMemo(() => [
    { key: 'id', label: 'ID' }, { key: 'userName', label: 'Teacher Name' }, { key: 'userEmail', label: 'Email' },
    { key: 'employeeId', label: 'Employee ID' }, { key: 'qualification', label: 'Qualification' },
    { key: 'specialization', label: 'Specialization' }, { key: 'joiningDate', label: 'Joining Date' },
    { key: 'yearsOfExperience', label: 'Years of Experience' }, { key: 'salary', label: 'Salary' },
    { key: 'bankName', label: 'Bank Name' }, { key: 'ifscCode', label: 'IFSC Code' },
    { key: 'fullTime', label: 'Full Time', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'active', label: 'Active', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'createdAt', label: 'Created At' }, { key: 'updatedAt', label: 'Updated At' },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <button onClick={openCreate} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">New Teacher</button>
      </div>
      <input type="search" placeholder="Search teachers (press Enter)..." defaultValue={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchPage(0)} className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DataTable columns={COLS} data={page.items} loading={loading} error={error} totalElements={page.totalElements} totalPages={page.totalPages} pageNumber={page.number} pageSize={page.size} onPageChange={(n) => fetchPage(n)} />
      <EntityFormModal open={openModal} title={editing ? 'Edit Teacher' : 'New Teacher'} fields={FIELDS} initialValues={editing || {}} onSubmit={onSubmit} onClose={() => { setOpenModal(false); setEditing(null); }} loading={formLoading} />
      <ViewModal open={!!viewing} title="Teacher Details" record={viewing} fields={viewFields} onClose={() => setViewing(null)} />
    </div>
  );
}

