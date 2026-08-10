import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-800">
      <div className="bg-[#7b1113] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs sm:px-8">
          <span>Study Point</span>
          <span>Education • Excellence • Growth</span>
        </div>
      </div>
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm sm:px-8">
        <Link to="/" className="text-xl font-bold text-[#7b1113]">Study Point</Link>
        <div className="space-x-4 text-sm">
          <Link to="/" className="text-gray-600 hover:text-[#7b1113]">Home</Link>
          <Link to="/login" className="text-gray-600 hover:text-[#7b1113]">Login</Link>
          <Link to="/register" className="rounded-md bg-[#7b1113] px-4 py-2 font-semibold text-white hover:bg-[#5e0d0f]">Get Started</Link>
        </div>
      </nav>
      <main className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-8 rounded-lg bg-[#7b1113] px-6 py-8 text-white">
          <h2 className="text-3xl font-bold">About Study Point</h2>
          <p className="mt-2 text-sm text-white/85">Empowering institutions with modern education technology.</p>
        </header>
        <div className="space-y-4 text-gray-700">
          <p>
            Study Point is a comprehensive coaching institute management platform designed to streamline educational operations.
          </p>
          <p>
            Our platform provides tools for course management, student tracking, attendance monitoring, exam management,
            online admissions, result analytics, notifications and much more — all under one roof.
          </p>
          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            <div className="border-l-4 border-[#7b1113] bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[#7b1113]">Excellence</p>
              <p className="mt-1 text-sm text-gray-600">Powered by data-driven tools.</p>
            </div>
            <div className="border-l-4 border-[#7b1113] bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[#7b1113]">Learning</p>
              <p className="mt-1 text-sm text-gray-600">Focused on student outcomes.</p>
            </div>
            <div className="border-l-4 border-[#7b1113] bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[#7b1113]">Community</p>
              <p className="mt-1 text-sm text-gray-600">Teachers, students and parents together.</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-gray-500">© {new Date().getFullYear()} Study Point. All rights reserved.</div>
      </footer>
    </div>
  );
}
