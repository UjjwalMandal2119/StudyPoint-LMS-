import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Vision', href: '#vision' },
  { label: 'Mission', href: '#mission' },
  { label: 'Contact', href: '#contact' },
];

const SLIDES = [
  {
    title: 'Empowering Every Learner',
    subtitle: 'A modern Learning Management System that brings teachers, students and parents together on one beautiful platform.',
    gradient: 'from-indigo-600 via-purple-600 to-fuchsia-600',
    emoji: '🎓',
    badge: 'Learn Smarter',
  },
  {
    title: 'Classroom Beyond Boundaries',
    subtitle: 'Online admissions, study materials, assessments and real-time progress tracking — all in one place.',
    gradient: 'from-rose-500 via-pink-600 to-orange-500',
    emoji: '🚀',
    badge: 'Teach Brilliantly',
  },
  {
    title: 'Track, Assess, Inspire',
    subtitle: 'Attendance, assignments, quizzes, results and analytics that turn data into meaningful growth.',
    gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
    emoji: '📊',
    badge: 'Grow Together',
  },
];

const STATS = [
  { value: '10K+', label: 'Active Learners' },
  { value: '500+', label: 'Expert Teachers' },
  { value: '1.2K+', label: 'Courses' },
  { value: '98%', label: 'Satisfaction' },
];

const FEATURES = [
  { emoji: '🎓', title: 'Online Admissions', desc: 'Seamless admission and registration workflow from application to enrolment.' },
  { emoji: '📅', title: 'Smart Attendance', desc: 'Track attendance for students and staff with simple daily & bulk marking.' },
  { emoji: '📝', title: 'Assignments', desc: 'Create, submit and evaluate assignments with instant feedback loops.' },
  { emoji: '❓', title: 'Quizzes & Exams', desc: 'Build question banks, online quizzes and structured assessments.' },
  { emoji: '📈', title: 'Results & Analytics', desc: 'Individual progress tracking and insightful reports for every learner.' },
  { emoji: '📚', title: 'Study Materials', desc: 'A rich library of notes, videos and resources for every subject.' },
  { emoji: '💬', title: 'Discussion Forum', desc: 'A collaborative space to ask questions, share ideas and resolve doubts.' },
  { emoji: '🛡️', title: 'Grievance Redressal', desc: 'A transparent channel for students to raise concerns and get support.' },
  { emoji: '🔔', title: 'Notifications', desc: 'Timely announcements and alerts so nobody misses an update.' },
];

const QUOTES = [
  { text: 'Education is the most powerful weapon which you can use to change the world.', author: 'Nelson Mandela' },
  { text: 'The beautiful thing about learning is that no one can take it away from you.', author: 'B.B. King' },
  { text: 'The roots of education are bitter, but the fruit is sweet.', author: 'Aristotle' },
  { text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', author: 'Mahatma Gandhi' },
  { text: 'Teaching is the one profession that creates all other professions.', author: 'Unknown' },
  { text: 'An investment in knowledge pays the best interest.', author: 'Benjamin Franklin' },
];

export default function Home() {
  const [navSolid, setNavSolid] = useState(false);
  const [slide, setSlide] = useState(0);
  const [quote, setQuote] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setQuote((q) => (q + 1) % QUOTES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const goSlide = (i) => setSlide(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);

  return (
    <div className="min-h-screen bg-white selection:bg-fuchsia-200">
      {/* ============ NAVBAR ============ */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navSolid ? 'bg-white/95 shadow-lg backdrop-blur' : 'bg-transparent'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#home" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-lg text-white">📘</span>
            <span className={`text-xl font-extrabold ${navSolid ? 'text-gray-900' : 'text-white'}`}>
              Study<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-fuchsia-400">Point</span>
            </span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className={`rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white/20 ${navSolid ? 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600' : 'text-white'}`}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Link to="/login" className={`rounded-full px-4 py-2 text-sm font-semibold transition ${navSolid ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:bg-white/20'}`}>Login</Link>
            <Link to="/register" className="rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-300/50 transition hover:scale-105">Get Started</Link>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden text-2xl ${navSolid ? 'text-gray-800' : 'text-white'}`} aria-label="Menu">☰</button>
        </div>
        {mobileOpen && (
          <div className="space-y-1 bg-white px-6 pb-4 md:hidden">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50">{l.label}</a>
            ))}
            <div className="flex gap-2 pt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 rounded-lg border border-indigo-300 py-2 text-center text-sm font-semibold text-indigo-600">Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 rounded-lg bg-indigo-600 py-2 text-center text-sm font-semibold text-white">Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ============ HERO CAROUSEL ============ */}
      <section id="home" className="relative">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <div className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-br ${s.gradient} px-6 text-center`}>
              <span className="mb-6 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">{s.badge}</span>
              <div className="text-7xl drop-shadow-lg">{s.emoji}</div>
              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold text-white drop-shadow-md md:text-6xl">{s.title}</h1>
              <p className="mt-5 max-w-2xl text-lg text-white/90 md:text-xl">{s.subtitle}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Link to="/register" className="rounded-full bg-white px-8 py-3 font-semibold text-indigo-700 shadow-xl transition hover:scale-105">Get Started Free</Link>
                <a href="#vision" className="rounded-full border-2 border-white/70 px-8 py-3 font-semibold text-white transition hover:bg-white/20">Learn More</a>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => goSlide(slide - 1)} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-3 text-2xl text-white backdrop-blur transition hover:bg-white/40">&#8249;</button>
        <button onClick={() => goSlide(slide + 1)} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-3 text-2xl text-white backdrop-blur transition hover:bg-white/40">&#8250;</button>
        <div className="absolute bottom-8 z-10 flex w-full justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)} className={`h-2.5 rounded-full transition-all ${i === slide ? 'w-8 bg-white' : 'w-2.5 bg-white/50'}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative z-10 -mt-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-4 rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-100 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-4xl font-extrabold text-transparent">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ============ ABOUT ============ */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-600">About Study Point</span>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-5xl">A Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Learning</span> Ecosystem</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Study Point is a modern, all-in-one platform for coaching institutes that streamlines teaching and
            empowers students, teachers, parents and administrators with everything they need to succeed.
          </p>
        </div>
      </section>

      {/* ============ VISION & MISSION ============ */}
      <section id="vision" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="group rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white shadow-xl transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">🔭</div>
            <h3 className="mt-5 text-2xl font-bold">Our Vision</h3>
            <p className="mt-3 text-white/90">
              To create a world where quality education is accessible to every learner, and where technology
              removes barriers so that talent, curiosity and hard work — not circumstance — determine success.
            </p>
          </div>
          <div className="group rounded-3xl bg-gradient-to-br from-fuchsia-600 to-rose-500 p-8 text-white shadow-xl transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">🎯</div>
            <h3 className="mt-5 text-2xl font-bold">Our Mission</h3>
            <p className="mt-3 text-white/90">
              To empower educators with intuitive tools and learners with rich resources, fostering engagement,
              transparency and measurable growth across every classroom we serve.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-fuchsia-100 px-4 py-1.5 text-sm font-semibold text-fuchsia-600">Features</span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-5xl">Everything You Need, Beautifully Unified</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="group rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-fuchsia-100 text-3xl transition group-hover:scale-110">{f.emoji}</div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============ QUOTATIONS / MISSION ============ */}
      <section id="mission" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">Words that Inspire</span>
          <div className="mt-8 text-6xl text-amber-300">&#10077;</div>
          <div key={quote} className="animate-[fadeIn_0.6s_ease]">
            <p className="mt-2 text-2xl font-light leading-relaxed text-white md:text-3xl">{QUOTES[quote].text}</p>
            <p className="mt-6 text-lg font-semibold text-amber-300">— {QUOTES[quote].author}</p>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {QUOTES.map((_, i) => (
              <button key={i} onClick={() => setQuote(i)} className={`h-2 rounded-full transition-all ${i === quote ? 'w-6 bg-amber-300' : 'w-2 bg-white/40'}`} aria-label={`Quote ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-600">Contact</span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">Let's Start Something Great</h2>
            <p className="mt-4 text-gray-600">Have questions about admissions, courses or how Study Point can transform your institute? We'd love to hear from you.</p>
            <div className="mt-6 space-y-3 text-gray-700">
              <p className="flex items-center gap-3"><span className="text-xl">📧</span> hello@studypoint.edu</p>
              <p className="flex items-center gap-3"><span className="text-xl">📞</span> +91 98765 43210</p>
              <p className="flex items-center gap-3"><span className="text-xl">📍</span> Knowledge Park, Learning City</p>
            </div>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input required placeholder="Your name" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              <input required type="email" placeholder="Your email" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              <textarea required rows={4} placeholder="Your message" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              <button className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01]">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-8 py-16 text-center text-white shadow-2xl">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
          <h2 className="text-3xl font-extrabold md:text-5xl">Ready to Transform Learning?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">Join Study Point today and give your students, teachers and parents a platform built for the future of education.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register" className="rounded-full bg-white px-8 py-3 font-semibold text-indigo-700 shadow-xl transition hover:scale-105">Create Free Account</Link>
            <Link to="/login" className="rounded-full border-2 border-white/70 px-8 py-3 font-semibold text-white transition hover:bg-white/20">I Already Have an Account</Link>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white">📘</span>
            <span className="text-lg font-extrabold text-gray-900">Study<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Point</span></span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="transition hover:text-indigo-600">{l.label}</a>
            ))}
          </nav>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Study Point. Made with 💜 for learning.</p>
        </div>
      </footer>
    </div>
  );
}

