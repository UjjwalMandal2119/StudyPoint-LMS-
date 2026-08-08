import React, { useEffect, useState } from 'react';
import EntityFormModal from '../components/forms/EntityFormModal';
import ViewModal from '../components/ui/ViewModal';
import { list, get, create, remove, like, resolve, pin, unpin, report, listReplies, addReply, likeReply, acceptAnswer } from '../services/discussion.service';

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'content', label: 'Content', type: 'textarea', required: true },
  { name: 'tag', label: 'Tag' },
];

export default function Discussions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');

  const fetchData = async () => {
    setLoading(true); setError('');
    try {
      const res = await list({ page: 0, size: 50 });
      const p = res.data || {};
      setItems(p.content || []);
    } catch (e) { setError(e.message || 'Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const onSubmit = async (values) => {
    setFormLoading(true);
    try { await create(values); setOpenModal(false); fetchData(); }
    catch (e) { setError(e.message || 'Create failed'); }
    finally { setFormLoading(false); }
  };

  const doView = async (row) => {
    try {
      const res = await get(row.id);
      setViewing(res.data);
      const r = await listReplies(row.id, { page: 0, size: 50 });
      const rp = r.data || {};
      setReplies(rp.content || []);
    } catch (e) { setError(e.message || 'Failed to load'); }
  };

  const doAction = async (fn, id, msg) => {
    try { await fn(id); fetchData(); } catch (e) { setError(e.message || msg); }
  };

  const doSubmitReply = async () => {
    if (!replyText.trim()) return;
    try {
      await addReply(viewing.id, { content: replyText });
      setReplyText('');
      const r = await listReplies(viewing.id, { page: 0, size: 50 });
      const rp = r.data || {};
      setReplies(rp.content || []);
    } catch (e) { setError(e.message || 'Reply failed'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Discussion Forum</h1>
        <button onClick={() => setOpenModal(true)} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">New Discussion</button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading ? <p className="text-gray-500">Loading...</p> : items.map((d) => (
        <div key={d.id} className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium">{d.title} {d.pinned && <span className="ml-1 rounded bg-indigo-100 px-1.5 py-0.5 text-xs text-indigo-700">Pinned</span>}</p>
              <p className="text-xs text-gray-500">by {d.userName} Â· {d.tag || 'general'} Â· {d.status}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              <button onClick={() => doView(d)} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">View</button>
              <button onClick={() => doAction(like, d.id, 'Like failed')} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">ðŸ‘ {d.likeCount}</button>
              <button onClick={() => doAction(resolve, d.id, 'Resolve failed')} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Resolve</button>
              {d.pinned
                ? <button onClick={() => doAction(unpin, d.id, 'Unpin failed')} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Unpin</button>
                : <button onClick={() => doAction(pin, d.id, 'Pin failed')} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Pin</button>}
              <button onClick={() => doAction(report, d.id, 'Report failed')} className="rounded border px-2 py-1 text-xs hover:bg-gray-100">Report</button>
              <button onClick={() => doDelete(d.id)} className="rounded border px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
            </div>
          </div>
          <div className="mt-1 text-xs text-gray-400">{d.replyCount} replies Â· {d.viewCount} views</div>
        </div>
      ))}
      <EntityFormModal open={openModal} title="New Discussion" fields={FIELDS} onSubmit={onSubmit} onClose={() => setOpenModal(false)} loading={formLoading} />
      <ViewModal open={!!viewing} title={viewing?.title || 'Discussion'} record={viewing} fields={[
        { key: 'content', label: 'Content' }, { key: 'userName', label: 'Author' },
        { key: 'tag', label: 'Tag' }, { key: 'status', label: 'Status' },
        { key: 'likeCount', label: 'Likes' }, { key: 'viewCount', label: 'Views' },
        { key: 'createdAt', label: 'Created At' },
      ]} onClose={() => setViewing(null)} />
      {viewing && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-2 font-semibold">Replies</h3>
          <div className="space-y-2">
            {replies.length === 0 && <p className="text-sm text-gray-500">No replies yet.</p>}
            {replies.map((r) => (
              <div key={r.id} className="rounded border border-gray-100 bg-gray-50 p-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">{r.userName} {r.acceptedAnswer && <span className="ml-1 rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">âœ“ Accepted</span>}</span>
                  <div className="flex gap-1">
                    <button onClick={() => doAction(likeReply, r.id, 'Like failed')} className="rounded border px-2 py-0.5 text-xs hover:bg-gray-100">ðŸ‘ {r.likeCount}</button>
                    <button onClick={() => doAction(acceptAnswer, r.id, 'Accept failed')} className="rounded border px-2 py-0.5 text-xs hover:bg-gray-100">Accept</button>
                  </div>
                </div>
                <p className="mt-1">{r.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..."
            />
            <button onClick={doSubmitReply} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700">Reply</button>
          </div>
        </div>
      )}
    </div>
  );
}

