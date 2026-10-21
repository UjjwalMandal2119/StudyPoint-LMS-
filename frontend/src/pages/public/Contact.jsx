import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiFileText,
  FiHelpCircle,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiTarget,
  FiUsers,
  FiX,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import founderPhoto from '../../assets/ujjwal PhotoCollegeUniform.jpeg';
import AnnouncementBar from '../../components/layout/header/AnnouncementBar';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import '../../styles/contact.css';

const CONTACT = {
  phone: '8294823430',
  phoneDisplay: '+91 82948 23430',
  email: 'studypoint.ujjwal@gmail.com',
  address: 'Bindapathar, Jamtara, Jharkhand — 815351',
  mapQuery: 'Bindapathar, Jamtara, Jharkhand 815351',
};

const PROGRAM_OPTIONS = [
  'Class 1–5',
  'Class 6–8',
  'Class 9–10',
  'Class 11–12 PCM',
  'Class 11–12 PCB',
  'Navodaya Preparation',
  'Natarhat Preparation',
  'Eklavya Preparation',
  'JEE Foundation',
  'NEET Foundation',
];

const INITIAL_FORM = {
  studentName: '',
  parentName: '',
  phone: '',
  email: '',
  program: '',
  mode: '',
  message: '',
};

const CONTACT_CARDS = [
  {
    icon: <FiPhone />,
    title: 'Call us',
    description: 'Speak directly with our team about admissions and general enquiries.',
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phone}`,
    action: 'Call now',
    accent: 'blue',
  },
  {
    icon: <FaWhatsapp />,
    title: 'WhatsApp',
    description: 'Start a quick conversation about programs, parent support, or admissions.',
    value: CONTACT.phoneDisplay,
    href: `https://wa.me/91${CONTACT.phone}`,
    action: 'Chat on WhatsApp',
    accent: 'green',
  },
  {
    icon: <FiMail />,
    title: 'Email',
    description: 'Send your questions and include any details that will help us respond.',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    action: 'Send email',
    accent: 'violet',
  },
  {
    icon: <FiMapPin />,
    title: 'Visit us',
    description: 'Meet our team and learn about Study Point in person.',
    value: 'Jamtara, Jharkhand',
    href: `https://maps.google.com/?q=${encodeURIComponent(CONTACT.mapQuery)}`,
    action: 'Open map',
    accent: 'amber',
  },
];

const AUDIENCES = [
  {
    icon: <FiBookOpen />,
    title: 'Students',
    topics: ['Course information', 'Assignments', 'Academic support', 'Test information'],
    accent: 'blue',
  },
  {
    icon: <FiUsers />,
    title: 'Parents',
    topics: ['Fee questions', 'Attendance tracking', 'Student progress', 'Meeting information'],
    accent: 'amber',
  },
  {
    icon: <FiCalendar />,
    title: 'Teachers',
    topics: ['Academic coordination', 'Schedule management', 'Student updates'],
    accent: 'violet',
  },
  {
    icon: <FiHelpCircle />,
    title: 'Visitors',
    topics: ['General enquiries', 'Collaborations', 'Institution information'],
    accent: 'green',
  },
];

const SUPPORT = [
  { icon: <FiTarget />, title: 'Course counselling', description: 'Get help selecting a program for your class and goals.' },
  { icon: <FiUsers />, title: 'Parent guidance', description: 'Understand your child’s learning journey and available support.' },
  { icon: <FiFileText />, title: 'Examination support', description: 'Ask about tests, assessments, and exam preparation.' },
  { icon: <FiAward />, title: 'Scholarship guidance', description: 'Learn about Navodaya, Natarhat, and Eklavya preparation.' },
];

const FAQS = [
  {
    question: 'Do you offer Hindi Medium classes?',
    answer: 'Hindi Medium learning is available across relevant programs. Please contact our team to confirm the medium for a specific class and batch.',
  },
  {
    question: 'Do you offer English Medium classes?',
    answer: 'Yes. English Medium learning is available across relevant programs. Our team can help you identify options for the class you are interested in.',
  },
  {
    question: 'Are classes available offline?',
    answer: 'Yes. Study Point provides offline classes, and some programs also have hybrid learning support. Availability depends on the class and program.',
  },
  {
    question: 'What is Hybrid Learning?',
    answer: 'Hybrid learning combines offline classes with digital resources such as notes, assignments, notices, and academic updates.',
  },
  {
    question: 'How can parents track student progress?',
    answer: 'Parents can stay connected through academic updates and communication about attendance, assignments, and student progress.',
  },
  {
    question: 'Is online fee payment available?',
    answer: 'Please contact our team for current fee payment options and guidance for your program.',
  },
  {
    question: 'How do I enroll my child?',
    answer: 'Send an enquiry through the form, call us, or message us on WhatsApp. Our team can guide you through program selection and the admission process.',
  },
  {
    question: 'Do you provide scholarship exam preparation?',
    answer: 'Study Point offers preparation pathways for Navodaya, Natarhat, and Eklavya. Contact us for details about the relevant class and batch.',
  },
  {
    question: 'Can I visit the institute before admission?',
    answer: 'Yes. You can visit Study Point in Bindapathar, Jamtara. Please call or message ahead so we can help plan your visit.',
  },
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

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [preparedHref, setPreparedHref] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll('.contact-reveal');
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setPreparedHref('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = [
      'Study Point admission enquiry',
      `Student name: ${formData.studentName.trim()}`,
      `Parent name: ${formData.parentName.trim()}`,
      `Mobile: ${formData.phone.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Program: ${formData.program}`,
      `Preferred learning mode: ${formData.mode}`,
      `Message: ${formData.message.trim() || 'No additional message'}`,
    ].join('\n');

    setPreparedHref(`https://wa.me/91${CONTACT.phone}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-700">
      <AnnouncementBar phone={CONTACT.phone} phoneDisplay={CONTACT.phoneDisplay} />
      <Header />

      <main>
        <section className="relative isolate overflow-hidden bg-blue-950">
          <div className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/4 -z-10 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
            <div className="contact-reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur">
                <FiMessageCircle className="h-4 w-4" /> Here for students and families
              </span>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
                Let’s <span className="text-amber-300">Connect.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-blue-50/85 sm:text-lg">
                Whether you’re a student, parent, or visitor, we’re here to help with admissions, academic guidance, course information, and support.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Admission assistance', 'Academic guidance', 'Parent support', 'Fee & portal support', 'Course counselling'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">
                    <FiCheck className="h-3.5 w-3.5 text-amber-300" /> {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contact-options" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-blue-950 transition hover:-translate-y-0.5 hover:bg-amber-300">
                  Contact now <FiArrowRight className="h-4 w-4" />
                </a>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT.mapQuery)}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20">
                  Get directions <FiMapPin className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="contact-reveal relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-5 rounded-[2rem] bg-blue-300/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm sm:p-4">
                <img
                  src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85"
                  alt="Students receiving guidance from an educator"
                  className="h-[300px] w-full rounded-2xl object-cover sm:h-[390px]"
                />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur sm:bottom-7 sm:left-7 sm:right-7">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">A helpful conversation starts here</p>
                  <p className="mt-1 text-lg font-extrabold text-slate-950">Admissions, academics, or parent support.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact-options" className="scroll-mt-24 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="contact-reveal">
              <SectionHeading
                eyebrow="Get in touch"
                title="Choose the way that works for you"
                description="Talk with our team about admissions, programs, parent support, or your visit to Study Point."
              />
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CONTACT_CARDS.map((card, index) => (
                <article key={card.title} className={`contact-reveal contact-method-card contact-method-${card.accent}`} style={{ '--reveal-delay': `${index * 60}ms` }}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">{React.cloneElement(card.icon, { className: 'h-6 w-6' })}</span>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-950">{card.title}</h3>
                  <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-slate-600">{card.description}</p>
                  <p className="mt-4 break-words text-sm font-bold text-slate-800">{card.value}</p>
                  <a href={card.href} target={card.href.startsWith('https:') ? '_blank' : undefined} rel={card.href.startsWith('https:') ? 'noreferrer' : undefined} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:gap-3">
                    {card.action} <FiArrowUpRight className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="admission-enquiry" className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
            <div className="contact-reveal lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Admission enquiry</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Request Admission Information</h2>
              <p className="mt-4 leading-relaxed text-slate-600">Our academic counsellors will help you choose the right program for your student.</p>
              <div className="mt-7 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><FiUsers className="h-5 w-5" /></span>
                <p className="mt-4 font-bold text-slate-900">A parent-friendly process</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">Tell us the class, program, and learning mode you’re interested in. Your message opens in WhatsApp for you to review and send.</p>
              </div>
              <a href={`https://wa.me/91${CONTACT.phone}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">
                <FaWhatsapp className="h-5 w-5" /> WhatsApp us directly
              </a>
            </div>

            <div className="contact-reveal rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="student-name" className="mb-1.5 block text-sm font-semibold text-slate-800">Student name <span className="text-rose-600">*</span></label>
                    <input id="student-name" name="studentName" autoComplete="name" required maxLength={100} value={formData.studentName} onChange={handleChange} placeholder="Student’s full name" className="input" />
                  </div>
                  <div>
                    <label htmlFor="parent-name" className="mb-1.5 block text-sm font-semibold text-slate-800">Parent name <span className="text-rose-600">*</span></label>
                    <input id="parent-name" name="parentName" autoComplete="name" required maxLength={100} value={formData.parentName} onChange={handleChange} placeholder="Parent or guardian name" className="input" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-mobile" className="mb-1.5 block text-sm font-semibold text-slate-800">Mobile number <span className="text-rose-600">*</span></label>
                    <input id="contact-mobile" name="phone" autoComplete="tel" required type="tel" maxLength={20} value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" className="input" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-slate-800">Email address <span className="text-rose-600">*</span></label>
                    <input id="contact-email" name="email" autoComplete="email" required type="email" maxLength={100} value={formData.email} onChange={handleChange} placeholder="you@example.com" className="input" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="interested-program" className="mb-1.5 block text-sm font-semibold text-slate-800">Class or program <span className="text-rose-600">*</span></label>
                    <div className="relative">
                      <select id="interested-program" name="program" required value={formData.program} onChange={handleChange} className="input appearance-none pr-10">
                        <option value="">Select a program</option>
                        {PROGRAM_OPTIONS.map((program) => <option key={program} value={program}>{program}</option>)}
                      </select>
                      <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="learning-mode" className="mb-1.5 block text-sm font-semibold text-slate-800">Preferred learning mode <span className="text-rose-600">*</span></label>
                    <div className="relative">
                      <select id="learning-mode" name="mode" required value={formData.mode} onChange={handleChange} className="input appearance-none pr-10">
                        <option value="">Select a mode</option>
                        <option value="Offline">Offline</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                      <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-slate-800">Message <span className="text-slate-400">(optional)</span></label>
                  <textarea id="contact-message" name="message" rows={4} maxLength={1000} value={formData.message} onChange={handleChange} placeholder="What would you like to know?" className="input resize-y" />
                </div>

                {preparedHref && (
                  <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><FiCheck className="h-4 w-4" /></span>
                      <div>
                        <p className="text-sm font-bold text-emerald-900">Your enquiry is ready.</p>
                        <p className="mt-1 text-xs leading-relaxed text-emerald-800">Open WhatsApp and tap Send to share it with our team. Your details are not submitted until you send the message.</p>
                        <a href={preparedHref} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-800">
                          Open WhatsApp <FaWhatsapp className="h-4 w-4" />
                        </a>
                        <button type="button" onClick={() => setPreparedHref('')} className="ml-3 mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:text-emerald-950">
                          Edit details <FiX className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/15 transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                    <FiSend className="h-4 w-4" /> Request Information
                  </button>
                  <p className="text-xs leading-relaxed text-slate-500">Your message opens in WhatsApp for your review before sending.</p>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section id="who-to-contact" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="contact-reveal">
              <SectionHeading eyebrow="We’re here for everyone" title="How can we help you?" description="Reach out with the questions that matter to your role in the Study Point learning community." />
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {AUDIENCES.map((audience, index) => (
                <article key={audience.title} className={`contact-reveal contact-audience-card contact-audience-${audience.accent}`} style={{ '--reveal-delay': `${index * 55}ms` }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">{React.cloneElement(audience.icon, { className: 'h-5 w-5' })}</span>
                  <h3 className="mt-4 font-bold text-slate-950">{audience.title}</h3>
                  <ul className="mt-3 grid gap-2">
                    {audience.topics.map((topic) => <li key={topic} className="flex items-start gap-2 text-xs text-slate-600"><FiCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-700" /> {topic}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="academic-support" className="bg-blue-50/60 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="contact-reveal">
              <SectionHeading eyebrow="Academic support" title="Need Academic Assistance?" description="Our team can help students and parents navigate common academic questions." />
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SUPPORT.map((item, index) => (
                <article key={item.title} className="contact-reveal rounded-2xl border border-blue-100 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-950/5 sm:p-6" style={{ '--reveal-delay': `${index * 55}ms` }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">{React.cloneElement(item.icon, { className: 'h-5 w-5' })}</span>
                  <h3 className="mt-4 font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="office-hours" className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6 sm:px-8">
            <div className="contact-reveal grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg md:grid-cols-[0.8fr_1.2fr]">
              <div className="bg-blue-950 p-6 text-white sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300"><FiClock className="h-6 w-6" /></span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">We’re ready to help</p>
                <h2 className="mt-2 text-2xl font-extrabold text-white">When Can You Reach Us?</h2>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Monday – Saturday</span>
                  <p className="mt-2 text-2xl font-extrabold text-slate-950">8:00 AM – 7:00 PM</p>
                  <p className="mt-1 text-xs text-slate-500">Contact our team during office hours.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sunday</span>
                  <p className="mt-2 text-2xl font-extrabold text-slate-900">Closed</p>
                  <p className="mt-1 text-xs text-slate-500">You can still send an email or WhatsApp message.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="visit-study-point" className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="contact-reveal">
              <SectionHeading eyebrow="Visit us" title="Find Study Point" description="Plan a visit to our centre in Bindapathar, Jamtara. Call or message ahead if you would like help arranging your visit." />
            </div>
            <div className="contact-reveal mt-10 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 md:grid-cols-[1.2fr_0.8fr]">
              <div className="min-h-[300px] bg-slate-200 sm:min-h-[430px]">
                <iframe
                  title="Google map showing Study Point in Bindapathar, Jamtara"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="h-full min-h-[300px] w-full border-0 sm:min-h-[430px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-9">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><FiMapPin className="h-6 w-6" /></span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Jamtara, Jharkhand</p>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-950">Visit Study Point</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{CONTACT.address}</p>
                <a href={`tel:${CONTACT.phone}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-700"><FiPhone className="h-4 w-4 text-blue-700" /> {CONTACT.phoneDisplay}</a>
                <a href={`mailto:${CONTACT.email}`} className="mt-3 inline-flex items-center gap-2 break-all text-sm font-semibold text-slate-700 hover:text-blue-700"><FiMail className="h-4 w-4 shrink-0 text-blue-700" /> {CONTACT.email}</a>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a href={`https://wa.me/91${CONTACT.phone}`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800">
                    <FaWhatsapp className="h-4 w-4" /> WhatsApp
                  </a>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT.mapQuery)}`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50">
                    Directions <FiArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact-faq" className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <div className="contact-reveal">
              <SectionHeading eyebrow="Helpful answers" title="Frequently Asked Questions" description="Answers to common questions from students and parents." />
            </div>
            <div className="mt-10 space-y-3">
              {FAQS.map((faq, index) => (
                <article key={faq.question} className="contact-reveal overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <h3>
                    <button
                      type="button"
                      id={`contact-faq-question-${index}`}
                      aria-expanded={openFaq === index}
                      aria-controls={`contact-faq-answer-${index}`}
                      onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-slate-900 transition hover:bg-slate-50 sm:px-6"
                    >
                      {faq.question}
                      {openFaq === index ? <FiChevronDown className="h-5 w-5 shrink-0 rotate-180 text-blue-700" /> : <FiChevronDown className="h-5 w-5 shrink-0 text-blue-700" />}
                    </button>
                  </h3>
                  {openFaq === index && (
                    <div id={`contact-faq-answer-${index}`} role="region" aria-labelledby={`contact-faq-question-${index}`} className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600 sm:px-6">
                      {faq.answer}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="director-message" className="bg-blue-950 py-16 text-white sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 sm:px-8 lg:grid-cols-[0.65fr_1.35fr]">
            <div className="contact-reveal relative mx-auto w-full max-w-xs overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-2">
              <img src={founderPhoto} alt="Ujjwal Mandal, Founder and Director of Study Point" className="h-[310px] w-full rounded-2xl object-cover object-top sm:h-[360px]" />
              <div className="absolute inset-x-2 bottom-2 rounded-b-2xl bg-gradient-to-t from-blue-950/90 to-transparent p-4 pt-12">
                <p className="font-bold text-white">Ujjwal Mandal</p>
                <p className="mt-0.5 text-xs text-white/75">Founder & Director</p>
              </div>
            </div>
            <div className="contact-reveal">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">A message from our founder</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Your questions matter to us.</h2>
              <blockquote className="mt-5 border-l-4 border-amber-400 bg-white/[0.06] p-5 text-base leading-relaxed text-blue-50/90 sm:p-6">
                “We believe communication is an important part of education. Whether you are a student looking for guidance or a parent seeking support, we welcome your questions and look forward to helping you achieve academic success.”
              </blockquote>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/15 pt-5">
                <div>
                  <p className="font-serif text-2xl italic text-amber-300">Ujjwal Mandal</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-blue-100/70">Founder & Director, Study Point</p>
                </div>
                <Link to="/about" className="inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-amber-300">About Study Point <FiArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-8 sm:py-24">
          <div className="contact-reveal relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-800 via-blue-700 to-blue-950 px-6 py-14 text-center text-white shadow-2xl shadow-blue-900/20 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[40px] border-white/5" />
            <div className="pointer-events-none absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-amber-300"><FiUsers className="h-6 w-6" /></span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Ready to Begin Your Learning Journey?</h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-blue-100/85">Connect with Study Point today and discover programs designed to support students from Class 1 to 12.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/register" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-blue-950 transition hover:-translate-y-0.5 hover:bg-amber-300">Take Admission <FiArrowRight className="h-4 w-4" /></Link>
                <Link to="/contact#contact-options" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20">Contact Us <FiMessageCircle className="h-4 w-4" /></Link>
                <Link to="/courses" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20">Explore Programs <FiBookOpen className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer hideLocation />
    </div>
  );
}
