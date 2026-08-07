import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const nav = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/courses', label: 'Courses' },
  { to: '/subjects', label: 'Subjects' },
  { to: '/batches', label: 'Batches' },
  { to: '/exams', label: 'Exams' },
  { to: '/questions', label: 'Questions' },
  { to: '/assignments', label: 'Assignments' },
  { to: '/users', label: 'Users' },
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
            {collapsed ? '»' : '«'}
          </button>
        </div>
        <nav className="mt-2 space-y-1 px-2">
          {nav.map((item) => (
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
