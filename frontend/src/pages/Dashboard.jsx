import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getDashboardLink = () => {
    switch (role) {
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return '/admin-dashboard';
      case 'STUDENT':
        return '/student-dashboard';
      case 'TEACHER':
        return '/teacher-dashboard';
      case 'PARENT':
        return '/parent-dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Study Point Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
          >
            Logout
          </button>
        </div>

        <div className="mb-4 text-gray-700">
          <span className="font-semibold">Signed in as:</span> {user?.username}{' '}
          <span className="text-sm text-gray-500">({role})</span>
        </div>

        <div className="rounded bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Welcome to Study Point</h2>
          <p className="mb-4 text-gray-600">You are logged in as <strong>{role}</strong>.</p>
          <button
            onClick={() => navigate(getDashboardLink())}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Go to {role} Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
