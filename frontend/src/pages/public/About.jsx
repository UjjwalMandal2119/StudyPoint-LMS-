import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
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
        <h2 className="mb-4 text-3xl font-bold">About Study Point</h2>
        <p className="mb-4 text-gray-700">Study Point is a comprehensive coaching institute management platform designed to streamline educational operations.</p>
        <p className="mb-4 text-gray-700">Our platform provides tools for course management, student tracking, attendance monitoring, exam management, and much more.</p>
      </div>
    </div>
  );
}
