import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTeacherStats } from '../../services/dashboard.service';

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <p className={`mt-2 text-3xl font-extrabold ${accent || 'text-gray-900'}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try {
      const res = await getTeacherStats();
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
    { label: 'My Batches', to: '/batches' },
    { label: 'My Students', to: '/students' },
    { label: 'Assignments', to: '/assignments' },
    { label: 'Exams', to: '/exams' },
    { label: 'Attendance', to: '/attendance' },
    { label: 'Results', to: '/results' },
    { label: 'Timetable', to: '/timetable' },
    { label: 'Study Materials', to: '/study-materials' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-medium text-navy-primary">Home</span>
        <span>/</span>
        <span>Teacher Dashboard</span>
      </div>

      <section className="relative overflow-hidden rounded-lg bg-navy-primary px-6 py-8 text-white shadow-md sm:px-8">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[18px] border-white/10" />
        <div className="absolute -bottom-16 right-24 h-44 w-44 rounded-full border-[12px] border-white/10" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">Faculty Panel</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Welcome, {s.teacherName || user?.firstName || user?.username}</h1>
          <p className="mt-2 text-sm text-white/85">
            {s.employeeId ? `Employee ID: ${s.employeeId} · ` : ''}{s.specialization || 'Faculty'}
          </p>
        </div>
      </section>

      {error && <p className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Subjects Taught" value={s.subjectCount ?? '—'} accent="text-navy-primary" />
        <StatCard label="Active Batches" value={s.batchCount ?? '—'} sub={`${s.studentCount ?? 0} students`} />
        <StatCard label="Assignments" value={s.assignmentCount ?? '—'} sub={`${s.pendingSubmissions ?? 0} pending submissions`} accent="text-amber-600" />
        <StatCard label="Exams Scheduled" value={s.examCount ?? '—'} />
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

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-900">My Students</h2>
        <button
          onClick={() => navigate('/students')}
          className="rounded-md bg-navy-primary px-4 py-2 text-sm font-semibold text-white hover:bg-navy-hover"
        >
          Manage Students ({s.studentCount ?? 0})
        </button>
      </section>

      {loading && <p className="text-sm text-gray-400">Refreshing data…</p>}
    </div>
  );
}
