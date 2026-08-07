import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800">Logout</button>
        </div>
        <div className="mb-4 text-gray-700">
          <span className="font-semibold">Signed in as:</span> {user?.username}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">Students</h3>
            <p className="text-2xl font-bold text-indigo-600">Manage</p>
            <button onClick={() => navigate('/students')} className="mt-2 text-sm text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="rounded bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">Teachers</h3>
            <p className="text-2xl font-bold text-indigo-600">Manage</p>
            <button onClick={() => navigate('/teachers')} className="mt-2 text-sm text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="rounded bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">Courses</h3>
            <p className="text-2xl font-bold text-indigo-600">Manage</p>
            <button onClick={() => navigate('/courses')} className="mt-2 text-sm text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="rounded bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">Batches</h3>
            <p className="text-2xl font-bold text-indigo-600">Manage</p>
            <button onClick={() => navigate('/batches')} className="mt-2 text-sm text-indigo-600 hover:underline">View All</button>
          </div>
        </div>
      </div>
    </div>
  );
}
