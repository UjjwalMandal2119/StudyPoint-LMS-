import React, { useEffect, useState } from 'react';
import EntityFormModal from '../components/EntityFormModal';
import { listMy, unreadCount, markRead, markAllRead, create } from '../services/notification.service';

const FIELDS = [
  { name: 'userId', label: 'Recipient User ID', type: 'number', required: true },
  { name: 'type', label: 'Type', type: 'select', options: ['INFO', 'WARNING', 'SUCCESS', 'ERROR', 'REMINDER', 'ALERT'] },
  { name: 'title', label: 'Title', required: true },
  { name: 'message', label: 'Message', type: 'textarea', required: true },
  { name: 'actionUrl', label: 'Action URL' },
  { name: 'imageUrl', label: 'Image URL' },
];

export default function Notifications() {
  const [notifs, setNotifs] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true); setError('');
    try {
      const res = await listMy({ page: 0, size: 50 });
      const p = res.data || {};
      setNotifs(p.content || []);
      const c = await unreadCount();
      setUnread(c.data ?? 0);
    } catch (e) { setError(e.message || 'Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const doMarkRead = async (id) => {
    try { await markRead(id); fetchData(); } catch (e) { setError(e.message || 'Failed'); }
  };

  const doMarkAll = async () => {
    try { await markAllRead(); fetchData(); } catch (e) { setError(e.message || 'Failed'); }
  };

  const onSubmit = async (values) => {
    setFormLoading(true);
    try { await create(values); setOpenModal(false); fetchData(); }
    catch (e) { setError(e.message || 'Send failed'); }
    finally { setFormLoading(false); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex gap-2">
          <button onClick={doMarkAll} className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100">Mark All Read</button>
          <button onClick={() => setOpenModal(true)} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">Send Notification</button>
        </div>
      </div>
      <p className="text-sm text-gray-600">{unread} unread notification{unread === 1 ? '' : 's'}</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="space-y-2">
        {loading ? <p className="text-gray-500">Loading...</p> : notifs.length === 0 ? <p className="text-gray-500">No notifications.</p> : notifs.map((n) => (
          <div key={n.id} className={`rounded-lg border p-4 ${n.read ? 'border-gray-200 bg-white' : 'border-indigo-200 bg-indigo-50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${n.type === 'ALERT' || n.type === 'ERROR' ? 'bg-red-100 text-red-700' : n.type === 'WARNING' ? 'bg-yellow-100 text-yellow-700' : n.type === 'SUCCESS' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{n.type}</span>
                <span className="font-medium">{n.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{n.createdAt}</span>
                {!n.read && <button onClick={() => doMarkRead(n.id)} className="rounded border px-2 py-0.5 text-xs hover:bg-gray-100">Mark read</button>}
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-700">{n.message}</p>
          </div>
        ))}
      </div>
      <EntityFormModal open={openModal} title="Send Notification" fields={FIELDS} onSubmit={onSubmit} onClose={() => setOpenModal(false)} loading={formLoading} />
    </div>
  );
}
