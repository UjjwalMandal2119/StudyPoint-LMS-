import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <Link to="/" className="text-xl font-bold text-indigo-600">Study Point</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
          <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
          <Link to="/register" className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Get Started</Link>
        </div>
      </nav>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-4 text-3xl font-bold">Contact Us</h2>
        <div className="rounded-lg bg-white p-8 shadow">
          <p className="mb-4 text-gray-700">Email: support@studypoint.com</p>
          <p className="mb-4 text-gray-700">Phone: +1 234 567 8900</p>
          <p className="text-gray-700">Address: 123 Education Street, Learning City, 12345</p>
        </div>
      </div>
    </div>
  );
}
