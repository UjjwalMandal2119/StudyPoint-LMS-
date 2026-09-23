import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiUser, FiPlus, FiMinus, FiCheck, FiArrowRight, FiX, FiMenu } from 'react-icons/fi';
import founderPhoto from '../../assets/ujjwal PhotoCollegeUniform.jpeg';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Features', href: '#features' },
  { label: 'Founder', href: '#founder' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const IMG = {
  hero: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80',
  about: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
  classroom: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
  dashboard: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
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
  { value: '1,000+', label: 'Active Students' },
  { value: '95%', label: 'Success Rate' },
  { value: '500+', label: 'Video Lectures' },
  { value: '50+', label: 'Mock Tests' },
];

const FEATURES = [
  { icon: '💻', title: 'Live & Recorded Classes', desc: 'Interactive online sessions with clear concepts and recorded backups for easy revision.' },
  { icon: '📅', title: 'Structured Batches', desc: 'Well-organized batch timetables ensuring completion of syllabus on time.' },
  { icon: '📝', title: 'Assignments & Practice Sets', desc: 'Regular homework, topic-wise practice sets, and detailed exercise solutions.' },
  { icon: '❓', title: 'Online Tests & Quizzes', desc: 'Subject-wise quizzes and full-length mock exams with instant score reports.' },
  { icon: '📈', title: 'Performance Analytics', desc: 'Individual progress tracking to identify strengths and areas that need improvement.' },
  { icon: '📚', title: 'Comprehensive Study Material', desc: 'High-quality curated notes, PDFs, and key formula guides available anytime.' },
  { icon: '💬', title: 'Dedicated Doubt Sessions', desc: 'Interactive chat and live forums to solve student queries without delay.' },
  { icon: '🔔', title: 'Regular Exam Updates', desc: 'Instant notifications regarding batch schedules, test dates, and announcements.' },
  { icon: '🛡️', title: 'Parent-Teacher Updates', desc: 'Transparent attendance and score reports shared directly with parents.' },
];

const STEPS = [
  { n: '01', title: 'Choose Your Course', desc: 'Browse through our available academic and competitive coaching programs.' },
  { n: '02', title: 'Get Enrolled', desc: 'Create your student account, complete registration, and join your designated batch.' },
  { n: '03', title: 'Learn & Excel', desc: 'Attend live classes, practice mock tests, solve doubts, and boost your results.' },
];

const TESTIMONIALS = [
  { quote: 'Study Point helped me clear my core concepts effortlessly. The online test series and revision notes made exam preparation stress-free.', name: 'Rahul Sharma', role: 'Student' },
  { quote: 'The structured batch schedule and personalized doubt support make online learning super effective and engaging.', name: 'Priya Verma', role: 'Student' },
  { quote: 'As a parent, I can monitor my child’s class attendance and mock test performances right from home. Very reliable coaching!', name: 'Sunita Devi', role: 'Parent' },
];

const FAQS = [
  { q: 'What is Study Point?', a: 'Study Point is an online coaching institute providing structured online classes, study materials, mock tests, and personalized mentorship to help students excel academically.' },
  { q: 'How do I join a course or batch?', a: 'Click on "Get Started" or "Create Free Account", complete your student registration, select your desired course/batch, and begin learning.' },
  { q: 'Are recorded classes available if I miss a live lecture?', a: 'Yes! All live sessions are recorded and made available in your student dashboard for revision anytime.' },
  { q: 'Can I access Study Point on mobile devices?', a: 'Absolutely. Study Point is fully responsive and works smoothly on smartphones, tablets, and desktop computers.' },
  { q: 'How can I contact Study Point for admission queries?', a: 'You can visit our center at Bindapathar, Jamtara, Jharkhand, call us at +91 82948 23430, or email studypoint.ujjwal@gmail.com.' },
];

const VALUES = [
  { icon: '🎯', title: 'Our Vision', desc: 'To provide affordable, high-quality online coaching and guidance to every student.' },
  { icon: '🚀', title: 'Our Mission', desc: 'To simplify complex topics through innovative teaching methods and structured test practice.' },
  { icon: '💎', title: 'Our Core Values', desc: 'Academic discipline, continuous improvement, and unwavering support for every student.' },
];

export default function Home() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToId = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const header = document.querySelector('header');
      const offset = header ? header.offsetHeight + 12 : 0;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleNav = (e, href) => {
    e.preventDefault();
    scrollToId(href.replace('#', ''));
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-700">
      {/* ============ ANNOUNCEMENT BAR ============ */}
      <div className="bg-navy-dark text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-2 text-xs sm:justify-between sm:px-8">
          <p className="flex items-center gap-2">🎓 Admissions Open for New Batches — Bindapathar, Jamtara, Jharkhand</p>
          <a href="#contact" onClick={(e) => handleNav(e, '#contact')} className="hidden items-center gap-2 font-medium sm:flex">
            <FiPhone className="h-3.5 w-3.5 text-accent-amber" />
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>

      {/* ============ NAVBAR ============ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${navSolid ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-white shadow-sm'}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <a href="#home" onClick={(e) => handleNav(e, '#home')} className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy-primary to-navy-hover text-lg text-white shadow-lg">🎓</span>
            <span className="text-xl font-extrabold tracking-tight text-navy-dark">
              Study<span className="text-navy-hover">Point</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={(e) => handleNav(e, l.href)} className="text-sm font-medium text-slate-600 transition hover:text-navy-primary">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/login" className="text-sm font-semibold text-navy-primary transition hover:text-navy-hover">Login</Link>
            <Link to="/register" className="rounded-full bg-gradient-to-r from-navy-primary to-navy-hover px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105">
              Enroll Now
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-navy-dark lg:hidden" aria-label="Toggle menu">
            {mobileOpen ? <FiX className="h-7 w-7" /> : <FiMenu className="h-7 w-7" />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="border-t border-lms-border bg-white px-6 py-4 lg:hidden">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={(e) => { handleNav(e, l.href); setMobileOpen(false); }} className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-navy-primary/5">
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex gap-3">
              <Link to="/login" className="flex-1 rounded-lg border border-navy-primary/30 py-2 text-center text-sm font-semibold text-navy-primary">Login</Link>
              <Link to="/register" className="flex-1 rounded-lg bg-navy-primary py-2 text-center text-sm font-semibold text-white">Enroll Now</Link>
            </div>
          </div>
        )}
      </header>

      {/* ============ HERO ============ */}
      <section id="home" className="relative overflow-hidden bg-navy-dark">
        <img src={IMG.hero} alt="Students preparing for exams at Study Point" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 to-navy-primary/50" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-amber/40 bg-accent-amber/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-amber">
              🎓 Online Coaching & Test Series
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Empowering Students for{' '}
              <span className="bg-gradient-to-r from-navy-hover to-accent-amber bg-clip-text text-transparent">Academic Success</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Welcome to Study Point! We provide high-quality online classes, comprehensive study materials, regular mock tests, and individual doubt-solving to help you achieve your learning goals.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#about" onClick={(e) => handleNav(e, '#about')} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-navy-primary to-navy-hover px-7 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-105">
                Explore Courses
                <FiArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" onClick={(e) => handleNav(e, '#contact')} className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                Contact Director
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/70">
              <span className="flex items-center gap-2"><FiCheck className="h-4 w-4 text-accent-amber" /> Live & Recorded Classes</span>
              <span className="flex items-center gap-2"><FiCheck className="h-4 w-4 text-accent-amber" /> Online Mock Tests</span>
              <span className="flex items-center gap-2"><FiCheck className="h-4 w-4 text-accent-amber" /> Personal Doubt Clearing</span>
            </div>
          </div>

          <div className="relative">
            <img src={IMG.dashboard} alt="Study Point online learning dashboard" className="w-full rounded-3xl border border-white/15 object-cover shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-5 shadow-lift sm:block">
              <p className="text-2xl font-extrabold text-navy-primary">98%</p>
              <p className="text-xs font-medium text-slate-500">Student Satisfaction</p>
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

      {/* ============ ABOUT ============ */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img src={IMG.about} alt="About Study Point online coaching" className="w-full rounded-3xl object-cover shadow-2xl" />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-navy-primary px-6 py-5 text-white shadow-lift sm:block">
              <p className="text-3xl font-extrabold">100%</p>
              <p className="text-xs uppercase tracking-wider text-white/80">Dedicated Mentorship</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">About Study Point</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">Your Trusted Online Coaching Destination</h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Study Point was founded with a clear goal: to make high-quality, concept-driven education accessible to students everywhere. We combine structured online teaching with continuous testing and doubt clearing so every learner can reach their potential.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Interactive live lectures & recordings', 'Regular mock exams & performance analytics', 'Chapter-wise PDF notes & exercise solutions', 'One-on-one doubt clearing sessions'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-status-easy-bg text-status-easy-text">
                    <FiCheck className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <a href="#features" onClick={(e) => handleNav(e, '#features')} className="mt-8 inline-flex items-center gap-2 rounded-lg border border-navy-primary px-6 py-3 text-sm font-semibold text-navy-primary transition hover:bg-navy-primary hover:text-white">
              Explore Our Features
              <FiArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="bg-lms-bg py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Why Study With Us</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">Everything You Need To Rank Higher</h2>
            <p className="mt-4 text-slate-600">Designed to make learning engaging, structured, and result-oriented.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-lms-border bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-navy-primary/30 hover:shadow-lift">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-primary/10 text-2xl transition group-hover:scale-110">{f.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-navy-dark">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">How It Works</p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">Start Learning in Three Simple Steps</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-lms-border bg-white p-7 shadow-card">
              <span className="absolute -top-5 left-7 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy-primary to-navy-hover text-sm font-extrabold text-white shadow-lg">{s.n}</span>
              <h3 className="mt-6 text-xl font-bold text-navy-dark">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FOUNDER & DIRECTOR ============ */}
      <section id="founder" className="bg-navy-dark py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-3xl border border-white/15 p-3">
                <img src={IMG.founder} alt="Ujjwal Mandal, Founder & Director of Study Point" className="w-full rounded-2xl object-cover" />
              </div>
            </div>
            <div className="lg:col-span-3">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-amber">Founder's Vision</p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Founder & Director</h2>
              <h3 className="mt-6 text-2xl font-extrabold">Ujjwal Mandal</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-navy-hover">Founder & Lead Educator</p>
              <div className="mt-6 border-l-4 border-accent-amber bg-white/5 p-6">
                <p className="text-lg font-semibold italic text-white">“A Message to Our Students”</p>
                <p className="mt-3 leading-relaxed text-white/85">
                  Education has the power to transform lives. At Study Point, my mission is to give every student clear concept clarity, consistent guidance, and the right technical tools to succeed in their academic journey. Together, let's turn effort into achievement.
                </p>
                <p className="mt-4 text-sm font-bold">— Ujjwal Mandal, Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section id="testimonials" className="bg-lms-bg py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Testimonials</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">What Our Students & Parents Say</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-lms-border bg-white p-7 shadow-card">
                <div className="flex gap-1 text-accent-amber">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-slate-600">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-primary/10 font-bold text-navy-primary">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-dark">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VISION / MISSION / VALUES ============ */}
      <section id="vision" className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Our Foundation</p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">Vision, Mission & Values</h2>
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

      {/* ============ FAQ ============ */}
      <section id="faq" className="bg-lms-bg py-20">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">FAQ</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-xl border border-lms-border bg-white shadow-card">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-navy-dark transition hover:bg-lms-bg"
                >
                  {f.q}
                  {openFaq === i ? <FiMinus className="h-5 w-5 shrink-0 text-navy-hover" /> : <FiPlus className="h-5 w-5 shrink-0 text-navy-hover" />}
                </button>
                {openFaq === i && (
                  <p className="border-t border-lms-border px-6 py-4 text-sm leading-relaxed text-slate-600">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Get In Touch</p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">Contact Study Point</h2>
          <p className="mt-4 text-slate-600">Have questions about admissions, batches, or courses? Reach out to us directly!</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-2xl border border-lms-border bg-white p-6 shadow-card">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-primary text-white"><FiMapPin className="h-5 w-5" /></span>
                <div>
                  <p className="font-bold text-navy-dark">Address</p>
                  <p className="mt-1 text-sm text-slate-600">{CONTACT.address}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-lms-border bg-white p-6 shadow-card">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-primary text-white"><FiMail className="h-5 w-5" /></span>
                <div>
                  <p className="font-bold text-navy-dark">Email</p>
                  <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-sm text-navy-hover hover:underline">{CONTACT.email}</a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-lms-border bg-white p-6 shadow-card">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-primary text-white"><FiPhone className="h-5 w-5" /></span>
                <div>
                  <p className="font-bold text-navy-dark">Phone / WhatsApp</p>
                  <a href={`tel:${CONTACT.phone}`} className="mt-1 block text-sm text-navy-hover hover:underline">{CONTACT.phoneDisplay}</a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-accent-amber/40 bg-accent-amber/5 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-amber text-white"><FiUser className="h-5 w-5" /></span>
                <div>
                  <p className="font-bold text-navy-dark">Founder & Director</p>
                  <p className="mt-1 text-sm text-slate-700">{CONTACT.founder}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-lms-border bg-white p-8 shadow-xl lg:col-span-3">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Your Full Name" className="input" />
                <input required type="email" placeholder="Your Email Address" className="input" />
              </div>
              <input required type="tel" placeholder="Mobile / WhatsApp Number" className="input" />
              <textarea required rows={5} placeholder="Which course or batch are you interested in?" className="input" />
              <button className="w-full rounded-xl bg-gradient-to-r from-navy-primary to-navy-hover py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01]">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-navy-primary via-navy-primary to-navy-hover px-8 py-16 text-center text-white shadow-2xl">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-accent-amber/20 blur-2xl" />
          <h2 className="text-3xl font-extrabold md:text-5xl">Ready to Excel in Your Exams?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">Enroll with Study Point today and get direct access to top-notch online lectures, mock tests, and study notes.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register" className="rounded-full bg-white px-8 py-3 font-semibold text-navy-primary shadow-xl transition hover:scale-105">Create Account</Link>
            <Link to="/login" className="rounded-full border-2 border-white/70 px-8 py-3 font-semibold text-white transition hover:bg-white/20">I Already Have an Account</Link>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-navy-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-navy-primary to-navy-hover text-white">🎓</span>
                <span className="text-lg font-extrabold">Study<span className="text-navy-hover">Point</span></span>
              </div>
              <p className="mt-4 max-w-xs text-sm text-white/70">Online coaching institute committed to excellence, concept clarity, and academic success.</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-white/80">Quick Links</p>
              <nav className="mt-4 grid gap-2 text-sm">
                {NAV_LINKS.map((l) => (
                  <a key={l.label} href={l.href} onClick={(e) => handleNav(e, l.href)} className="text-white/70 transition hover:text-white">{l.label}</a>
                ))}
              </nav>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-white/80">Student Portal</p>
              <nav className="mt-4 grid gap-2 text-sm">
                <Link to="/login" className="text-white/70 transition hover:text-white">Login</Link>
                <Link to="/register" className="text-white/70 transition hover:text-white">New Admission</Link>
                <Link to="/about" className="text-white/70 transition hover:text-white">About Us</Link>
                <Link to="/contact" className="text-white/70 transition hover:text-white">Contact</Link>
              </nav>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-white/80">Contact</p>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                <p className="flex items-start gap-2"><FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-amber" /> {CONTACT.address}</p>
                <p className="flex items-center gap-2"><FiMail className="h-4 w-4 shrink-0 text-accent-amber" /> {CONTACT.email}</p>
                <p className="flex items-center gap-2"><FiPhone className="h-4 w-4 shrink-0 text-accent-amber" /> {CONTACT.phoneDisplay}</p>
                <p className="flex items-center gap-2"><FiUser className="h-4 w-4 shrink-0 text-accent-amber" /> Director: {CONTACT.founder}</p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row">
            <p>© {new Date().getFullYear()} Study Point. All rights reserved.</p>
            <p>Empowering Students through Quality Online Education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}