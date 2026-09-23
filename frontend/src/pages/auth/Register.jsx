import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiPhone, 
  FiEye, 
  FiEyeOff, 
  FiShield, 
  FiArrowRight, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiLoader,
  FiBriefcase
} from 'react-icons/fi';
import { register as registerService } from '../../services/auth.service';
import { setCredentials } from '../../store/slices/authSlice';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      setError(err.response?.data?.message || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-lms-bg font-sans text-slate-700">
      {/* ============ TOP ANNOUNCEMENT BAR ============ */}
      <div className="bg-navy-dark text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs sm:px-8">
          <span className="flex items-center gap-2">🎓 Study Point — New Admission Registration</span>
          <span className="hidden sm:inline">Education • Excellence • Growth</span>
        </div>
      </div>

      {/* ============ HEADER ============ */}
      <Header />

      {/* ============ MAIN REGISTER SECTION ============ */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-lms-border bg-white shadow-xl lg:grid-cols-12">
          
          {/* Left Hero Panel (Enterprise Branding) */}
          <div className="relative hidden flex-col justify-between bg-gradient-to-br from-navy-dark via-navy-primary to-navy-hover p-10 text-white lg:col-span-5 lg:flex xl:p-12">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-accent-amber/20 blur-3xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-amber/40 bg-accent-amber/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-accent-amber">
                🎓 Join Study Point
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white xl:text-4xl">
                Start Your Learning <br />
                <span className="bg-gradient-to-r from-white via-white/90 to-accent-amber bg-clip-text text-transparent">
                  Journey Today
                </span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Create your account to unlock interactive live classes, mock exam series, personalized doubt resolution, and study resources.
              </p>
            </div>

            <div className="relative z-10 my-8 space-y-4">
              <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3.5 backdrop-blur">
                <FiCheckCircle className="h-5 w-5 shrink-0 text-accent-amber" />
                <p className="text-xs font-medium text-white/90">Instant Access to Live Batches & Lectures</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3.5 backdrop-blur">
                <FiCheckCircle className="h-5 w-5 shrink-0 text-accent-amber" />
                <p className="text-xs font-medium text-white/90">Curated PDF Study Notes & Assignments</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3.5 backdrop-blur">
                <FiCheckCircle className="h-5 w-5 shrink-0 text-accent-amber" />
                <p className="text-xs font-medium text-white/90">Real-Time Exam Analytics & Score Reports</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/15 pt-6">
              <p className="text-xs italic text-white/85">
                "Quality education combined with disciplined guidance prepares students for lifelong excellence."
              </p>
              <p className="mt-2 text-xs font-bold text-accent-amber">— Ujjwal Mandal, Founder & Director</p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7 xl:p-12">
            <div className="mx-auto w-full max-w-xl">
              <div className="mb-6 text-center lg:text-left">
                <h2 className="text-2xl font-extrabold text-navy-dark sm:text-3xl">Create Account</h2>
                <p className="mt-1.5 text-sm text-slate-500">
                  Fill in your details below to register on the Study Point Academic Portal.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700">
                  <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Username & Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Username *
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <FiUser className="h-4 w-4" />
                      </div>
                      <input
                        required
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="e.g. rahul_kumar"
                        className="w-full rounded-xl border border-lms-border bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm font-medium text-navy-dark outline-none transition focus:border-navy-primary focus:bg-white focus:ring-2 focus:ring-navy-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <FiMail className="h-4 w-4" />
                      </div>
                      <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full rounded-xl border border-lms-border bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm font-medium text-navy-dark outline-none transition focus:border-navy-primary focus:bg-white focus:ring-2 focus:ring-navy-primary/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: First Name & Last Name */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      First Name *
                    </label>
                    <input
                      required
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul"
                      className="w-full rounded-xl border border-lms-border bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-navy-dark outline-none transition focus:border-navy-primary focus:bg-white focus:ring-2 focus:ring-navy-primary/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Last Name *
                    </label>
                    <input
                      required
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Sharma"
                      className="w-full rounded-xl border border-lms-border bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-navy-dark outline-none transition focus:border-navy-primary focus:bg-white focus:ring-2 focus:ring-navy-primary/20"
                    />
                  </div>
                </div>

                {/* Row 3: Password & Role */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Password *
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <FiLock className="h-4 w-4" />
                      </div>
                      <input
                        required
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-lms-border bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm font-medium text-navy-dark outline-none transition focus:border-navy-primary focus:bg-white focus:ring-2 focus:ring-navy-primary/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-navy-primary"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Account Role
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <FiBriefcase className="h-4 w-4" />
                      </div>
                      <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-xl border border-lms-border bg-slate-50/50 py-2.5 pl-10 pr-8 text-sm font-medium text-navy-dark outline-none transition focus:border-navy-primary focus:bg-white focus:ring-2 focus:ring-navy-primary/20"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 4: Phone */}
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Phone / Mobile Number
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <FiPhone className="h-4 w-4" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 82948 23430"
                      className="w-full rounded-xl border border-lms-border bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm font-medium text-navy-dark outline-none transition focus:border-navy-primary focus:bg-white focus:ring-2 focus:ring-navy-primary/20"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy-primary to-navy-hover py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <FiLoader className="h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Register Account
                        <FiArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Login Link */}
                <div className="pt-2 text-center text-sm text-slate-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold text-navy-primary hover:underline">
                    Sign In Here
                  </Link>
                </div>
              </form>

              {/* Security Note */}
              <div className="mt-6 flex items-center justify-center gap-2 border-t border-lms-border pt-4 text-xs text-slate-400">
                <FiShield className="h-3.5 w-3.5 text-emerald-600" />
                <span>Protected with SSL encryption & Safe Data Standard</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
}