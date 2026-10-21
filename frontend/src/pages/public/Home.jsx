import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiActivity,
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiClipboard,
  FiCreditCard,
  FiFileText,
  FiGlobe,
  FiHeart,
  FiMapPin,
  FiMessageCircle,
  FiMonitor,
  FiBell,
  FiPhone,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiVideo,
  FiZap,
} from 'react-icons/fi';
import founderPhoto from '../../assets/ujjwal PhotoCollegeUniform.jpeg';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import '../../styles/home.css';

const CONTACT = {
  phone: '8294823430',
  phoneDisplay: '+91 82948 23430',
  email: 'studypoint.ujjwal@gmail.com',
  address: 'Bindapathar, Jamtara, Jharkhand — 815351',
};

const TRUST_POINTS = [
  { icon: <FiBookOpen />, title: 'Class 1–12 education', detail: 'Learning support from foundational years to senior secondary.' },
  { icon: <FiGlobe />, title: 'Hindi & English medium', detail: 'A welcoming learning experience for both language groups.' },
  { icon: <FiZap />, title: 'Science-focused learning', detail: 'PCM and PCB pathways with clear academic foundations.' },
  { icon: <FiUsers />, title: 'Parent monitoring', detail: 'Keep up with attendance, fees, assignments, and progress.' },
  { icon: <FiMonitor />, title: 'Offline & hybrid support', detail: 'Classroom teaching connected with useful digital tools.' },
  { icon: <FiAward />, title: 'Expert academic guidance', detail: 'Support for school learning, scholarships, and entrance goals.' },
];

const JOURNEY = [
  { grade: 'Classes 1–5', title: 'Foundation Learning', description: 'Build confidence in core concepts, language, and learning habits.', icon: <FiBookOpen /> },
  { grade: 'Classes 6–8', title: 'Concept Building', description: 'Strengthen understanding and prepare for more advanced subjects.', icon: <FiTarget /> },
  { grade: 'Classes 9–10', title: 'Board Preparation', description: 'Develop strong subject knowledge and exam readiness.', icon: <FiClipboard /> },
  { grade: 'Classes 11–12', title: 'Science Academy', description: 'Choose PCM or PCB and study with a focused academic plan.', icon: <FiActivity /> },
  { grade: 'Career preparation', title: 'Prepare for what’s next', description: 'Build foundations for JEE, NEET, NDA, and scholarship examinations.', icon: <FiAward /> },
];

const PROGRAMS = [
  {
    icon: <FiBookOpen />,
    title: 'Foundation Wing',
    level: 'Classes 1–5',
    description: 'Nurture curiosity, core skills, and confidence through guided school learning.',
    benefits: ['Strong fundamentals', 'Supportive teaching'],
    accent: 'blue',
  },
  {
    icon: <FiTarget />,
    title: 'Middle School Wing',
    level: 'Classes 6–8',
    description: 'Build clear concepts and steady learning habits across school subjects.',
    benefits: ['Concept-focused lessons', 'Regular practice'],
    accent: 'violet',
  },
  {
    icon: <FiAward />,
    title: 'Board Excellence',
    level: 'Classes 9–10',
    description: 'Prepare for board exams with structured lessons, revision, and assessment.',
    benefits: ['Chapter-wise learning', 'Exam practice'],
    accent: 'amber',
  },
  {
    icon: <FiZap />,
    title: 'PCM Science Program',
    level: 'Classes 11–12',
    description: 'Explore Physics, Chemistry, and Mathematics with guided problem-solving.',
    benefits: ['Physics · Chemistry · Maths', 'JEE foundations'],
    accent: 'blue',
  },
  {
    icon: <FiHeart />,
    title: 'PCB Science Program',
    level: 'Classes 11–12',
    description: 'Study Physics, Chemistry, and Biology with clear concepts and revision.',
    benefits: ['Physics · Chemistry · Biology', 'NEET foundations'],
    accent: 'rose',
  },
  {
    icon: <FiStar />,
    title: 'Scholarship Preparation',
    level: 'Navodaya · Natarhat · Eklavya',
    description: 'Practice key skills for scholarship and residential school entrance exams.',
    benefits: ['Focused preparation', 'Practice and revision'],
    accent: 'green',
  },
  {
    icon: <FiTarget />,
    title: 'JEE Foundation',
    level: 'Early competitive preparation',
    description: 'Start building analytical thinking and problem-solving step by step.',
    benefits: ['Strong science basics', 'Guided problem-solving'],
    accent: 'violet',
  },
  {
    icon: <FiActivity />,
    title: 'NEET Foundation',
    level: 'Early medical preparation',
    description: 'Grow a strong base in science with practice, revision, and support.',
    benefits: ['Clear core concepts', 'Regular topic practice'],
    accent: 'amber',
  },
];

const PARENT_FEATURES = [
  { icon: <FiCalendar />, label: 'Attendance tracking', value: 'Class attendance' },
  { icon: <FiCreditCard />, label: 'Fee management', value: 'Fee status & payments' },
  { icon: <FiFileText />, label: 'Homework & assignments', value: 'Assignments to complete' },
  { icon: <FiAward />, label: 'Exam results', value: 'Results & assessments' },
  { icon: <FiBell />, label: 'Notifications & notices', value: 'School updates' },
  { icon: <FiMessageCircle />, label: 'Parent-teacher communication', value: 'Stay connected' },
  { icon: <FiCalendar />, label: 'Parent meeting updates', value: 'Meeting reminders' },
  { icon: <FiTrendingUp />, label: 'Progress monitoring', value: 'Learning progress' },
  { icon: <FiShield />, label: 'Secure student records', value: 'Student information' },
];

const STUDENT_FEATURES = [
  { icon: <FiBookOpen />, label: 'Study materials' },
  { icon: <FiClipboard />, label: 'Assignments' },
  { icon: <FiVideo />, label: 'Recorded lectures' },
  { icon: <FiTarget />, label: 'Practice tests' },
  { icon: <FiTrendingUp />, label: 'Performance analytics' },
  { icon: <FiAward />, label: 'Results & certificates' },
  { icon: <FiBell />, label: 'Notices' },
];

const HYBRID_MODES = [
  {
    icon: <FiUsers />,
    title: 'Offline learning',
    subtitle: 'A classroom with personal attention',
    features: ['Classroom teaching', 'Personal guidance', 'Teacher interaction'],
    color: 'blue',
  },
  {
    icon: <FiMonitor />,
    title: 'Digital support',
    subtitle: 'Stay connected to your learning',
    features: ['Notes & assignments', 'Notices & updates', 'Parent portal'],
    color: 'amber',
  },
  {
    icon: <FiGlobe />,
    title: 'Online learning',
    subtitle: 'Practice and revise beyond class',
    features: ['Recorded content', 'Practice tests', 'Performance reports'],
    color: 'violet',
  },
];

const ADMISSIONS = [
  { label: 'Scholarship programs', items: ['Navodaya', 'Natarhat', 'Eklavya', 'NTSE'], icon: <FiAward />, color: 'amber' },
  { label: 'Career pathways', items: ['JEE', 'NEET', 'NDA'], icon: <FiTarget />, color: 'blue' },
];

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${light ? 'text-white' : ''}`}>
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? 'text-amber-300' : 'text-blue-700'}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? 'text-white' : 'text-slate-950'}`}>{title}</h2>
      {description && <p className={`mx-auto mt-4 max-w-xl leading-relaxed ${light ? 'text-blue-100/80' : 'text-slate-600'}`}>{description}</p>}
    </div>
  );
}

function DashboardPreview({ parent = false, hero = false }) {
  const features = hero
    ? [
      { icon: <FiCalendar />, label: 'Attendance', value: 'Class records' },
      { icon: <FiClipboard />, label: 'Assignments', value: 'Tasks & due dates' },
      { icon: <FiCreditCard />, label: 'Fees', value: 'Fee status' },
      { icon: <FiAward />, label: 'Results', value: 'Exam updates' },
      { icon: <FiBell />, label: 'Notices', value: 'School updates' },
    ]
    : parent
    ? PARENT_FEATURES.slice(0, 4)
    : [
      { icon: <FiBookOpen />, label: 'Study materials', value: 'Your learning library' },
      { icon: <FiClipboard />, label: 'Assignments', value: 'Tasks & due dates' },
      { icon: <FiVideo />, label: 'Recorded lectures', value: 'Continue learning' },
      { icon: <FiTarget />, label: 'Practice tests', value: 'Test your understanding' },
    ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-950/10">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${parent ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
            {parent ? <FiUsers className="h-4 w-4" /> : <FiBookOpen className="h-4 w-4" />}
          </span>
          <div>
            <p className="text-xs font-bold text-slate-900">{parent ? 'Parent Portal' : 'Student Portal'}</p>
            <p className="text-[10px] text-slate-500">Study Point dashboard</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Portal preview
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-3 sm:gap-3 sm:p-4">
        {features.map((feature, index) => (
          <div key={feature.label} className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">
                {React.cloneElement(feature.icon, { className: 'h-3.5 w-3.5' })}
              </span>
              <span className={`h-1.5 w-1.5 rounded-full ${index === 0 ? 'bg-emerald-500' : 'bg-blue-300'}`} />
            </div>
            <p className="mt-2 text-[11px] font-bold leading-tight text-slate-800">{feature.label}</p>
            <p className="mt-1 text-[9px] text-slate-500">{feature.value}</p>
          </div>
        ))}
      </div>
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 sm:mx-4 sm:mb-4">
        <FiBell className="h-3.5 w-3.5 shrink-0 text-blue-700" />
        <p className="text-[10px] font-medium text-blue-900">{parent ? 'Notices and progress updates in one place' : hero ? 'Attendance, academics, and school updates together' : 'Learning resources at your fingertips'}</p>
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.home-reveal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    if (prefersReducedMotion) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-700">
      <Header />

      <main>
        <section id="home" className="relative isolate overflow-hidden bg-slate-50">
          <div className="absolute -right-28 -top-36 -z-10 h-[28rem] w-[28rem] rounded-full bg-blue-200/45 blur-3xl" />
          <div className="absolute -bottom-44 left-1/3 -z-10 h-[25rem] w-[25rem] rounded-full bg-amber-100/70 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.95fr] lg:gap-16 lg:py-24">
            <div className="home-reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/85 px-4 py-2 text-xs font-bold text-blue-800 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                One platform for every learner
              </span>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.03] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Foundation <span className="text-blue-700">to Future.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Quality education for students from Class 1 to 12 through structured learning, expert guidance, and technology-enabled learning support.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Hindi & English Medium', 'Offline & Hybrid Learning', 'Parent & Student Portal', 'PCM & PCB Science'].map((highlight) => (
                  <span key={highlight} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700">
                    <FiCheck className="h-3.5 w-3.5 text-amber-600" /> {highlight}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs font-medium text-slate-500">
                Assignments, attendance & fee management · JEE, NEET & scholarship preparation
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/courses" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                  Explore Programs <FiArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                  Contact Us <FiArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-9 flex items-center gap-3 border-t border-slate-200 pt-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700"><FiUsers className="h-5 w-5" /></span>
                <p className="text-xs leading-relaxed text-slate-500">
                  <span className="block font-bold text-slate-800">Students, parents, teachers — connected.</span>
                  Learning and school updates in one place.
                </p>
              </div>
            </div>

            <div className="home-reveal relative mx-auto w-full max-w-xl lg:justify-self-end">
              <div className="absolute -right-5 top-8 h-44 w-44 rounded-full bg-blue-300/30 blur-3xl" />
              <div className="absolute -bottom-5 -left-5 h-40 w-40 rounded-full bg-amber-300/30 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white bg-white/70 p-3 shadow-2xl shadow-blue-950/10 backdrop-blur-sm sm:p-5">
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
                    alt="Teacher supporting students in a classroom"
                    className="h-[250px] w-full object-cover sm:h-[360px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/45 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-xl border border-white/30 bg-white/90 px-3 py-2 backdrop-blur sm:bottom-5 sm:left-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Every learner matters</p>
                    <p className="mt-0.5 text-sm font-extrabold text-slate-900">Learn. Practice. Progress.</p>
                  </div>
                </div>
                <div className="relative mx-auto -mt-5 w-[94%] sm:-mt-8">
                  <DashboardPreview hero />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="trust" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="home-reveal">
              <SectionHeading
                eyebrow="One connected learning community"
                title="Everything Students Need. Everything Parents Expect."
                description="Strong academics, thoughtful guidance, and school-life essentials connected in one platform."
              />
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TRUST_POINTS.map((point, index) => (
                <article key={point.title} className="home-reveal group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5 sm:p-6" style={{ '--reveal-delay': `${(index % 3) * 65}ms` }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                    {React.cloneElement(point.icon, { className: 'h-5 w-5' })}
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{point.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="academic-journey" className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="home-reveal">
              <SectionHeading
                eyebrow="From first steps to future goals"
                title="One Journey. Endless Opportunities."
                description="A learning pathway that grows with students, from early foundations to senior science and career preparation."
              />
            </div>
            <ol className="home-journey mt-12 grid gap-4 md:grid-cols-5">
              {JOURNEY.map((step, index) => (
                <li key={step.grade} className="home-reveal relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" style={{ '--reveal-delay': `${index * 55}ms` }}>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">{React.cloneElement(step.icon, { className: 'h-5 w-5' })}</span>
                    <span className="text-xs font-extrabold tracking-widest text-blue-100">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-700">{step.grade}</p>
                  <h3 className="mt-1 font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{step.description}</p>
                  {index === 3 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <span className="rounded-lg bg-blue-50 px-2 py-1.5 text-center text-[10px] font-bold text-blue-800">PCM</span>
                      <span className="rounded-lg bg-amber-50 px-2 py-1.5 text-center text-[10px] font-bold text-amber-800">PCB</span>
                    </div>
                  )}
                  {index === 4 && <p className="mt-4 text-[10px] font-bold text-slate-500">JEE · NEET · NDA</p>}
                </li>
              ))}
            </ol>
            <div className="home-reveal mt-5 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">PCM: Physics · Chemistry · Mathematics</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">PCB: Physics · Chemistry · Biology</span>
            </div>
          </div>
        </section>

        <section id="programs" className="scroll-mt-24 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="home-reveal">
              <SectionHeading
                eyebrow="Programs for every stage"
                title="Programs Designed for Every Stage of Learning"
                description="Choose a school learning pathway, science program, or focused preparation for scholarship and entrance examinations."
              />
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PROGRAMS.map((program, index) => (
                <article key={program.title} className={`home-reveal home-course-card home-course-${program.accent}`} style={{ '--reveal-delay': `${(index % 4) * 55}ms` }}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">{React.cloneElement(program.icon, { className: 'h-5 w-5' })}</span>
                    <span className="max-w-[60%] rounded-full bg-white/85 px-2.5 py-1 text-right text-[10px] font-bold text-slate-600">{program.level}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{program.title}</h3>
                  <p className="mt-2 min-h-[3rem] text-xs leading-relaxed text-slate-600">{program.description}</p>
                  <ul className="mt-4 grid gap-2">
                    {program.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-[11px] font-medium text-slate-600">
                        <FiCheckCircle className="h-3.5 w-3.5 shrink-0 text-blue-700" /> {benefit}
                      </li>
                    ))}
                  </ul>
                  <Link to="/courses" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-blue-700 transition hover:gap-3">
                    Learn more <FiArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              ))}
            </div>
            <div className="home-reveal mt-9 text-center">
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800">
                View all programs <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="parent-portal" className="overflow-hidden bg-blue-950 py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="home-reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-100">
                <FiUsers className="h-4 w-4 text-amber-300" /> Parent portal
              </span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Stay Connected With Your Child’s Progress</h2>
              <p className="mt-4 leading-relaxed text-blue-100/75">
                One place to follow the school details parents care about—from attendance and assignments to fee updates and exam results.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-3">
                {PARENT_FEATURES.map((feature) => (
                  <span key={feature.label} className="flex items-start gap-2 text-xs font-medium leading-relaxed text-blue-50/90">
                    <FiCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" /> {feature.label}
                  </span>
                ))}
              </div>
              <Link to="/login" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-900 transition hover:bg-blue-50">
                Parent login <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="home-reveal relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-4 rounded-[2rem] bg-blue-400/15 blur-2xl" />
              <div className="relative rotate-1 rounded-3xl border border-white/15 bg-white p-3 shadow-2xl sm:p-5">
                <DashboardPreview parent />
              </div>
              <div className="absolute -bottom-4 -left-2 flex items-center gap-2 rounded-xl border border-white/80 bg-white px-3 py-2 shadow-xl sm:-left-8">
                <FiShield className="h-4 w-4 text-emerald-600" />
                <span className="text-[10px] font-bold text-slate-800">Student information, organized</span>
              </div>
            </div>
          </div>
        </section>

        <section id="hybrid-learning" className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="home-reveal">
              <SectionHeading
                eyebrow="Learning beyond one place"
                title="A connected hybrid learning model"
                description="Classroom learning and digital tools work together to support lessons, practice, and parent communication."
              />
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {HYBRID_MODES.map((mode, index) => (
                <article key={mode.title} className={`home-reveal home-mode-card home-mode-${mode.color}`} style={{ '--reveal-delay': `${index * 75}ms` }}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">{React.cloneElement(mode.icon, { className: 'h-6 w-6' })}</span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-700">{mode.subtitle}</p>
                  <h3 className="mt-1 text-xl font-extrabold text-slate-950">{mode.title}</h3>
                  <ul className="mt-5 grid gap-3">
                    {mode.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600"><FiCheckCircle className="h-4 w-4 text-blue-700" /> {feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="student-portal" className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="home-reveal order-2 lg:order-1">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 shadow-lg sm:p-5">
                <DashboardPreview />
                <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { icon: <FiTrendingUp />, label: 'Performance' },
                    { icon: <FiAward />, label: 'Results' },
                    { icon: <FiFileText />, label: 'Certificates' },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-3 text-center text-[9px] font-bold text-slate-600 sm:flex-row sm:justify-center sm:text-[10px]">
                      {React.cloneElement(item.icon, { className: 'h-4 w-4 text-blue-700' })}{item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="home-reveal order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800">
                <FiBookOpen className="h-4 w-4" /> Student portal
              </span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Smart Learning for Students</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Keep study resources, classwork, practice, and school updates close at hand—with one simple student learning space.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {STUDENT_FEATURES.map((feature) => (
                  <span key={feature.label} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">{React.cloneElement(feature.icon, { className: 'h-3.5 w-3.5' })}</span>
                    {feature.label}
                  </span>
                ))}
              </div>
              <Link to="/login" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800">
                Student login <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="opportunities" className="bg-amber-50/60 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="home-reveal">
              <SectionHeading
                eyebrow="Beyond the classroom"
                title="Preparing Students for Bigger Opportunities"
                description="Build a strong academic base and prepare for scholarship opportunities and future career pathways."
              />
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
              {ADMISSIONS.map((group, index) => (
                <article key={group.label} className="home-reveal rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" style={{ '--reveal-delay': `${index * 80}ms` }}>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${group.color === 'amber' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
                    {React.cloneElement(group.icon, { className: 'h-6 w-6' })}
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-slate-950">{group.label}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">{item}</span>
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-slate-500">
                    {group.color === 'amber'
                      ? 'Focused practice and learning support for scholarship and school entrance preparation.'
                      : 'A structured foundation for students exploring engineering, medicine, and defence careers.'}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="director" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="home-reveal grid overflow-hidden rounded-[2rem] bg-blue-950 text-white shadow-2xl shadow-blue-950/15 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative min-h-[340px] bg-blue-900 sm:min-h-[440px]">
                <img src={founderPhoto} alt="Ujjwal Mandal, Founder and Director of Study Point" className="absolute inset-0 h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 rounded-xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-md sm:bottom-7 sm:left-7">
                  <p className="text-sm font-bold">Ujjwal Mandal</p>
                  <p className="mt-0.5 text-xs text-white/75">Founder & Director</p>
                </div>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">A message from our director</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Meet Our Founder</h2>
                <p className="mt-2 text-sm font-semibold text-blue-100">B.Tech Computer Science & Engineering</p>
                <blockquote className="mt-6 border-l-4 border-amber-400 bg-white/5 p-5 text-base leading-relaxed text-blue-50/90 sm:p-6">
                  “Education is not only about completing a syllabus. It is about building confidence, discipline, and the ability to solve problems. Our mission is to help students learn, grow, and achieve their goals through quality education and continuous support.”
                </blockquote>
                <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-5">
                  <span className="font-serif text-2xl italic text-amber-300">Ujjwal Mandal</span>
                  <Link to="/about" className="inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-amber-300">
                    Our story <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="home-reveal">
              <SectionHeading
                eyebrow="Find us"
                title="Visit Study Point"
                description="We welcome students and families to connect with our team and learn more about our programs."
              />
            </div>
            <div className="home-reveal mt-10 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg md:grid-cols-[1.15fr_0.85fr]">
              <div className="min-h-[280px] bg-slate-200 sm:min-h-[360px]">
                <iframe
                  title="Map to Study Point in Jamtara, Jharkhand"
                  src="https://maps.google.com/maps?q=Bindapathar%2C%20Jamtara%2C%20Jharkhand%20815351&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  className="h-full min-h-[280px] w-full border-0 sm:min-h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-9">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><FiMapPin className="h-6 w-6" /></span>
                <h3 className="mt-5 text-xl font-extrabold text-slate-950">Study Point, Jamtara</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{CONTACT.address}</p>
                <a href={`tel:${CONTACT.phone}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-700">
                  <FiPhone className="h-4 w-4 text-blue-700" /> {CONTACT.phoneDisplay}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-700">
                  <FiMessageCircle className="h-4 w-4 text-blue-700" /> {CONTACT.email}
                </a>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <a href={`tel:${CONTACT.phone}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800">
                    Call us <FiArrowUpRight className="h-4 w-4" />
                  </a>
                  <a href={`https://wa.me/91${CONTACT.phone}`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100">
                    WhatsApp <FiMessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 sm:px-8 sm:pb-24">
          <div className="home-reveal relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-800 via-blue-700 to-blue-950 px-6 py-14 text-center text-white shadow-2xl shadow-blue-900/20 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[40px] border-white/5" />
            <div className="pointer-events-none absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-amber-300 backdrop-blur"><FiHeart className="h-6 w-6" /></span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Start Your Learning Journey Today</h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-blue-100/85">
                Supporting students from Class 1 to 12 through quality education, mentorship, and modern learning tools.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/courses" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-blue-950 transition hover:-translate-y-0.5 hover:bg-amber-300">
                  Explore Programs <FiArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20">
                  Contact Us <FiArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer hideLocation />
    </div>
  );
}
