import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
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
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="mt-2 text-sm text-white/85">We are here to help — reach out anytime.</p>
        </header>
        <div className="grid gap-4 rounded-lg bg-white p-8 shadow-sm sm:grid-cols-2">
          <div className="border-l-4 border-[#7b1113] pl-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Email</p>
            <p className="mt-1 font-medium text-gray-800">support@studypoint.com</p>
          </div>
          <div className="border-l-4 border-[#7b1113] pl-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone</p>
            <p className="mt-1 font-medium text-gray-800">+91 98765 43210</p>
          </div>
          <div className="border-l-4 border-[#7b1113] pl-4 sm:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Address</p>
            <p className="mt-1 font-medium text-gray-800">Knowledge Park, Learning City — Study Point Campus</p>
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-gray-500">© {new Date().getFullYear()} Study Point. All rights reserved.</div>
      </footer>
    </div>
  );
}
