import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginService } from '../../services/auth.service';
import { setCredentials } from '../../features/auth/authSlice';

export default function Login() {
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await loginService(form.usernameOrEmail, form.password);
      dispatch(setCredentials(result));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded bg-white p-8 shadow"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Study Point Login</h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm">Username or Email</label>
          <input
            name="usernameOrEmail"
            value={form.usernameOrEmail}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>
        <button className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          No account?{' '}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
