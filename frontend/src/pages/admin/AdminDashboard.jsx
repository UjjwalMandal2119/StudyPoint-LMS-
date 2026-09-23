import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdminStats } from '../../services/dashboard.service';

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <p className={`mt-2 text-3xl font-extrabold ${accent || 'text-gray-900'}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try {
      const res = await getAdminStats();
      setStats(res.data || {});
    } catch (e) {
      setError(e.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const s = stats || {};
  const trend = s.monthlyNewUsers || [];
  const maxTrend = Math.max(1, ...trend.map((m) => m.count));
  const notices = s.recentNotices || [];

  const quickLinks = [
    { label: 'Students', to: '/students' },
    { label: 'Teachers', to: '/teachers' },
    { label: 'Courses', to: '/courses' },
    { label: 'Batches', to: '/batches' },
    { label: 'Exams', to: '/exams' },
    { label: 'Assignments', to: '/assignments' },
    { label: 'Admissions', to: '/admissions' },
    { label: 'Notices', to: '/notices' },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-medium text-navy-primary">Home</span>
        <span>/</span>
        <span>Admin Dashboard</span>
      </div>

      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-lg bg-navy-primary px-6 py-8 text-white shadow-md sm:px-8">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[18px] border-white/10" />
        <div className="absolute -bottom-16 right-24 h-44 w-44 rounded-full border-[12px] border-white/10" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">Administrator Console</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Welcome, {user?.firstName || user?.username}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/85">
            Monitor your institute at a glance — admissions, enrollments, academics and support all in one place.
          </p>
        </div>
      </section>

      {error && <p className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

      {/* Stat cards */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Students" value={s.totalStudents ?? '—'} sub="Enrolled learners" accent="text-navy-primary" />
        <StatCard label="Teachers" value={s.totalTeachers ?? '—'} sub="Faculty members" />
        <StatCard label="Parents" value={s.totalParents ?? '—'} sub="Registered parents" />
        <StatCard label="Courses" value={s.totalCourses ?? '—'} sub={`${s.totalSubjects ?? 0} subjects · ${s.totalBatches ?? 0} batches`} />
        <StatCard label="Pending Admissions" value={s.pendingAdmissions ?? '—'} sub="Awaiting review" accent="text-amber-600" />
        <StatCard label="Enrollments" value={s.totalEnrollments ?? '—'} sub="Total enrollments" />
        <StatCard label="Exams" value={s.totalExams ?? '—'} sub={`${s.totalAssignments ?? 0} assignments`} />
        <StatCard label="Grievances" value={(s.openGrievances ?? 0) + (s.resolvedGrievances ?? 0)} sub={`${s.resolvedGrievances ?? 0} resolved`} accent="text-emerald-600" />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Trend chart */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">New Registrations (6 months)</h2>
              <p className="text-xs text-gray-500">{s.totalUsers ?? 0} total users on the platform</p>
            </div>
            <span className="rounded-full bg-navy-primary/10 px-3 py-1 text-xs font-semibold text-navy-primary">
              {s.maleStudents ?? 0} ♂ · {s.femaleStudents ?? 0} ♀ students
            </span>
          </div>
          {trend.length === 0 && !loading ? (
            <p className="text-sm text-gray-500">No registration data yet.</p>
          ) : (
            <div className="flex h-48 items-end gap-3">
              {trend.map((m, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs font-bold text-navy-primary">{m.count}</span>
                  <div
                    className="w-full rounded-t-md bg-navy-primary transition-all"
                    style={{ height: `${Math.max(6, Math.round((m.count / maxTrend) * 100))}%` }}
                  />
                  <span className="whitespace-nowrap text-[10px] text-gray-500">{m.month}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent notices */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Notices</h2>
            <button onClick={() => navigate('/notices')} className="text-sm font-medium text-navy-primary hover:underline">
              View all
            </button>
          </div>
          {notices.length === 0 ? (
            <p className="text-sm text-gray-500">No notices published yet.</p>
          ) : (
            <ul className="space-y-3">
              {notices.map((n) => (
                <li key={n.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-gray-800">{n.title}</p>
                    {n.important && (
                      <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase text-red-700">
                        Important
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-400">{n.publishDate}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Quick links */}
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
