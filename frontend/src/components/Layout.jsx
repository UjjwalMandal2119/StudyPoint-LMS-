import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

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
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } flex-shrink-0 bg-gray-900 text-gray-100 transition-all`}
      >
        <div className="flex h-14 items-center justify-between px-4">
          {!collapsed && <span className="text-sm font-bold tracking-wide">STUDY POINT</span>}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="ml-auto rounded p-1 hover:bg-gray-800 text-xs"
          >
            {collapsed ? '�' : '�'}
          </button>
        </div>
        <nav className="mt-2 space-y-1 px-2">
          {filteredNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-gray-800 ${
                  isActive ? 'bg-gray-800 font-semibold' : ''
                }`
              }
            >
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between bg-white px-6 shadow-sm">
          <div className="text-sm text-gray-600">
            Signed in as <span className="font-medium">{user?.username}</span>{' '}
            {role && <span className="text-gray-500">({role})</span>}
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
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
