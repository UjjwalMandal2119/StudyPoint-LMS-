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
    <div className="min-h-screen bg-[#f5f5f5] text-gray-800">

      {/* Top Government / Institute Style Bar */}
      <div className="bg-[#7b1113] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs sm:px-8">
          <div className="flex items-center gap-4">
            <span>Study Point</span>
            <span className="hidden border-l border-white/30 pl-4 sm:inline">
              Education • Excellence • Growth
            </span>
          </div>

          <div className="hidden sm:block">
            Academic Portal
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">

          {/* Logo / Institute Name */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#7b1113] bg-white">
              <span className="text-xl font-bold text-[#7b1113]">SP</span>
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                STUDY POINT
              </h1>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7b1113]">
                Learning Management Portal
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="rounded-md border border-[#7b1113] px-4 py-2 text-sm font-semibold text-[#7b1113] transition hover:bg-[#7b1113] hover:text-white"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Page Content */}
      <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:py-12">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium text-[#7b1113]">
            Home
          </span>
          <span>/</span>
          <span>Dashboard</span>
        </div>

        {/* Welcome Banner */}
        <section className="relative mb-8 overflow-hidden rounded-lg bg-[#7b1113] px-6 py-8 text-white shadow-md sm:px-10 sm:py-10">

          {/* Decorative Elements */}
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[18px] border-white/10" />
          <div className="absolute -bottom-16 right-24 h-44 w-44 rounded-full border-[12px] border-white/5" />

          <div className="relative z-10">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-red-100">
              Welcome Back
            </p>

            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
              {user?.username || 'User'}
            </h2>

            <p className="max-w-2xl text-sm leading-6 text-red-100 sm:text-base">
              Welcome to the Study Point academic portal. Access your
              personalized dashboard and continue your learning journey.
            </p>
          </div>
        </section>

        {/* User Information */}
        <section className="mb-8 grid gap-6 md:grid-cols-3">

          {/* Account Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-red-50 text-[#7b1113]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Account
              </span>
            </div>

            <p className="mb-1 text-sm text-gray-500">
              Signed in as
            </p>

            <h3 className="break-words text-lg font-bold text-gray-900">
              {user?.username || 'User'}
            </h3>
          </div>

          {/* Role Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-red-50 text-[#7b1113]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l6.16-3.42A12.08 12.08 0 0118 15c0 1.657-2.686 3-6 3s-6-1.343-6-3c0-1.552.645-2.96 1.84-4.42L12 14z"
                  />
                </svg>
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Access
              </span>
            </div>

            <p className="mb-1 text-sm text-gray-500">
              Your role
            </p>

            <h3 className="text-lg font-bold text-gray-900">
              {role || 'USER'}
            </h3>
          </div>

          {/* Portal Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-red-50 text-[#7b1113]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M5 10v9h14v-9M4 10l8-6 8 6"
                  />
                </svg>
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Portal
              </span>
            </div>

            <p className="mb-1 text-sm text-gray-500">
              Platform
            </p>

            <h3 className="text-lg font-bold text-gray-900">
              Study Point
            </h3>
          </div>
        </section>

        {/* Main Dashboard Card */}
        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">

          {/* Section Header */}
          <div className="border-b border-gray-200 px-6 py-6 sm:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#7b1113]">
                  Academic Portal
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  Your Dashboard
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Access services and resources available for your account.
                </p>
              </div>

              {/* Role Badge */}
              <div className="inline-flex w-fit items-center rounded-full bg-red-50 px-4 py-2">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-600" />
                <span className="text-sm font-semibold text-[#7b1113]">
                  {role}
                </span>
              </div>

            </div>
          </div>

          {/* Dashboard Action */}
          <div className="p-6 sm:p-8">

            <div className="flex flex-col items-start justify-between gap-6 rounded-md border border-gray-200 bg-gray-50 p-6 md:flex-row md:items-center">

              <div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  Continue to your dashboard
                </h3>

                <p className="max-w-xl text-sm leading-6 text-gray-600">
                  You are authenticated successfully. Continue to your
                  {role ? ` ${role.toLowerCase()}` : ''} dashboard to access
                  the features and resources available to you.
                </p>
              </div>

              <button
                onClick={() => navigate(getDashboardLink())}
                className="group flex shrink-0 items-center gap-3 rounded-md bg-[#7b1113] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5e0d0f] focus:outline-none focus:ring-2 focus:ring-[#7b1113] focus:ring-offset-2"
              >
                Go to {role} Dashboard

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </button>

            </div>
          </div>
        </section>

        {/* Academic Values */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="border-l-4 border-[#7b1113] bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#7b1113]">
              Excellence
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Strive for academic and personal excellence.
            </p>
          </div>

          <div className="border-l-4 border-[#7b1113] bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#7b1113]">
              Learning
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Learn, explore and continuously improve.
            </p>
          </div>

          <div className="border-l-4 border-[#7b1113] bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#7b1113]">
              Community
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Building a collaborative learning environment.
            </p>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 text-sm text-gray-500 sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} Study Point. All rights reserved.
          </p>

          <p>
            Learning • Knowledge • Excellence
          </p>
        </div>
      </footer>

    </div>
  );
}