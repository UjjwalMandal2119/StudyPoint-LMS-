import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register as registerService } from '../../services/auth.service';
import { setCredentials } from '../../store/slices/authSlice';

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

const inputCls =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b1113]';

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await registerService(form);
      dispatch(setCredentials(result));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-[#7b1113] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs sm:px-8">
          <div className="flex items-center gap-4">
            <span>Study Point</span>
            <span className="hidden border-l border-white/30 pl-4 sm:inline">Education • Excellence • Growth</span>
          </div>
          <span className="hidden sm:block">Academic Portal</span>
        </div>
      </div>

      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#7b1113] bg-white">
              <span className="text-xl font-bold text-[#7b1113]">SP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">STUDY POINT</h1>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7b1113]">Learning Management Portal</p>
            </div>
          </div>
          <Link to="/login" className="text-sm font-semibold text-[#7b1113] hover:underline">Sign In</Link>
        </div>
      </header>

      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-md">
          <div className="bg-[#7b1113] px-6 py-5 text-center text-white">
            <h2 className="text-xl font-bold">Create Your Account</h2>
            <p className="mt-1 text-xs text-white/80">Join the Study Point learning community</p>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
            {error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 sm:col-span-2">{error}</p>}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
              <input name="username" value={form.username} onChange={handleChange} className={inputCls} required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className={inputCls} required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className={inputCls} required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
              <select name="role" value={form.role} onChange={handleChange} className={inputCls}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} className={inputCls} required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} className={inputCls} required />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className={inputCls} />
            </div>
            <div className="flex justify-end gap-2 border-t pt-4 sm:col-span-2">
              <button
                disabled={loading}
                className="w-full rounded-md bg-[#7b1113] py-2 text-sm font-semibold text-white transition hover:bg-[#5e0d0f] disabled:opacity-60"
              >
                {loading ? 'Creating account…' : 'Register'}
              </button>
            </div>
            <p className="text-center text-sm text-gray-600 sm:col-span-2">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#7b1113] hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 text-sm text-gray-500 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Study Point. All rights reserved.</p>
          <p>Learning • Knowledge • Excellence</p>
        </div>
      </footer>
    </div>
  );
}
