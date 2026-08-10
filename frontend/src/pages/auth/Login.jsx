import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginService } from '../../services/auth.service';
import { setCredentials } from '../../store/slices/authSlice';

export default function Login() {
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
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
      const result = await loginService(form.usernameOrEmail, form.password);
      dispatch(setCredentials(result));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
          <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-[#7b1113]">Home</Link>
        </div>
      </header>

      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md">
          <div className="bg-[#7b1113] px-6 py-5 text-center text-white">
            <h2 className="text-xl font-bold">Sign In</h2>
            <p className="mt-1 text-xs text-white/80">Access your academic dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Username or Email</label>
              <input
                name="usernameOrEmail"
                value={form.usernameOrEmail}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b1113]"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b1113]"
                required
              />
            </div>
            <button
              disabled={loading}
              className="w-full rounded-md bg-[#7b1113] py-2 text-sm font-semibold text-white transition hover:bg-[#5e0d0f] disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
            <p className="text-center text-sm text-gray-600">
              No account?{' '}
              <Link to="/register" className="font-semibold text-[#7b1113] hover:underline">Register</Link>
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
