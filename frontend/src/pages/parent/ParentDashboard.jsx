import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getParentStats } from '../../services/dashboard.service';

function Progress({ label, percent }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-600">{label}</span>
        <span className="font-bold text-[#7b1113]">{percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-[#7b1113]"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
    </div>
  );
}

export default function ParentDashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try {
      const res = await getParentStats();
      setStats(res.data || {});
    } catch (e) {
      setError(e.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const s = stats || {};
  const children = s.children || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-medium text-[#7b1113]">Home</span>
        <span>/</span>
        <span>Parent Dashboard</span>
      </div>

      <section className="relative overflow-hidden rounded-lg bg-[#7b1113] px-6 py-8 text-white shadow-md sm:px-8">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[18px] border-white/10" />
        <div className="absolute -bottom-16 right-24 h-44 w-44 rounded-full border-[12px] border-white/10" />
        <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">Parent Panel</p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Welcome, {user?.firstName || user?.username}</h1>
            <p className="mt-2 text-sm text-white/85">
              Track the academic progress, attendance and results of your children.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-lg bg-white/10 px-6 py-4">
            <span className="text-4xl font-extrabold">{s.childCount ?? 0}</span>
            <span className="text-[11px] uppercase tracking-wider text-white/80">Children<br />Linked</span>
          </div>
        </div>
      </section>

      {error && <p className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Children</p>
          <p className="mt-2 text-3xl font-extrabold text-[#7b1113]">{s.childCount ?? 0}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Notifications</p>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">{s.unreadNotifications ?? 0}</p>
          <p className="mt-1 text-xs text-gray-500">unread</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Actions</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button onClick={() => navigate('/attendance')} className="rounded border border-[#7b1113] px-3 py-1.5 text-xs font-semibold text-[#7b1113] hover:bg-[#7b1113] hover:text-white">Attendance</button>
            <button onClick={() => navigate('/results')} className="rounded border border-[#7b1113] px-3 py-1.5 text-xs font-semibold text-[#7b1113] hover:bg-[#7b1113] hover:text-white">Results</button>
            <button onClick={() => navigate('/notices')} className="rounded border border-[#7b1113] px-3 py-1.5 text-xs font-semibold text-[#7b1113] hover:bg-[#7b1113] hover:text-white">Notices</button>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-900">My Children</h2>
        {children.length === 0 ? (
          <p className="text-sm text-gray-500">No children linked to your account yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {children.map((c) => (
              <div key={c.studentId} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{c.studentName}</p>
                    <p className="text-xs text-gray-500">
                      Roll {c.rollNumber || '—'} · {c.batchName || 'Not assigned'}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/students')}
                    className="rounded border border-[#7b1113] px-2.5 py-1 text-xs font-semibold text-[#7b1113] hover:bg-[#7b1113] hover:text-white"
                  >
                    Details
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  <Progress label="Attendance" percent={c.attendancePercentage ?? 0} />
                  <Progress label="Average Result" percent={Math.round(c.averagePercentage ?? 0)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {loading && <p className="text-sm text-gray-400">Refreshing data…</p>}
    </div>
  );
}
