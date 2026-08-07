import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register as registerService } from '../../services/auth.service';
import { setCredentials } from '../../features/auth/authSlice';

const ROLES = [
  'STUDENT',
  'TEACHER',
  'PARENT',
  'ADMIN',
  'SUPER_ADMIN',
  'RECEPTIONIST',
  'ACCOUNTANT',
  'LIBRARIAN',
];

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'STUDENT',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await registerService(form);
      dispatch(setCredentials(result));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded bg-white p-8 shadow"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Register</h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </div>
          <div className="md:col-span-2">
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
          <div>
            <label className="block text-sm">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="mt-6 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
          Register
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
