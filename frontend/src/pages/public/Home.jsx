import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-indigo-600">Study Point</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
          <Link to="/register" className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Get Started</Link>
        </div>
      </nav>
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-900">Welcome to Study Point</h2>
        <p className="mb-8 text-lg text-gray-600">A modern coaching institute management platform for students, teachers, and administrators.</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-xl font-semibold">For Students</h3>
            <p className="text-gray-600">Access courses, assignments, exams, and track your progress.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-xl font-semibold">For Teachers</h3>
            <p className="text-gray-600">Manage classes, create assignments, and evaluate students.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-xl font-semibold">For Admins</h3>
            <p className="text-gray-600">Oversee operations, manage users, and generate reports.</p>
          </div>
        </div>
        <div className="mt-12">
          <Link to="/register" className="rounded-lg bg-indigo-600 px-8 py-3 text-lg font-semibold text-white hover:bg-indigo-700">Get Started Today</Link>
        </div>
      </div>
    </div>
  );
}
