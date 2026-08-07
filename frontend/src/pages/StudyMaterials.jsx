import React, { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import EntityFormModal from '../components/EntityFormModal';
import ViewModal from '../components/ViewModal';
import { list, get, create, update, remove, download } from '../services/studymaterial.service';

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'subjectId', label: 'Subject ID', type: 'number' },
  { name: 'batchId', label: 'Batch ID', type: 'number' },
  { name: 'fileUrl', label: 'File URL', required: true },
  { name: 'fileType', label: 'File Type' },
  { name: 'fileSize', label: 'File Size (bytes)', type: 'number' },
  { name: 'publicAccess', label: 'Public Access', type: 'checkbox' },
];

const COLS = [
  { key: 'id', label: 'ID', className: 'w-16' },
  { key: 'title', label: 'Title' },
  { key: 'subjectName', label: 'Subject' },
  { key: 'batchName', label: 'Batch' },
  { key: 'fileType', label: 'Type' },
  { key: 'publicAccess', label: 'Public', render: (r) => (r.publicAccess ? 'Yes' : 'No') },
  { key: 'downloadCount', label: 'Downloads' },
  {
    key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex flex-wrap gap-1">
        <button onClick={() => openView(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">View</button>
        <button onClick={() => doDownload(row.id)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Download</button>
        <button onClick={() => openEdit(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Edit</button>
        <button onClick={() => doDelete(row.id)} className="rounded border px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
      </div>
    ),
  },
];

export default function StudyMaterials() {
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

  const doDownload = async (id) => {
    try { const res = await download(id); window.open(res.data?.fileUrl, '_blank'); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Download failed'); }
  };

  const doDelete = async (id) => {
    if (!confirm('Delete this study material?')) return;
    setLoading(true);
    try { await remove(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Delete failed'); }
    finally { setLoading(false); }
  };

  const viewFields = useMemo(() => [
    { key: 'title', label: 'Title' }, { key: 'description', label: 'Description' },
    { key: 'subjectName', label: 'Subject' }, { key: 'batchName', label: 'Batch' },
    { key: 'fileUrl', label: 'File URL' }, { key: 'fileType', label: 'File Type' },
    { key: 'fileSize', label: 'File Size (bytes)' }, { key: 'uploaderName', label: 'Uploaded By' },
    { key: 'publicAccess', label: 'Public', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'downloadCount', label: 'Downloads' }, { key: 'createdAt', label: 'Created At' },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Study Materials</h1>
        <button onClick={openCreate} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">Upload Material</button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DataTable columns={COLS} data={page.items} loading={loading} error={error} totalElements={page.totalElements} totalPages={page.totalPages} pageNumber={page.number} pageSize={page.size} onPageChange={(n) => fetchPage(n)} />
      <EntityFormModal open={openModal} title={editing ? 'Edit Material' : 'Upload Material'} fields={FIELDS} initialValues={editing || {}} onSubmit={onSubmit} onClose={() => { setOpenModal(false); setEditing(null); }} loading={formLoading} />
      <ViewModal open={!!viewing} title="Study Material Details" record={viewing} fields={viewFields} onClose={() => setViewing(null)} />
    </div>
  );
}
