import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiBookOpen,
  FiAward,
  FiTarget,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiArrowRight,
  FiMapPin,
  FiPhone,
  FiMail,
} from 'react-icons/fi';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

const CONTACT = {
  email: 'studypoint.ujjwal@gmail.com',
  phone: '8294823430',
  phoneDisplay: '+91 82948 23430',
  address: 'Bindapathar, Jamtara, Jharkhand — 815351',
  founder: 'Ujjwal Mandal',
};

const PROGRAMS = [
  {
    icon: <FiBookOpen className="h-6 w-6 text-navy-primary" />,
    title: 'Class 6 – 10 Foundation',
    desc: 'Strong conceptual foundation in Mathematics, Science, and English with regular practice sets.',
  },
  {
    icon: <FiAward className="h-6 w-6 text-navy-primary" />,
    title: 'Class 11 – 12 Science',
    desc: 'Board-focused preparation for PCM / PCB with structured notes and periodic assessments.',
  },
  {
    icon: <FiTarget className="h-6 w-6 text-navy-primary" />,
    title: 'Competitive Exam Coaching',
    desc: 'Guided preparation for JEE, NEET, and other entrance exams with a disciplined batch schedule.',
  },
  {
    icon: <FiCheckCircle className="h-6 w-6 text-navy-primary" />,
    title: 'Online Test Series & Mocks',
    desc: 'Subject-wise quizzes and full-length mock tests with instant score reports and analytics.',
  },
  {
    icon: <FiClock className="h-6 w-6 text-navy-primary" />,
    title: 'Live & Recorded Classes',
    desc: 'Interactive live sessions with recorded backups, so revision is always possible.',
  },
  {
    icon: <FiUsers className="h-6 w-6 text-navy-primary" />,
    title: 'Doubt Solving & Mentorship',
    desc: 'Personalized doubt-clearing and regular mentoring for every enrolled student.',
  },
];

export default function Courses() {
  return (
    <div className="min-h-screen bg-lms-bg font-sans text-slate-700">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-dark via-navy-primary to-navy-hover px-8 py-12 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-amber/40 bg-accent-amber/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-accent-amber">
              Our Programs
            </span>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Courses at Study Point</h1>
            <p className="mt-3 text-base leading-relaxed text-white/90 sm:text-lg">
              Structured coaching programs designed to build strong fundamentals, exam confidence, and measurable
              academic growth — both online and at our centre.
            </p>
          </div>
        </header>

        <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Available courses">
          {PROGRAMS.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-lms-border bg-white p-6 shadow-card transition hover:border-navy-primary/30"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-primary/10">
                {p.icon}
              </span>
              <h3 className="text-lg font-bold text-navy-dark">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border-l-4 border-accent-amber bg-white p-8 shadow-card">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-navy-dark">Unsure which course fits?</h2>
              <p className="mt-1 text-sm text-slate-600">Talk to the Study Point team and we will help you pick the right batch.</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-hover"
            >
              Contact Us <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-navy-dark p-8 text-white shadow-xl">
          <p className="text-xs font-bold uppercase tracking-wider text-accent-amber">Get In Touch</p>
          <h2 className="mt-1 text-2xl font-bold">Visit or Call Our Centre</h2>
          <div className="mt-6 grid gap-6 text-sm sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-amber">
                <FiMapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-white">Address</p>
                <p className="mt-1 text-xs text-white/80">{CONTACT.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-amber">
                <FiPhone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-white">Phone / WhatsApp</p>
                <a href={`tel:${CONTACT.phone}`} className="mt-1 block text-xs text-white/80 hover:text-white hover:underline">
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-amber">
                <FiMail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-white">Email</p>
                <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-xs text-white/80 hover:text-white hover:underline">
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-gradient-to-r from-navy-primary to-navy-hover p-8 text-center text-white shadow-lg">
          <h2 className="text-2xl font-bold">Ready to Start Learning With Us?</h2>
          <p className="mt-2 text-sm text-white/90">Create your account today to unlock live classes, mock tests, and study resources.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-navy-primary shadow-md transition hover:scale-105"
            >
              Enroll Now <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Login
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}