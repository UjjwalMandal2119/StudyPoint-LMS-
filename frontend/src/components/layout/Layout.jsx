import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const nav = [
  { to: '/dashboard', label: 'Dashboard', roles: ['ADMIN', 'SUPER_ADMIN', 'STUDENT', 'TEACHER', 'PARENT', 'RECEPTIONIST', 'ACCOUNTANT', 'LIBRARIAN'] },
  { to: '/admin-dashboard', label: 'Admin Panel', roles: ['ADMIN', 'SUPER_ADMIN'] },
  { to: '/student-dashboard', label: 'Student Panel', roles: ['STUDENT'] },
  { to: '/teacher-dashboard', label: 'Teacher Panel', roles: ['TEACHER'] },
  { to: '/parent-dashboard', label: 'Parent Panel', roles: ['PARENT'] },
  { to: '/courses', label: 'Courses', roles: ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'RECEPTIONIST', 'LIBRARIAN'] },
  { to: '/subjects', label: 'Subjects', roles: ['ADMIN', 'SUPER_ADMIN', 'TEACHER'] },
  { to: '/batches', label: 'Batches', roles: ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'RECEPTIONIST'] },
  { to: '/exams', label: 'Exams', roles: ['ADMIN', 'SUPER_ADMIN', 'TEACHER'] },
  { to: '/questions', label: 'Questions', roles: ['ADMIN', 'SUPER_ADMIN', 'TEACHER'] },
  { to: '/assignments', label: 'Assignments', roles: ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'STUDENT'] },
  { to: '/users', label: 'Users', roles: ['ADMIN', 'SUPER_ADMIN'] },
  { to: '/students', label: 'Students', roles: ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'RECEPTIONIST', 'PARENT'] },
  { to: '/teachers', label: 'Teachers', roles: ['ADMIN', 'SUPER_ADMIN', 'RECEPTIONIST'] },
  { to: '/attendance', label: 'Attendance', roles: ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
  { to: '/enrollments', label: 'Enrollments', roles: ['ADMIN', 'SUPER_ADMIN', 'RECEPTIONIST'] },
  { to: '/results', label: 'Results', roles: ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
  { to: '/timetable', label: 'Timetable', roles: ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'STUDENT'] },
  { to: '/parents', label: 'Parents', roles: ['ADMIN', 'SUPER_ADMIN'] },
  { to: '/admissions', label: 'Admissions', roles: ['ADMIN', 'SUPER_ADMIN', 'RECEPTIONIST'] },
  { to: '/notices', label: 'Notices', roles: ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'STUDENT', 'PARENT', 'RECEPTIONIST'] },
  { to: '/notifications', label: 'Notifications', roles: ['ADMIN', 'SUPER_ADMIN', 'STUDENT', 'TEACHER', 'PARENT', 'RECEPTIONIST', 'ACCOUNTANT', 'LIBRARIAN'] },
  { to: '/study-materials', label: 'Study Materials', roles: ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'STUDENT'] },
  { to: '/discussions', label: 'Discussions', roles: ['ADMIN', 'SUPER_ADMIN', 'STUDENT', 'TEACHER', 'PARENT'] },
  { to: '/grievances', label: 'Grievances', roles: ['ADMIN', 'SUPER_ADMIN', 'STUDENT', 'TEACHER', 'PARENT', 'RECEPTIONIST'] },
];

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, role } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const filteredNav = nav.filter((item) => !item.roles || item.roles.includes(role));

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] text-gray-800">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } flex shrink-0 flex-col bg-[#5e0d0f] text-white shadow-lg transition-all duration-200`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white/70 bg-white/10 text-sm font-bold">
            SP
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-wide">STUDY POINT</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/60">LMS Portal</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="ml-auto rounded-md border border-white/20 px-1.5 py-0.5 text-xs hover:bg-white/10"
            title={collapsed ? 'Expand menu' : 'Collapse menu'}
          >
            {collapsed ? '»' : '«'}
          </button>
        </div>

        {!collapsed && (
          <div className="border-b border-white/10 bg-white/5 px-4 py-2 text-[11px] text-white/70">
            Education • Excellence • Growth
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-2 pb-4">
          {filteredNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              title={item.label}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md border-l-4 px-2 py-2 text-sm transition ${
                  isActive
                    ? 'border-white bg-white/15 font-semibold'
                    : 'border-transparent hover:bg-white/10'
                }`
              }
            >
              {!collapsed && <span className="truncate">{item.label}</span>}
              {collapsed && <span className="mx-auto">•</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="bg-[#7b1113] text-white">
          <div className="flex items-center justify-between px-6 py-1.5 text-xs">
            <span className="font-medium">Academic Portal</span>
            <span className="hidden sm:inline">Study Point • Learning Management System</span>
          </div>
        </div>
        <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
          <div className="text-sm text-gray-600">
            Signed in as{' '}
            <span className="font-semibold text-[#7b1113]">
              {user?.firstName || user?.username}
            </span>{' '}
            {role && (
              <span className="ml-1 rounded-full bg-[#7b1113]/10 px-2 py-0.5 text-xs font-medium text-[#7b1113]">
                {role.replace('_', ' ')}
              </span>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md border border-[#7b1113] px-3 py-1.5 text-sm font-medium text-[#7b1113] transition hover:bg-[#7b1113] hover:text-white"
          >
            Logout
          </button>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
