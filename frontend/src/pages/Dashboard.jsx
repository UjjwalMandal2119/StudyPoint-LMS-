import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import api from '../api/axios';
import { logout } from '../features/auth/authSlice';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    api
      .get('/users/count/role/ADMIN')
      .then((res) => setCount(res.data.data))
      .catch((e) => setErr(e.response?.data?.message || e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
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
          <h2 className="mb-2 text-xl font-semibold">Admin User Count</h2>
          {loading && <p className="text-gray-500">Loading...</p>}
          {err && <p className="text-red-600">{err}</p>}
          {!loading && !err && (
            <p className="text-2xl font-bold">{count}</p>
          )}
        </div>
      </div>
    </div>
  );
}
