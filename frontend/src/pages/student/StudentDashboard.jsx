import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getStudentStats } from '../../services/dashboard.service';

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <p className={`mt-2 text-3xl font-extrabold ${accent || 'text-gray-900'}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

function Progress({ label, percent }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-bold text-navy-primary">{percent}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-navy-primary"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try {
      const res = await getStudentStats();
      setStats(res.data || {});
    } catch (e) {
      setError(e.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const s = stats || {};

  const quickLinks = [
    { label: 'My Courses', to: '/courses' },
    { label: 'Assignments', to: '/assignments' },
    { label: 'Exams', to: '/exams' },
    { label: 'Results', to: '/results' },
    { label: 'Attendance', to: '/attendance' },
    { label: 'Timetable', to: '/timetable' },
    { label: 'Study Materials', to: '/study-materials' },
    { label: 'Discussions', to: '/discussions' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-medium text-navy-primary">Home</span>
        <span>/</span>
        <span>Student Dashboard</span>
      </div>

      <section className="relative overflow-hidden rounded-lg bg-navy-primary px-6 py-8 text-white shadow-md sm:px-8">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[18px] border-white/10" />
        <div className="absolute -bottom-16 right-24 h-44 w-44 rounded-full border-[12px] border-white/10" />
        <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">Student Panel</p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Welcome, {s.studentName || user?.firstName || user?.username}</h1>
            <p className="mt-2 text-sm text-white/85">
              Roll No. {s.rollNumber || '—'} · {s.batchName || 'Batch not assigned'}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-center rounded-lg bg-white/10 px-6 py-4 text-center">
            <span className="text-4xl font-extrabold">{s.attendancePercentage ?? 0}%</span>
            <span className="mt-1 text-[11px] uppercase tracking-wider text-white/80">Attendance</span>
          </div>
        </div>
      </section>

      {error && <p className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Pending Assignments" value={s.pendingAssignmentCount ?? '—'} sub={`${s.assignmentCount ?? 0} total (published)`} accent="text-navy-primary" />
        <StatCard label="Upcoming Exams" value={s.upcomingExamsCount ?? '—'} sub={`${s.examCount ?? 0} exams scheduled`} accent="text-amber-600" />
        <StatCard label="Results" value={s.resultCount ?? '—'} sub={`Avg ${s.averagePercentage ?? 0}%`} accent="text-emerald-600" />
        <StatCard label="Notifications" value={s.unreadNotifications ?? 0} sub="Unread" />
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Academic Performance</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Progress label="Attendance" percent={s.attendancePercentage ?? 0} />
          <Progress label="Average Result" percent={Math.round(s.averagePercentage ?? 0)} />
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Attendance recorded for {s.presentDays ?? 0} of {s.totalDays ?? 0} marked days · {s.enrollmentCount ?? 0} courses enrolled.
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Quick Access</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map((q) => (
            <button
              key={q.to}
              onClick={() => navigate(q.to)}
              className="rounded-md border border-navy-primary/20 bg-navy-primary/5 px-4 py-3 text-sm font-semibold text-navy-primary transition hover:bg-navy-primary hover:text-white"
            >
              {q.label}
            </button>
          ))}
        </div>
      </section>

      {loading && <p className="text-sm text-gray-400">Refreshing data…</p>}
    </div>
  );
}
