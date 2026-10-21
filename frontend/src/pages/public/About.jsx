import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiActivity,
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiCheck,
  FiCheckCircle,
  FiClipboard,
  FiCreditCard,
  FiFileText,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiMapPin,
  FiMessageCircle,
  FiMonitor,
  FiPhone,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiVideo,
  FiZap,
} from 'react-icons/fi';
import founderPhoto from '../../assets/ujjwal PhotoCollegeUniform.jpeg';
import AnnouncementBar from '../../components/layout/header/AnnouncementBar';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import '../../styles/about.css';

const CONTACT = {
  phone: '8294823430',
  phoneDisplay: '+91 82948 23430',
  email: 'studypoint.ujjwal@gmail.com',
  address: 'Bindapathar, Jamtara, Jharkhand — 815351',
};

const PURPOSES = [
  {
    icon: <FiBookOpen />,
    title: 'Quality teaching',
    description: 'Students need clear explanations and a strong understanding of the subjects they study.',
  },
  {
    icon: <FiTarget />,
    title: 'Guidance that continues',
    description: 'Regular encouragement, assessment, and academic direction help learners keep moving forward.',
  },
  {
    icon: <FiUsers />,
    title: 'Parents in the loop',
    description: 'Families deserve to stay connected to attendance, assignments, and a student’s progress.',
  },
];

const LEARNING_MODEL = [
  {
    icon: <FiUsers />,
    title: 'Offline learning',
    description: 'Meaningful classroom learning and direct teacher support.',
    features: ['Classroom teaching', 'Personal guidance', 'Teacher interaction'],
    color: 'blue',
  },
  {
    icon: <FiMonitor />,
    title: 'Digital support',
    description: 'Useful academic information, organized in one place.',
    features: ['Notes & assignments', 'Notices', 'Academic updates'],
    color: 'amber',
  },
  {
    icon: <FiActivity />,
    title: 'Academic tracking',
    description: 'A clearer view of learning for students, parents, and teachers.',
    features: ['Attendance & results', 'Parent communication', 'Performance monitoring'],
    color: 'violet',
  },
];

const JOURNEY = [
  {
    grade: 'Classes 1–5',
    title: 'Foundation Learning',
    description: 'Build literacy, numeracy, discipline, and positive study habits.',
    icon: <FiBookOpen />,
  },
  {
    grade: 'Classes 6–8',
    title: 'Concept Building',
    description: 'Develop a deeper understanding of core subjects with regular assessment.',
    icon: <FiTarget />,
  },
  {
    grade: 'Classes 9–10',
    title: 'Board Preparation',
    description: 'Focus on tests, assignments, revision strategies, and concept mastery.',
    icon: <FiClipboard />,
  },
  {
    grade: 'Classes 11–12',
    title: 'Science Academy',
    description: 'Choose the science pathway that fits your interests and goals.',
    icon: <FiZap />,
    streams: ['PCM', 'Physics · Chemistry · Mathematics', 'PCB', 'Physics · Chemistry · Biology'],
  },
  {
    grade: 'Next steps',
    title: 'Career & scholarships',
    description: 'Build foundations for entrance and scholarship examinations.',
    icon: <FiAward />,
    streams: ['JEE', 'NEET', 'NDA', 'Scholarship exams'],
  },
];

const VALUES = [
  { icon: <FiHeart />, title: 'Student First', description: 'Every decision prioritizes student growth and development.', color: 'rose' },
  { icon: <FiTarget />, title: 'Discipline', description: 'Consistency and dedication make learning a lasting habit.', color: 'blue' },
  { icon: <FiShield />, title: 'Integrity', description: 'Honesty, transparency, and trust guide how we work.', color: 'violet' },
  { icon: <FiAward />, title: 'Excellence', description: 'We keep improving the quality of teaching and learning.', color: 'amber' },
  { icon: <FiZap />, title: 'Innovation', description: 'We bring education and useful modern technology together.', color: 'green' },
  { icon: <FiUsers />, title: 'Responsibility', description: 'We help learners build the skills to shape their own futures.', color: 'blue' },
];

const DIFFERENCES = [
  { icon: <FiBookOpen />, title: 'Classes 1–12 under one platform', description: 'A connected academic journey from foundation learning to senior secondary.' },
  { icon: <FiGlobe />, title: 'Hindi & English medium', description: 'Learning support that welcomes students across both mediums.' },
  { icon: <FiMonitor />, title: 'Offline & hybrid learning', description: 'Classroom teaching supported by accessible digital tools.' },
  { icon: <FiMessageCircle />, title: 'Parent communication', description: 'Keep families informed and connected to academic life.' },
  { icon: <FiActivity />, title: 'Attendance & academic tracking', description: 'Bring important learning records and updates together.' },
  { icon: <FiZap />, title: 'Science-focused programs', description: 'Focused PCM and PCB learning for senior secondary students.' },
  { icon: <FiFileText />, title: 'Assignments & assessments', description: 'Provide practice and feedback as part of structured learning.' },
  { icon: <FiUsers />, title: 'Personal academic guidance', description: 'Support students with encouragement and direction.' },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      {description && <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-600">{description}</p>}
    </div>
  );
}

export default function About() {
  useEffect(() => {
    const elements = document.querySelectorAll('.about-reveal');
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
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-700">
      <AnnouncementBar phone={CONTACT.phone} phoneDisplay={CONTACT.phoneDisplay} />
      <Header />

      <main>
        <section className="about-hero relative isolate overflow-hidden bg-blue-950">
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=85"
            alt="Students learning together in a bright classroom"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950 via-blue-950/90 to-blue-900/50" />
          <div className="absolute -right-20 top-0 -z-10 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
            <nav aria-label="Breadcrumb" className="about-reveal text-sm text-blue-100/80">
              <ol className="flex items-center gap-2">
                <li><Link to="/" className="transition hover:text-white">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-white">About</li>
              </ol>
            </nav>
            <div className="about-reveal mt-10 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-300 backdrop-blur">
                Learning for every stage
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Building Strong Foundations for <span className="text-amber-300">Lifelong Success</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-blue-50/90 sm:text-lg">
                Study Point is committed to helping students learn, grow, and succeed through quality education, structured guidance, and modern learning support.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/courses" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-blue-950 transition hover:-translate-y-0.5 hover:bg-amber-300">
                  Explore Programs <FiArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20">
                  Contact Us <FiArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent" />
        </section>

        <section id="who-we-are" className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="about-reveal">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Who we are</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">A learning platform built around students and families.</h2>
              <p className="mt-5 leading-relaxed text-slate-600">
                Study Point is a learning platform dedicated to supporting students from Class 1 to Class 12 through classroom teaching, academic mentoring, and technology-enabled learning support.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                We believe education should be accessible, structured, and effective. By combining traditional teaching values with modern tools, Study Point creates an environment where students can build strong concepts, improve performance, and develop confidence.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Hindi & English Medium',
                  'Offline & Hybrid Learning',
                  'Parent Engagement',
                  'Science-Focused Learning',
                  'Academic Excellence',
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700"><FiCheck className="h-3.5 w-3.5" /></span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="about-reveal relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-100 via-transparent to-amber-100/80 blur-xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white p-2 shadow-2xl shadow-blue-950/10">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1100&q=85"
                  alt="Teacher supporting students during a classroom lesson"
                  className="h-[320px] w-full rounded-[1.35rem] object-cover sm:h-[410px]"
                />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur sm:bottom-7 sm:left-7 sm:right-7">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Our approach</p>
                  <p className="mt-1 text-lg font-extrabold text-slate-950">Teaching, guidance, and family connection.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="our-purpose" className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="about-reveal">
              <SectionHeading
                eyebrow="Our purpose"
                title="Why Study Point Exists"
                description="Many students need more than classroom teaching. They need guidance, encouragement, regular assessment, and a system that keeps parents involved in the learning journey. Study Point brings these parts of academic support together."
              />
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {PURPOSES.map((item, index) => (
                <article key={item.title} className="about-reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5 sm:p-7" style={{ '--reveal-delay': `${index * 70}ms` }}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">{React.cloneElement(item.icon, { className: 'h-6 w-6' })}</span>
                  <h3 className="mt-5 text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="learning-model" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="about-reveal">
              <SectionHeading
                eyebrow="Our learning model"
                title="Learning Beyond the Classroom"
                description="Our hybrid approach connects classroom teaching with digital resources and academic tracking—supporting students and keeping parents informed."
              />
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {LEARNING_MODEL.map((model, index) => (
                <article key={model.title} className={`about-reveal about-model-card about-model-${model.color}`} style={{ '--reveal-delay': `${index * 70}ms` }}>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">{React.cloneElement(model.icon, { className: 'h-6 w-6' })}</span>
                    <span className="text-xs font-extrabold tracking-widest text-blue-200">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-slate-950">{model.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{model.description}</p>
                  <ul className="mt-5 grid gap-3">
                    {model.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <FiCheckCircle className="h-4 w-4 text-blue-700" /> {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="academic-journey" className="bg-blue-50/60 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="about-reveal">
              <SectionHeading
                eyebrow="Class 1 to 12"
                title="Supporting Students at Every Stage"
                description="A connected academic journey with the right kind of learning support as students grow."
              />
            </div>
            <ol className="about-journey mt-12 grid gap-4 md:grid-cols-5">
              {JOURNEY.map((step, index) => (
                <li key={step.grade} className="about-reveal relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" style={{ '--reveal-delay': `${index * 55}ms` }}>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">{React.cloneElement(step.icon, { className: 'h-5 w-5' })}</span>
                    <span className="text-xs font-extrabold tracking-widest text-blue-100">0{index + 1}</span>
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-700">{step.grade}</p>
                  <h3 className="mt-1 font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{step.description}</p>
                  {step.streams && (
                    <div className="mt-4 grid gap-2">
                      {step.streams.map((stream) => (
                        <span key={stream} className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold text-slate-700">{stream}</span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
            <div className="about-reveal mt-5 flex flex-wrap justify-center gap-2">
              {['Hindi Medium', 'English Medium', 'Offline learning', 'Hybrid support'].map((item) => (
                <span key={item} className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-blue-800">{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="values" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="about-reveal">
              <SectionHeading
                eyebrow="Our values"
                title="The Principles That Guide Us"
                description="The way we teach and support learners begins with the values we bring into every class."
              />
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {VALUES.map((value, index) => (
                <article key={value.title} className={`about-reveal about-value-card about-value-${value.color}`} style={{ '--reveal-delay': `${(index % 3) * 60}ms` }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">{React.cloneElement(value.icon, { className: 'h-5 w-5' })}</span>
                  <h3 className="mt-4 font-bold text-slate-950">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="founder" className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="about-reveal grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="relative min-h-[360px] bg-blue-100 sm:min-h-[500px]">
                <img src={founderPhoto} alt="Ujjwal Mandal, Founder and Director of Study Point" className="absolute inset-0 h-full w-full object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-950/85 via-blue-950/15 to-transparent p-6 pt-28 text-white sm:p-8 sm:pt-32">
                  <p className="text-xl font-extrabold">Ujjwal Mandal</p>
                  <p className="mt-1 text-sm text-white/80">Founder & Director</p>
                </div>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">A personal commitment to learning</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Meet Our Founder</h2>
                <p className="mt-3 text-sm font-semibold text-slate-600">B.Tech in Computer Science & Engineering</p>
                <p className="mt-1 text-sm text-slate-500">Educator, mentor, and advocate for student development</p>
                <blockquote className="mt-7 rounded-2xl border-l-4 border-amber-400 bg-slate-50 p-5 text-base leading-relaxed text-slate-700 sm:p-6">
                  “Education is not just about scoring marks. It is about developing confidence, discipline, curiosity, and the ability to solve problems. Study Point was created with a vision to provide students with the guidance, support, and learning environment they need to achieve their goals.”
                </blockquote>
                <div className="mt-7 flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
                  <div>
                    <p className="font-serif text-2xl italic text-blue-800">Ujjwal Mandal</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">Founder & Director, Study Point</p>
                  </div>
                  <Link to="/contact" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-700 transition hover:gap-3">
                    Get in touch <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="what-makes-us-different" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="about-reveal">
              <SectionHeading
                eyebrow="For students and families"
                title="Why Families Choose Study Point"
                description="An integrated way to support academics, parent involvement, and student progress."
              />
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DIFFERENCES.map((item, index) => (
                <article key={item.title} className="about-reveal group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5 sm:p-6" style={{ '--reveal-delay': `${(index % 4) * 50}ms` }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">{React.cloneElement(item.icon, { className: 'h-5 w-5' })}</span>
                  <h3 className="mt-4 font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="our-vision" className="bg-blue-950 py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="about-reveal">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Our vision</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Learning that stays with you.</h2>
            </div>
            <div className="about-reveal rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur sm:p-9">
              <p className="text-lg leading-relaxed text-blue-50 sm:text-xl">
                To create an educational environment where students receive quality learning experiences, develop strong academic foundations, and gain the confidence to pursue their future goals.
              </p>
              <p className="mt-4 leading-relaxed text-blue-100/75">
                We aim to support students not only in examinations but throughout their complete learning journey—with parents involved and student growth at the center.
              </p>
            </div>
          </div>
        </section>

        <section id="visit-us" className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="about-reveal">
              <SectionHeading
                eyebrow="Visit us"
                title="Study Point in Jamtara"
                description="For program enquiries or a conversation with our team, reach us by phone, WhatsApp, or email."
              />
            </div>
            <div className="about-reveal mt-10 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg md:grid-cols-[1.15fr_0.85fr]">
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
                <h3 className="mt-5 text-xl font-extrabold text-slate-950">Visit Study Point</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{CONTACT.address}</p>
                <a href={`tel:${CONTACT.phone}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-700">
                  <FiPhone className="h-4 w-4 text-blue-700" /> {CONTACT.phoneDisplay}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="mt-3 inline-flex items-center gap-2 break-all text-sm font-semibold text-slate-700 hover:text-blue-700">
                  <FiMessageCircle className="h-4 w-4 shrink-0 text-blue-700" /> {CONTACT.email}
                </a>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <a href={`tel:${CONTACT.phone}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800">
                    Call <FiPhone className="h-4 w-4" />
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
          <div className="about-reveal relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-800 via-blue-700 to-blue-950 px-6 py-14 text-center text-white shadow-2xl shadow-blue-900/20 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[40px] border-white/5" />
            <div className="pointer-events-none absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-amber-300 backdrop-blur"><FiHeart className="h-6 w-6" /></span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Become Part of the Study Point Learning Community</h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-blue-100/85">
                Join a platform where students learn, parents stay connected, and academic growth remains the top priority.
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
