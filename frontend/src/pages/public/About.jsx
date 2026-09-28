import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiCheck,
  FiArrowRight,
  FiPhone,
  FiMail,
  FiMapPin,
  FiBookOpen,
  FiAward,
  FiTarget,
  FiUsers,
} from 'react-icons/fi';
import founderPhoto from '../../assets/ujjwal PhotoCollegeUniform.jpeg';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80',
  classroom:
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
  founder: founderPhoto,
};

const CONTACT = {
  email: 'studypoint.ujjwal@gmail.com',
  phone: '8294823430',
  phoneDisplay: '+91 82948 23430',
  address: 'Bindapathar, Jamtara, Jharkhand — 815351',
  founder: 'Ujjwal Mandal',
  role: 'Founder & Director, Study Point',
};

const STATS = [
  { value: '5+', label: 'Years of Teaching' },
  { value: '1,000+', label: 'Active Students' },
  { value: '95%', label: 'Success Rate' },
  { value: '50+', label: 'Mock Tests & Series' },
];

const STORY_POINTS = [
  'Interactive live lectures & recorded backups',
  'Regular mock exams & performance analytics',
  'Chapter-wise PDF notes & solved exercises',
  'One-on-one doubt clearing sessions',
];

const WHY = [
  {
    icon: <FiBookOpen className="h-6 w-6 text-navy-primary" />,
    title: 'Concept-Driven Learning',
    desc: 'Comprehensive online lectures and structured course materials tailored for academic success.',
  },
  {
    icon: <FiAward className="h-6 w-6 text-navy-primary" />,
    title: 'Regular Testing & Analytics',
    desc: 'Subject-wise quizzes and full-length mock exams to evaluate progress regularly.',
  },
  {
    icon: <FiTarget className="h-6 w-6 text-navy-primary" />,
    title: 'Personalized Mentorship',
    desc: 'Dedicated doubt-solving sessions and direct guidance for every enrolled student.',
  },
  {
    icon: <FiUsers className="h-6 w-6 text-navy-primary" />,
    title: 'Focused Batch Sizes',
    desc: 'Small, disciplined batches so every teacher knows every student and tracks individual growth.',
  },
];

const VALUES = [
  { icon: '🎯', title: 'Our Vision', desc: 'To provide affordable, high-quality online coaching and guidance to every student.' },
  { icon: '🚀', title: 'Our Mission', desc: 'To simplify complex topics through innovative teaching methods and structured test practice.' },
  { icon: '💎', title: 'Our Core Values', desc: 'Academic discipline, continuous improvement, and unwavering support for every student.' },
];
export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-700">
      {/* ============ ANNOUNCEMENT BAR ============ */}
      <div className="bg-navy-dark text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-2 text-xs sm:justify-between sm:px-8">
          <p className="flex items-center gap-2">🎓 Study Point — Online Coaching Institute</p>
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
          alt="Students learning at Study Point"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 to-navy-primary/50" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-amber/40 bg-accent-amber/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-amber">
              About Our Coaching
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[3.4rem]">
              About{' '}
              <span className="bg-gradient-to-r from-navy-hover to-accent-amber bg-clip-text text-transparent">
                Study Point
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Empowering students through high-quality online lectures, a structured test series,
              and dedicated individual mentorship — built on a clear goal of concept clarity for every learner.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-navy-primary to-navy-hover px-7 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-105"
              >
                Explore Our Programs
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Talk to the Director
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/70">
              <span className="flex items-center gap-2"><FiCheck className="h-4 w-4 text-accent-amber" /> Live & Recorded Classes</span>
              <span className="flex items-center gap-2"><FiCheck className="h-4 w-4 text-accent-amber" /> Online Mock Tests</span>
              <span className="flex items-center gap-2"><FiCheck className="h-4 w-4 text-accent-amber" /> Personal Doubt Clearing</span>
            </div>
          </div>

          <div className="relative">
            <img
              src={IMG.classroom}
              alt="Classroom at Study Point online coaching"
              className="w-full rounded-3xl border border-white/15 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-5 shadow-lift sm:block">
              <p className="text-2xl font-extrabold text-navy-primary">100%</p>
              <p className="text-xs font-medium text-slate-500">Dedicated Mentorship</p>
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
{/* ============ OUR STORY ============ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <img
              src={IMG.hero}
              alt="Welcome to Study Point online coaching"
              className="w-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-navy-primary px-6 py-5 text-white shadow-lift sm:block">
              <p className="text-3xl font-extrabold">5+</p>
              <p className="text-xs uppercase tracking-wider text-white/80">Years of Mentorship</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Welcome to Study Point</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">
              Your Trusted Online Coaching Destination
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Study Point is an online coaching institute built to deliver quality education and
              concept clarity straight to your screen. Whether you are aiming to strengthen your
              fundamental subject knowledge or preparing for competitive examinations, our platform
              offers a complete learning ecosystem.
            </p>
            <p className="mt-3 leading-relaxed text-slate-600">
              We provide structured live and recorded batches, downloadable PDF notes, homework
              assignments, and comprehensive online mock tests — ensuring every student receives
              clear guidance and measurable academic growth.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {STORY_POINTS.map((t) => (
                <li key={t} className="flex items-center gap-3 text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-status-easy-bg text-status-easy-text">
                    <FiCheck className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/courses"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-navy-primary px-6 py-3 text-sm font-semibold text-navy-primary transition hover:bg-navy-primary hover:text-white"
            >
              Explore Our Programs
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="bg-lms-bg py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Why Study With Us</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">What Makes Study Point Different</h2>
            <p className="mt-4 text-slate-600">
              A complete learning system designed to make every student exam-ready and confident.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-lms-border bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-navy-primary/30 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-primary/10 transition group-hover:scale-110">
                  {f.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy-dark">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* ============ VISION / MISSION / VALUES ============ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Our Foundation</p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">Vision, Mission & Core Values</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-lms-border bg-white p-7 text-center shadow-card">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-primary/10 text-3xl">{v.icon}</span>
              <h3 className="mt-4 text-xl font-bold text-navy-dark">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FOUNDER & DIRECTOR ============ */}
      <section className="bg-navy-dark py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-3xl border border-white/15 p-3">
                <img
                  src={IMG.founder}
                  alt="Ujjwal Mandal, Founder & Director of Study Point"
                  className="w-full rounded-2xl object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-3">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-amber">Founder's Vision</p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">A Message From Our Director</h2>
              <h3 className="mt-6 text-2xl font-extrabold">{CONTACT.founder}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-navy-hover">{CONTACT.role}</p>
              <div className="mt-6 border-l-4 border-accent-amber bg-white/5 p-6">
                <p className="text-lg font-semibold italic text-white">“Dear Students & Parents”</p>
                <p className="mt-3 leading-relaxed text-white/85">
                  Study Point was founded with a clear vision: to ensure that every student,
                  regardless of location, receives top-tier online coaching, continuous
                  encouragement, and the exact academic resources required to excel. My commitment
                  is to simplify complex concepts, build problem-solving confidence, and provide
                  every student with a clear, measurable path to academic success.
                </p>
                <p className="mt-4 text-sm font-bold">— Ujjwal Mandal, Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* ============ CONTACT STRIP ============ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Get In Touch</p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">Visit or Contact Our Centre</h2>
          <p className="mt-4 text-slate-600">Have questions about admissions, batches, or courses? Reach out to us directly!</p>
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
          <h2 className="text-3xl font-extrabold md:text-5xl">Ready to Start Learning With Us?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Join Study Point today and gain instant access to our online classes, mock tests, and study notes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="rounded-full bg-white px-8 py-3 font-semibold text-navy-primary shadow-xl transition hover:scale-105"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="rounded-full border-2 border-white/70 px-8 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              I Already Have an Account
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
}