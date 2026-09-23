import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiUser, FiCheckCircle, FiBookOpen, FiAward, FiTarget, FiArrowRight } from 'react-icons/fi';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

const CONTACT = {
  email: 'studypoint.ujjwal@gmail.com',
  phone: '8294823430',
  phoneDisplay: '+91 82948 23430',
  address: 'Bindapathar, Jamtara, Jharkhand — 815351',
  founder: 'Ujjwal Mandal',
  role: 'Founder & Director, Study Point',
};

const HIGHLIGHTS = [
  { icon: <FiBookOpen className="h-6 w-6 text-navy-primary" />, title: 'Concept-Driven Learning', desc: 'Comprehensive online lectures and structured course materials tailored for academic success.' },
  { icon: <FiAward className="h-6 w-6 text-navy-primary" />, title: 'Regular Testing & Analytics', desc: 'Subject-wise quizzes and full-length mock exams to evaluate progress regularly.' },
  { icon: <FiTarget className="h-6 w-6 text-navy-primary" />, title: 'Personalized Mentorship', desc: 'Dedicated doubt-solving sessions and direct guidance for every enrolled student.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-lms-bg font-sans text-slate-700">
      {/* ============ TOP ANNOUNCEMENT BAR ============ */}
      <div className="bg-navy-dark text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs sm:px-8">
          <span className="flex items-center gap-2">🎓 Study Point — Online Coaching Institute</span>
          <span className="hidden sm:inline">Education • Excellence • Growth</span>
        </div>
      </div>

      {/* ============ HEADER ============ */}
      <Header />

      {/* ============ MAIN CONTENT ============ */}
      <main className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        {/* Header Hero Section */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-dark via-navy-primary to-navy-hover px-8 py-12 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-amber/40 bg-accent-amber/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-accent-amber">
              About Our Coaching
            </span>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">About Study Point</h1>
            <p className="mt-3 text-base leading-relaxed text-white/90 sm:text-lg">
              Empowering students through high-quality online lectures, structured test series, and dedicated individual mentorship.
            </p>
          </div>
        </header>

        {/* Overview Section */}
        <section className="mt-10 rounded-2xl border border-lms-border bg-white p-8 shadow-card">
          <h2 className="text-2xl font-bold text-navy-dark">Welcome to Study Point</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Study Point is an online coaching institute built to deliver quality education and concept clarity straight to your screen. Whether you are aiming to strengthen your fundamental subject knowledge or preparing for competitive examinations, our platform offers a complete learning ecosystem.
          </p>
          <p className="mt-3 leading-relaxed text-slate-600">
            We provide structured live and recorded batches, downloadable PDF notes, homework assignments, and comprehensive online mock tests — ensuring every student receives clear guidance and measurable academic growth.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-lms-border bg-lms-bg/50 p-5 transition hover:border-navy-primary/30">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-navy-dark">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founder & Director Section */}
        <section className="mt-10 rounded-2xl border-l-4 border-accent-amber bg-white p-8 shadow-card">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Meet Our Director</p>
              <h3 className="mt-1 text-2xl font-bold text-navy-dark">{CONTACT.founder}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-hover">Founder & Director</p>
              
              <p className="mt-4 leading-relaxed text-slate-600">
                Study Point was established by <strong>{CONTACT.founder}</strong> with a clear vision: to ensure that every student, regardless of location, receives top-tier online coaching, continuous encouragement, and the exact academic resources required to excel.
              </p>
              
              <div className="mt-4 rounded-xl bg-navy-primary/5 p-4 border border-navy-primary/10">
                <p className="text-sm font-medium italic text-navy-dark">
                  "My commitment is to simplify complex concepts, build problem-solving confidence, and provide every student with a clear, measurable path to academic success."
                </p>
                <p className="mt-2 text-xs font-bold text-navy-primary">— {CONTACT.founder}, Founder & Director</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Card */}
        <section className="mt-10 rounded-2xl bg-navy-dark p-8 text-white shadow-xl">
          <p className="text-xs font-bold uppercase tracking-wider text-accent-amber">Get In Touch</p>
          <h3 className="mt-1 text-2xl font-bold">Contact Study Point Center</h3>
          
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
                <FiMail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-white">Email</p>
                <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-xs text-white/80 hover:text-white hover:underline">{CONTACT.email}</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-amber">
                <FiPhone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-white">Mobile / WhatsApp</p>
                <a href={`tel:${CONTACT.phone}`} className="mt-1 block text-xs text-white/80 hover:text-white hover:underline">{CONTACT.phoneDisplay}</a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Card */}
        <section className="mt-10 rounded-2xl bg-gradient-to-r from-navy-primary to-navy-hover p-8 text-center text-white shadow-lg">
          <h3 className="text-2xl font-bold">Ready to Start Learning With Us?</h3>
          <p className="mt-2 text-sm text-white/90">Join Study Point today and gain instant access to our online classes and test series.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-navy-primary shadow-md transition hover:scale-105">
              Enroll Now <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
}