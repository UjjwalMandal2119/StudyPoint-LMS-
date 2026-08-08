import React, { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/common/DataTable';
import EntityFormModal from '../components/forms/EntityFormModal';
import ViewModal from '../components/ui/ViewModal';
import { list, get, create, update, remove, publish, unpublish } from '../services/notice.service';

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'content', label: 'Content', type: 'textarea', required: true },
  { name: 'publishDate', label: 'Publish Date', type: 'date', required: true },
  { name: 'expiryDate', label: 'Expiry Date', type: 'date' },
  { name: 'important', label: 'Important', type: 'checkbox' },
  { name: 'attachmentUrl', label: 'Attachment URL' },
];

const COLS = [
  { key: 'id', label: 'ID', className: 'w-16' },
  { key: 'title', label: 'Title' },
  { key: 'publishDate', label: 'Publish Date' },
  { key: 'expiryDate', label: 'Expiry Date' },
  { key: 'important', label: 'Important', render: (r) => (r.important ? 'Yes' : 'No') },
  { key: 'published', label: 'Published', render: (r) => (r.published ? 'Yes' : 'No') },
  {
    key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex flex-wrap gap-1">
        <button onClick={() => openView(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">View</button>
        <button onClick={() => openEdit(row)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Edit</button>
        {row.published
          ? <button onClick={() => doPublish(row.id, false)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Unpublish</button>
          : <button onClick={() => doPublish(row.id, true)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Publish</button>}
        <button onClick={() => doDelete(row.id)} className="rounded border px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
      </div>
    ),
  },
];

export default function Notices() {
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

  const doPublish = async (id, pub) => {
    setLoading(true);
    try { if (pub) await publish(id); else await unpublish(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Publish failed'); }
    finally { setLoading(false); }
  };

  const doDelete = async (id) => {
    if (!confirm('Delete this notice?')) return;
    setLoading(true);
    try { await remove(id); fetchPage(page.number); }
    catch (e) { setError(e.message || 'Delete failed'); }
    finally { setLoading(false); }
  };

  const viewFields = useMemo(() => [
    { key: 'title', label: 'Title' }, { key: 'content', label: 'Content' },
    { key: 'publishDate', label: 'Publish Date' }, { key: 'expiryDate', label: 'Expiry Date' },
    { key: 'important', label: 'Important', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'authorName', label: 'Author' }, { key: 'published', label: 'Published', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'publishedAt', label: 'Published At' }, { key: 'createdAt', label: 'Created At' },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notices & Announcements</h1>
        <button onClick={openCreate} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">New Notice</button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DataTable columns={COLS} data={page.items} loading={loading} error={error} totalElements={page.totalElements} totalPages={page.totalPages} pageNumber={page.number} pageSize={page.size} onPageChange={(n) => fetchPage(n)} />
      <EntityFormModal open={openModal} title={editing ? 'Edit Notice' : 'New Notice'} fields={FIELDS} initialValues={editing || {}} onSubmit={onSubmit} onClose={() => { setOpenModal(false); setEditing(null); }} loading={formLoading} />
      <ViewModal open={!!viewing} title="Notice Details" record={viewing} fields={viewFields} onClose={() => setViewing(null)} />
    </div>
  );
}

