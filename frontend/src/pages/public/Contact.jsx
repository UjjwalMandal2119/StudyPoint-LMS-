import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiUser, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

const CONTACT = {
  email: 'studypoint.ujjwal@gmail.com',
  phone: '8294823430',
  phoneDisplay: '+91 82948 23430',
  address: 'Bindapathar, Jamtara, Jharkhand — 815351',
  founder: 'Ujjwal Mandal',
  role: 'Founder & Director, Study Point',
  hours: 'Mon - Sat: 8:00 AM - 8:00 PM',
};

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Front-end handler - ready to connect to your backend API
    setFormSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-lms-bg font-sans text-slate-700">
      {/* ============ TOP ANNOUNCEMENT BAR ============ */}
      <div className="bg-navy-dark text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs sm:px-8">
          <span className="flex items-center gap-2">🎓 Study Point — Admissions Open</span>
          <span className="hidden sm:inline">Education • Excellence • Growth</span>
        </div>
      </div>

      {/* ============ HEADER ============ */}
      <Header />

      {/* ============ MAIN CONTENT ============ */}
      <main className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        {/* Header Hero */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-dark via-navy-primary to-navy-hover px-8 py-12 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-amber/40 bg-accent-amber/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-accent-amber">
              We're Here to Help
            </span>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Contact Study Point</h1>
            <p className="mt-3 text-base leading-relaxed text-white/90 sm:text-lg">
              Have questions regarding admissions, batch timings, or course details? Get in touch with us!
            </p>
          </div>
        </header>

        {/* Content Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* Contact Details Column */}
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl border border-lms-border bg-white p-6 shadow-card">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-primary text-white">
                  <FiMapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-navy-dark">Address</p>
                  <p className="mt-1 text-sm text-slate-600">{CONTACT.address}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-lms-border bg-white p-6 shadow-card">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-primary text-white">
                  <FiPhone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-navy-dark">Phone / WhatsApp</p>
                  <a href={`tel:${CONTACT.phone}`} className="mt-1 block text-sm text-navy-hover hover:underline">
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-lms-border bg-white p-6 shadow-card">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-primary text-white">
                  <FiMail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-navy-dark">Email</p>
                  <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-sm text-navy-hover hover:underline">
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-lms-border bg-white p-6 shadow-card">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-primary text-white">
                  <FiClock className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-navy-dark">Inquiry Hours</p>
                  <p className="mt-1 text-sm text-slate-600">{CONTACT.hours}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-accent-amber/40 bg-accent-amber/5 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-amber text-white">
                  <FiUser className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-navy-dark">Founder & Director</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{CONTACT.founder}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="rounded-3xl border border-lms-border bg-white p-8 shadow-xl lg:col-span-3">
            <h3 className="text-xl font-bold text-navy-dark">Send Us an Admission Inquiry</h3>
            <p className="mt-1 text-sm text-slate-600">Fill out your details and we will contact you shortly.</p>

            {formSubmitted ? (
              <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center text-emerald-800">
                <FiCheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
                <h4 className="mt-3 text-lg font-bold">Inquiry Sent Successfully!</h4>
                <p className="mt-2 text-sm text-emerald-700">
                  Thank you for reaching out to Study Point. We will respond to your query at <strong>{formData.email || 'your email'}</strong> soon.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-5 rounded-lg bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Your Full Name</label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Kumar"
                      className="w-full rounded-xl border border-lms-border px-4 py-2.5 text-sm outline-none transition focus:border-navy-primary focus:ring-1 focus:ring-navy-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-lms-border px-4 py-2.5 text-sm outline-none transition focus:border-navy-primary focus:ring-1 focus:ring-navy-primary"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Mobile / WhatsApp</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 82948 23430"
                      className="w-full rounded-xl border border-lms-border px-4 py-2.5 text-sm outline-none transition focus:border-navy-primary focus:ring-1 focus:ring-navy-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Target Course / Subject</label>
                    <input
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      placeholder="e.g. Mathematics, Test Series"
                      className="w-full rounded-xl border border-lms-border px-4 py-2.5 text-sm outline-none transition focus:border-navy-primary focus:ring-1 focus:ring-navy-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Your Message or Query</label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about what you want to learn or ask about batches..."
                    className="w-full rounded-xl border border-lms-border px-4 py-2.5 text-sm outline-none transition focus:border-navy-primary focus:ring-1 focus:ring-navy-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy-primary to-navy-hover py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01]"
                >
                  <FiSend className="h-4 w-4" /> Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
}