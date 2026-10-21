import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiActivity,
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiCheck,
  FiClipboard,
  FiFileText,
  FiLayers,
  FiMonitor,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi';
import AnnouncementBar from '../../components/layout/header/AnnouncementBar';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import {
  AdmissionTimeline,
  FAQAccordion,
  LearningModeCard,
  ProgramCard,
  ScholarshipCard,
} from '../../components/academics/AcademicsComponents';
import { listPublicPrograms } from '../../services/public-program.service';
import '../../styles/academics.css';

const CONTACT = {
  phone: '8294823430',
  phoneDisplay: '+91 82948 23430',
};

const CATALOG = [
  {
    id: 'foundation',
    matches: ['foundation', 'foundationprogram', 'foundationwing'],
    title: 'Foundation Program',
    wing: 'Foundation Wing',
    classes: 'Classes 1–5',
    icon: <FiBookOpen />,
    accent: 'blue',
    description: 'Build strong academic foundations, confidence, and positive study habits with supportive teaching.',
    mediums: ['Hindi', 'English'],
    modes: ['Offline'],
    duration: 'Academic session',
    subjects: ['Mathematics', 'English', 'Hindi', 'EVS', 'General Science'],
  },
  {
    id: 'middle-school',
    matches: ['middleschool', 'middleschoolprogram', 'middlewing'],
    title: 'Middle School Program',
    wing: 'Middle School Wing',
    classes: 'Classes 6–8',
    icon: <FiLayers />,
    accent: 'violet',
    description: 'Strengthen core concepts with guided practice and steady academic support.',
    mediums: ['Hindi', 'English'],
    modes: ['Offline', 'Hybrid'],
    duration: 'Academic session',
    subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'],
  },
  {
    id: 'board',
    matches: ['board', 'boardpreparation', 'boardpreparationprogram'],
    title: 'Board Preparation Program',
    wing: 'Board Preparation',
    classes: 'Classes 9–10',
    icon: <FiAward />,
    accent: 'amber',
    description: 'A structured plan for learning, practice, revision, and board examination readiness.',
    mediums: ['Hindi', 'English'],
    modes: ['Offline', 'Hybrid'],
    duration: 'Academic session',
    subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'],
  },
  {
    id: 'pcm',
    matches: ['pcm', 'pcmprogram', 'sciencepcm'],
    title: 'PCM Program',
    wing: 'Senior Secondary Science',
    classes: 'Classes 11–12',
    icon: <FiZap />,
    accent: 'blue',
    description: 'Learn senior secondary science with a focus on understanding and problem-solving.',
    mediums: ['Hindi', 'English'],
    modes: ['Offline', 'Hybrid'],
    duration: 'Academic session',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
  },
  {
    id: 'pcb',
    matches: ['pcb', 'pcbprogram', 'sciencepcb'],
    title: 'PCB Program',
    wing: 'Senior Secondary Science',
    classes: 'Classes 11–12',
    icon: <FiActivity />,
    accent: 'violet',
    description: 'Build a clear foundation in biology and physical sciences through guided learning.',
    mediums: ['Hindi', 'English'],
    modes: ['Offline', 'Hybrid'],
    duration: 'Academic session',
    subjects: ['Physics', 'Chemistry', 'Biology'],
  },
];

const SCHOLARSHIPS = [
  {
    name: 'Navodaya',
    description: 'Structured preparation for the Jawahar Navodaya entrance pathway.',
    eligibility: 'For students meeting the current exam notification criteria; confirm class and age requirements.',
    benefits: 'Develop exam familiarity and strengthen the school subjects assessed in the entrance process.',
    support: 'Focused subject practice, previous-year question familiarization, and exam strategy guidance.',
  },
  {
    name: 'Natarhat',
    description: 'Academic preparation for students interested in the Natarhat entrance examination.',
    eligibility: 'Eligibility can change by examination cycle; contact us to check the current notification.',
    benefits: 'Build relevant concepts and confidence through structured preparation and practice.',
    support: 'Guided concepts, practice material, and preparation planning for the relevant exam.',
  },
  {
    name: 'Eklavya',
    description: 'Preparation support for the Eklavya residential school entrance pathway.',
    eligibility: 'For students who meet the current official exam criteria.',
    benefits: 'Improve familiarity with exam-style questions and targeted subject practice.',
    support: 'Topic-wise practice, exam preparation guidance, and progress review.',
  },
  {
    name: 'NTSE Foundation',
    description: 'Build reasoning and subject foundations for scholarship-oriented preparation.',
    eligibility: 'For school students; the current examination availability and criteria should be confirmed.',
    benefits: 'Strengthen reasoning and subject foundations useful for scholarship-style assessments.',
    support: 'Concept building, reasoning practice, and test-based preparation support.',
  },
];

const COMPETITIVE = [
  {
    id: 'jee-foundation',
    title: 'JEE Foundation',
    audience: 'Advanced pathway for Classes 9–12',
    icon: <FiTarget />,
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    features: ['Problem solving', 'Concept building', 'Weekly tests'],
    accent: 'blue',
  },
  {
    id: 'neet-foundation',
    title: 'NEET Foundation',
    audience: 'Advanced pathway for Classes 9–12',
    icon: <FiActivity />,
    subjects: ['Physics', 'Chemistry', 'Biology'],
    features: ['Concept building', 'Biology focus', 'Mock tests'],
    accent: 'amber',
  },
];

const STUDENT_RECEIVES = [
  { icon: <FiFileText />, title: 'Printed notes' },
  { icon: <FiBookOpen />, title: 'PDF notes' },
  { icon: <FiClipboard />, title: 'Assignments' },
  { icon: <FiActivity />, title: 'Chapter tests' },
  { icon: <FiTarget />, title: 'Mock tests' },
  { icon: <FiTrendingUp />, title: 'Progress reports' },
  { icon: <FiUsers />, title: 'Parent updates' },
  { icon: <FiCheck />, title: 'Attendance tracking' },
  { icon: <FiAward />, title: 'Academic mentoring' },
  { icon: <FiArrowRight />, title: 'Doubt sessions' },
];

const LEARNING_MODES = [
  {
    title: 'Offline Learning',
    kicker: 'Learn together in the classroom',
    icon: <FiUsers />,
    accent: 'blue',
    features: ['Classroom experience', 'Direct teacher interaction', 'Personal guidance'],
  },
  {
    title: 'Hybrid Learning',
    kicker: 'Classroom learning with digital support',
    icon: <FiMonitor />,
    accent: 'amber',
    features: ['Offline classes and digital resources', 'Assignments and notices', 'Academic performance tracking'],
  },
];

const ADMISSION_STEPS = [
  { title: 'Choose a program', description: 'Explore classes, subjects, medium, and learning mode.' },
  { title: 'Submit an enquiry', description: 'Share the student’s class and program of interest.' },
  { title: 'Counselling', description: 'Discuss fit, availability, and learning support with our team.' },
  { title: 'Registration', description: 'Complete the admission process with guidance from Study Point.' },
  { title: 'Start learning', description: 'Begin classes and stay connected to academic progress.' },
];

const FAQS = [
  {
    question: 'Do you provide Hindi Medium classes?',
    answer: 'Hindi Medium learning is available across relevant programs. Contact us to confirm the medium for a specific class and current batch.',
  },
  {
    question: 'Do you provide English Medium classes?',
    answer: 'English Medium learning is available across relevant programs. Our team can help confirm availability for your class.',
  },
  {
    question: 'Are classes available offline?',
    answer: 'Yes. Offline classes are available. Some programs also offer hybrid learning support; availability depends on class and program.',
  },
  {
    question: 'Is hybrid learning available?',
    answer: 'Hybrid options are available for selected programs and combine offline classes with digital resources, assignments, notices, or academic updates.',
  },
  {
    question: 'What is included in the program?',
    answer: 'Program support may include notes, assignments, assessments, progress reports, parent updates, attendance tracking, academic mentoring, and doubt sessions.',
  },
  {
    question: 'Are scholarship programs available?',
    answer: 'Preparation pathways include Navodaya, Natarhat, Eklavya, and NTSE foundation support. Contact us for current program and examination details.',
  },
];

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? 'text-amber-300' : 'text-blue-700'}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? 'text-white' : 'text-slate-950'}`}>{title}</h2>
      {description && <p className={`mx-auto mt-4 max-w-xl leading-relaxed ${light ? 'text-blue-50/80' : 'text-slate-600'}`}>{description}</p>}
    </div>
  );
}

function normalizeKey(value = '') {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function subjectsFromSyllabus(syllabus) {
  if (typeof syllabus !== 'string') return [];
  return [...new Set(syllabus.split(/[\n,;|]+/).map((subject) => subject.trim()).filter(Boolean))];
}

function SectionShell({ id, children, className = '' }) {
  return <section id={id} className={`scroll-mt-24 py-20 sm:py-24 ${className}`}>{children}</section>;
}

export default function Academics() {
  const [openFaq, setOpenFaq] = useState(0);
  const [apiPrograms, setApiPrograms] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');

  useEffect(() => {
    let isMounted = true;
    listPublicPrograms()
      .then((programs) => {
        if (isMounted) setApiPrograms(programs);
      })
      .catch((error) => {
        if (isMounted) {
          setCatalogError(error.message || 'Program availability could not be loaded.');
        }
      })
      .finally(() => {
        if (isMounted) setCatalogLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const programs = CATALOG.map((program) => {
    const apiProgram = apiPrograms.find((item) => {
      const apiKeys = [normalizeKey(item.code), normalizeKey(item.name)];
      return program.matches.some((key) => apiKeys.includes(normalizeKey(key)));
    });
    const subjects = subjectsFromSyllabus(apiProgram?.syllabus);

    return {
      ...program,
      ...(apiProgram ? {
        title: apiProgram.name || program.title,
        description: apiProgram.description || program.description,
        duration: apiProgram.durationMonths > 0 ? `${apiProgram.durationMonths} months` : program.duration,
        imageUrl: apiProgram.imageUrl,
        isLive: true,
        availability: 'Available',
      } : {
        isLive: false,
        availability: 'Enquire',
      }),
      subjects: subjects.length ? subjects : program.subjects,
    };
  });

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Academics | Study Point';
    const description = 'Explore Study Point academic programs for Classes 1–12, Hindi and English Medium, offline and hybrid learning, PCM, PCB, scholarship, JEE, and NEET foundations.';
    let meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.content;
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
    return () => {
      document.title = previousTitle;
      if (createdMeta) {
        meta.remove();
      } else {
        meta.content = previousDescription;
      }
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.academics-reveal');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [apiPrograms]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-700">
      <AnnouncementBar phone={CONTACT.phone} phoneDisplay={CONTACT.phoneDisplay} />
      <Header />

      <main>
        <section className="relative isolate overflow-hidden bg-blue-950">
          <div className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/4 -z-10 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-24">
            <div className="academics-reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur">
                <FiBookOpen className="h-4 w-4" /> Study Point academic pathways
              </span>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">Academics</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-blue-50/85 sm:text-lg">
                Programs designed to support students from Class 1 to Class 12 through structured learning, academic mentoring, and science education.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Hindi & English Medium', 'Offline & Hybrid Learning', 'PCM & PCB Science', 'Parent Support System', 'Scholarship Preparation'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">
                    <FiCheck className="h-3.5 w-3.5 text-amber-300" /> {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/register" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-blue-950 transition hover:-translate-y-0.5 hover:bg-amber-300">
                  Take Admission <FiArrowRight className="h-4 w-4" />
                </Link>
                <a href="#programs" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20">
                  Explore Programs <FiArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="academics-reveal relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-5 rounded-[2rem] bg-blue-300/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm sm:p-4">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=85"
                  alt="Students learning together"
                  className="h-[300px] w-full rounded-2xl object-cover sm:h-[390px]"
                />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-lg backdrop-blur sm:bottom-7 sm:left-7 sm:right-7">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Classes 1–12</p>
                  <p className="mt-1 text-lg font-extrabold text-slate-950">A guided path through every stage.</p>
                  <p className="mt-1 text-xs text-slate-500">School foundations, science, and preparation pathways</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionShell id="academic-pathway" className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="academics-reveal">
              <SectionHeading eyebrow="Program pathway" title="A clear academic roadmap" description="Build strong foundations, prepare for boards, then choose a focused science or competitive pathway." />
            </div>
            <ol className="academic-pathway mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ['Class 1–5', 'Foundation Learning', <FiBookOpen />],
                ['Class 6–8', 'Concept Building', <FiTarget />],
                ['Class 9–10', 'Board Excellence', <FiClipboard />],
                ['Class 11–12', 'PCM / PCB', <FiZap />],
                ['Next steps', 'JEE / NEET', <FiAward />],
              ].map(([grade, label, icon], index) => (
                <li key={grade} className="academics-reveal relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" style={{ '--reveal-delay': `${index * 55}ms` }}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">{React.cloneElement(icon, { className: 'h-5 w-5' })}</span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-blue-700">{grade}</p>
                  <h3 className="mt-1 font-bold text-slate-900">{label}</h3>
                </li>
              ))}
            </ol>
          </div>
        </SectionShell>

        <SectionShell id="programs">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="academics-reveal">
              <SectionHeading eyebrow="Classes 1–12" title="Academic programs" description="Compare class groups, subjects, medium, and learning mode, then ask our team about current availability." />
            </div>
            <div aria-live="polite" className="mt-6">
              {catalogLoading && <p className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">Checking the live program catalog…</p>}
              {!catalogLoading && catalogError && (
                <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
                  Live availability could not be loaded: {catalogError} The program outlines below remain available; contact Study Point to confirm current batches.
                </p>
              )}
              {!catalogLoading && !catalogError && apiPrograms.length === 0 && (
                <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
                  Program availability is confirmed with the Study Point team. The catalog currently has no published program entries.
                </p>
              )}
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {programs.map((program, index) => <ProgramCard key={program.id} program={program} index={index} />)}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="scholarship-preparation" className="bg-amber-50/50">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="academics-reveal">
              <SectionHeading eyebrow="Scholarship preparation" title="Prepare with focus and guidance" description="Explore support for school entrance and scholarship pathways. Eligibility follows the current official examination notifications." />
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SCHOLARSHIPS.map((program, index) => <ScholarshipCard key={program.name} program={program} index={index} />)}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="competitive-foundations" className="bg-blue-950">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="academics-reveal">
              <SectionHeading light eyebrow="Advanced pathways" title="JEE & NEET Foundations" description="Competitive foundations build on school learning; Classes 1–12 remain the core of the Study Point academic journey." />
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
              {COMPETITIVE.map((program, index) => (
                <article key={program.id} id={program.id} className={`academics-reveal competitive-card competitive-card-${program.accent}`} style={{ '--reveal-delay': `${index * 70}ms` }}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">{React.cloneElement(program.icon, { className: 'h-6 w-6' })}</span>
                    <div><h3 className="text-xl font-extrabold text-slate-950">{program.title}</h3><p className="text-xs font-semibold text-slate-500">{program.audience}</p></div>
                  </div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-wider text-slate-500">Subjects</p>
                  <div className="mt-2 flex flex-wrap gap-2">{program.subjects.map((subject) => <span key={subject} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">{subject}</span>)}</div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">Preparation includes</p>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2">{program.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm text-slate-600"><FiCheck className="h-4 w-4 text-blue-700" /> {feature}</li>)}</ul>
                  <Link to="/contact#admission-enquiry" className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-800">Ask about {program.title} <FiArrowRight className="h-4 w-4" /></Link>
                </article>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="student-support">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="academics-reveal">
              <SectionHeading eyebrow="Learning support" title="What students receive" description="Academic resources and consistent communication to support classroom learning and progress." />
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {STUDENT_RECEIVES.map((item, index) => (
                <article key={item.title} className="academics-reveal rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5" style={{ '--reveal-delay': `${(index % 5) * 45}ms` }}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">{React.cloneElement(item.icon, { className: 'h-5 w-5' })}</span>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="learning-modes" className="bg-blue-50/60">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="academics-reveal">
              <SectionHeading eyebrow="Flexible learning" title="Learn your way" description="Mode availability varies by class and program. Contact our team to confirm current options." />
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
              {LEARNING_MODES.map((mode, index) => <LearningModeCard key={mode.title} mode={mode} index={index} />)}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="admission-process">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="academics-reveal">
              <SectionHeading eyebrow="Admissions" title="A simple path to get started" description="Our team guides students and parents through each step, from program selection to the first class." />
            </div>
            <AdmissionTimeline steps={ADMISSION_STEPS} />
            <div className="academics-reveal mt-8 text-center">
              <Link to="/contact#admission-enquiry" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800">Submit an admission inquiry <FiArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="academics-faq" className="bg-slate-50">
          <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <div className="academics-reveal">
              <SectionHeading eyebrow="Helpful answers" title="Academics FAQs" description="Answers to common questions about programs, medium, and learning support." />
            </div>
            <FAQAccordion items={FAQS} openIndex={openFaq} onToggle={setOpenFaq} />
          </div>
        </SectionShell>

        <section className="px-6 pb-20 sm:px-8 sm:pb-24">
          <div className="academics-reveal relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-800 via-blue-700 to-blue-950 px-6 py-14 text-center text-white shadow-2xl shadow-blue-900/20 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[40px] border-white/5" />
            <div className="pointer-events-none absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-amber-300"><FiBookOpen className="h-6 w-6" /></span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Ready to Begin Your Academic Journey?</h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-blue-100/85">Talk with Study Point about a program that fits your class, learning needs, and next steps.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/register" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-blue-950 transition hover:-translate-y-0.5 hover:bg-amber-300">Take Admission <FiArrowRight className="h-4 w-4" /></Link>
                <Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20">Contact Us <FiArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer hideLocation />
    </div>
  );
}
