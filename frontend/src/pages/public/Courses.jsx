import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiBookOpen,
  FiAward,
  FiTarget,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiCheck,
  FiArrowRight,
  FiMapPin,
  FiPhone,
  FiMail,
} from 'react-icons/fi';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80',
  learning:
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
};

const CONTACT = {
  email: 'studypoint.ujjwal@gmail.com',
  phone: '8294823430',
  phoneDisplay: '+91 82948 23430',
  address: 'Bindapathar, Jamtara, Jharkhand — 815351',
};

const STATS = [
  { value: '6+', label: 'Coaching Programs' },
  { value: '100%', label: 'Live Interactive Classes' },
  { value: '500+', label: 'Video Lectures & Notes' },
  { value: '50+', label: 'Mock Tests & Quizzes' },
];

const PROGRAMS = [
  {
    icon: <FiBookOpen className="h-6 w-6 text-navy-primary" />,
    title: 'Class 6 – 10 Foundation',
    tag: 'Foundation',
    desc: 'Strong conceptual foundation in Mathematics, Science, and English with regular practice sets.',
  },
  {
    icon: <FiAward className="h-6 w-6 text-navy-primary" />,
    title: 'Class 11 – 12 Science',
    tag: 'Board + Entrance',
    desc: 'Board-focused preparation for PCM / PCB with structured notes and periodic assessments.',
  },
  {
    icon: <FiTarget className="h-6 w-6 text-navy-primary" />,
    title: 'Competitive Exam Coaching',
    tag: 'JEE · NEET',
    desc: 'Guided preparation for JEE, NEET, and other entrance exams with a disciplined batch schedule.',
  },
  {
    icon: <FiCheckCircle className="h-6 w-6 text-navy-primary" />,
    title: 'Online Test Series & Mocks',
    tag: 'Assessment',
    desc: 'Subject-wise quizzes and full-length mock tests with instant score reports and analytics.',
  },
  {
    icon: <FiClock className="h-6 w-6 text-navy-primary" />,
    title: 'Live & Recorded Classes',
    tag: 'Online',
    desc: 'Interactive live sessions with recorded backups, so revision is always possible.',
  },
  {
    icon: <FiUsers className="h-6 w-6 text-navy-primary" />,
    title: 'Doubt Solving & Mentorship',
    tag: '1-on-1',
    desc: 'Personalized doubt-clearing and regular mentoring for every enrolled student.',
  },
];

const INCLUDED = [
  'Daily live classes with recorded backup for revision',
  'Chapter-wise PDF notes, formula sheets & solved exercises',
  'Weekly tests, full-length mocks and detailed score reports',
  'Unlimited doubt clearing through chats and live forums',
  'Parent access to attendance and performance reports',
];

const STEPS = [
  { n: '01', title: 'Choose Your Program', desc: 'Browse courses and pick the batch that matches your class or exam target.' },
  { n: '02', title: 'Get Enrolled', desc: 'Create your student account, complete registration, and join your batch.' },
  { n: '03', title: 'Learn & Excel', desc: 'Attend live classes, practice mock tests, solve doubts, and boost your results.' },
];
export default function Courses() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-700">
      {/* ============ ANNOUNCEMENT BAR ============ */}
      <div className="bg-navy-dark text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-2 text-xs sm:justify-between sm:px-8">
          <p className="flex items-center gap-2">🎓 Admissions Open for New Batches — Bindapathar, Jamtara, Jharkhand</p>
          <p className="hidden items-center gap-2 font-medium sm:flex">
            <FiPhone className="h-3.5 w-3.5 text-accent-amber" />
            {CONTACT.phoneDisplay}
          </p>
        </div>
      </div>

      {/* ============ HEADER ============ */}
      <Header />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-navy-dark">
        <img
          src={IMG.hero}
          alt="Courses at Study Point online coaching"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 to-navy-primary/50" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-amber/40 bg-accent-amber/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-amber">
              Our Programs
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Courses at{' '}
              <span className="bg-gradient-to-r from-navy-hover to-accent-amber bg-clip-text text-transparent">
                Study Point
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Structured coaching programs designed to build strong fundamentals, exam confidence,
              and measurable academic growth — both online and at our centre.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#programs"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-navy-primary to-navy-hover px-7 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-105"
              >
                View All Programs
                <FiArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Talk to an Advisor
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/70">
              <span className="flex items-center gap-2"><FiCheck className="h-4 w-4 text-accent-amber" /> Online & Offline Batches</span>
              <span className="flex items-center gap-2"><FiCheck className="h-4 w-4 text-accent-amber" /> Instant Score Reports</span>
              <span className="flex items-center gap-2"><FiCheck className="h-4 w-4 text-accent-amber" /> Study Material Included</span>
            </div>
          </div>

          <div className="relative">
            <img
              src={IMG.learning}
              alt="Student learning with Study Point programs"
              className="w-full rounded-3xl border border-white/15 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-5 shadow-lift sm:block">
              <p className="text-2xl font-extrabold text-navy-primary">15,000+</p>
              <p className="text-xs font-medium text-slate-500">Questions in Test Bank</p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-8 text-center sm:px-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* ============ PROGRAMS ============ */}
      <section id="programs" className="bg-lms-bg py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Choose Your Path</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">Programs Built for Every Goal</h2>
            <p className="mt-4 text-slate-600">
              From school-level foundations to competitive entrance exams — find the right coaching for you.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <div
                key={p.title}
                className="group flex flex-col rounded-2xl border border-lms-border bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-navy-primary/30 hover:shadow-lift"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-primary/10 transition group-hover:scale-110">
                    {p.icon}
                  </span>
                  <span className="rounded-full bg-status-easy-bg px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-status-easy-text">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy-dark">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.desc}</p>
                <Link
                  to="/register"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-primary transition hover:gap-3 hover:text-navy-hover"
                >
                  Enroll Now
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT'S INCLUDED ============ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Everything Included</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">One Enrollment. Complete Learning Kit.</h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Every Study Point batch comes with a full learning ecosystem — live teaching, study
              material, continuous assessment, and direct support — so nothing is left to chance.
            </p>
            <ul className="mt-6 space-y-3">
              {INCLUDED.map((t) => (
                <li key={t} className="flex items-center gap-3 text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-status-easy-bg text-status-easy-text">
                    <FiCheck className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-navy-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-hover"
            >
              Get Started Free
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <img
              src={IMG.learning}
              alt="Study material and live classes at Study Point"
              className="w-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-navy-primary px-6 py-5 text-white shadow-lift sm:block">
              <p className="text-3xl font-extrabold">100%</p>
              <p className="text-xs uppercase tracking-wider text-white/80">Syllabus Coverage</p>
            </div>
          </div>
        </div>
      </section>
{/* ============ HOW IT WORKS ============ */}
      <section className="bg-lms-bg py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">How It Works</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">Start Your Journey in Three Steps</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-lms-border bg-white p-7 shadow-card">
                <span className="absolute -top-5 left-7 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy-primary to-navy-hover text-sm font-extrabold text-white shadow-lg">
                  {s.n}
                </span>
                <h3 className="mt-6 text-xl font-bold text-navy-dark">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-3 rounded-2xl border border-lms-border bg-white p-4 shadow-card sm:gap-4">
            <p className="text-sm font-medium text-slate-700">Not sure which program fits you?</p>
            <Link to="/contact" className="text-sm font-bold text-navy-primary hover:underline">
              Talk to the Study Point team
            </Link>
            <span className="hidden text-sm text-slate-400 sm:inline">— we'll help you pick the right batch.</span>
          </div>
        </div>
      </section>

      {/* ============ CONTACT STRIP ============ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Get In Touch</p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">Visit or Call Our Centre</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-navy-primary via-navy-primary to-navy-hover px-8 py-16 text-center text-white shadow-2xl">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-accent-amber/20 blur-2xl" />
          <h2 className="text-3xl font-extrabold md:text-5xl">Ready to Excel in Your Exams?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Create your account today to unlock live classes, mock tests, and study resources.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="rounded-full bg-white px-8 py-3 font-semibold text-navy-primary shadow-xl transition hover:scale-105"
            >
              Enroll Now
            </Link>
            <Link
              to="/login"
              className="rounded-full border-2 border-white/70 px-8 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
}