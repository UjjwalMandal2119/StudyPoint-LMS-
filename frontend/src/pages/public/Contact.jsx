import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiUser,
} from 'react-icons/fi';
import AnnouncementBar from '../../components/layout/header/AnnouncementBar';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

const CONTACT = {
  email: 'studypoint.ujjwal@gmail.com',
  phone: '8294823430',
  phoneDisplay: '+91 82948 23430',
  address: 'Bindapathar, Jamtara, Jharkhand — 815351',
  founder: 'Ujjwal Mandal',
  hours: 'Monday – Saturday, 8:00 AM – 8:00 PM',
};

const CONTACT_METHODS = [
  {
    icon: FiPhone,
    label: 'Call or WhatsApp',
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phone}`,
  },
  {
    icon: FiMail,
    label: 'Email our team',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: FiMapPin,
    label: 'Visit our centre',
    value: CONTACT.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(CONTACT.address)}`,
  },
  {
    icon: FiClock,
    label: 'Inquiry hours',
    value: CONTACT.hours,
  },
];

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  course: '',
  message: '',
};

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Course or subject: ${formData.course || 'Not specified'}`,
      '',
      'Message:',
      formData.message,
    ].join('\n');
    const subject = `Study Point inquiry from ${formData.name}`;

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-700">
      <AnnouncementBar phone={CONTACT.phone} phoneDisplay={CONTACT.phoneDisplay} />

      <Header />

      <main>
        <section className="relative overflow-hidden bg-navy-dark">
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80"
            alt="Students learning together"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 to-navy-primary/50" />
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-amber/40 bg-accent-amber/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-amber">
                We’re Here to Help
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[3.4rem]">
                Let’s plan your{' '}
                <span className="bg-gradient-to-r from-navy-hover to-accent-amber bg-clip-text text-transparent">
                  next step
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Ask us about courses, admissions, or batch timings. Our team is happy to help you find the right path.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-navy-primary to-navy-hover px-7 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-105"
                >
                  Send an inquiry
                  <FiArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <FiPhone className="h-4 w-4" />
                  Call us
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/70">
                <span className="flex items-center gap-2">
                  <FiClock className="h-4 w-4 text-accent-amber" />
                  Mon – Sat, 8 AM – 8 PM
                </span>
                <span className="flex items-center gap-2">
                  <FiMapPin className="h-4 w-4 text-accent-amber" />
                  Bindapathar, Jamtara
                </span>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80"
                alt="Books and learning materials"
                className="w-full rounded-3xl border border-white/15 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 hidden max-w-xs rounded-2xl bg-white p-5 shadow-lift sm:block">
                <p className="text-sm font-bold text-navy-dark">A real person, ready to help</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Talk directly with {CONTACT.founder}, Founder & Director of Study Point.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="inquiry" className="bg-lms-bg py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Get in touch</p>
              <h2 className="mt-2 text-3xl font-extrabold text-navy-dark sm:text-4xl">
                We’d love to hear from you
              </h2>
              <p className="mt-4 text-slate-600">
                Choose the way that works best for you, or send us a message and we’ll help with your inquiry.
              </p>
            </div>

            <div className="mt-12 grid items-start gap-8 lg:grid-cols-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
                {CONTACT_METHODS.map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-primary/10 text-navy-primary transition group-hover:bg-navy-primary group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-navy-dark">{label}</span>
                        <span className="mt-1 block break-words text-sm leading-relaxed text-slate-600">{value}</span>
                      </span>
                    </>
                  );

                  return href ? (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('https:') ? '_blank' : undefined}
                      rel={href.startsWith('https:') ? 'noreferrer' : undefined}
                      className="group flex items-start gap-4 rounded-2xl border border-lms-border bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-navy-primary/30 hover:shadow-lift"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={label}
                      className="group flex items-start gap-4 rounded-2xl border border-lms-border bg-white p-5 shadow-card"
                    >
                      {content}
                    </div>
                  );
                })}

                <div className="rounded-2xl border border-accent-amber/30 bg-accent-amber/10 p-5 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-amber text-white">
                      <FiUser className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Founder & Director</p>
                      <p className="mt-0.5 font-bold text-navy-dark">{CONTACT.founder}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-lms-border bg-white p-6 shadow-card sm:p-8 lg:col-span-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-navy-primary">Admission inquiry</p>
                  <h3 className="mt-2 text-2xl font-extrabold text-navy-dark">How can we help?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Share a few details and your email app will open with a message ready to send.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Full name
                      </label>
                      <input
                        id="contact-name"
                        autoComplete="name"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Email address
                      </label>
                      <input
                        id="contact-email"
                        autoComplete="email"
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Phone or WhatsApp
                      </label>
                      <input
                        id="contact-phone"
                        autoComplete="tel"
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-course" className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Course or subject
                      </label>
                      <input
                        id="contact-course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        placeholder="What are you interested in?"
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Your message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what you’d like to know..."
                      className="input resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy-primary to-navy-hover px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-hover focus-visible:ring-offset-2 sm:w-auto"
                  >
                    <FiSend className="h-4 w-4" />
                    Prepare email
                  </button>
                  <p className="text-xs leading-relaxed text-slate-500">
                    This form opens your default email app; it does not send or store your information on this website.
                  </p>
                </form>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl bg-navy-dark px-6 py-6 text-center text-white sm:flex-row sm:text-left sm:px-8">
              <div>
                <p className="text-lg font-bold">Still exploring your options?</p>
                <p className="mt-1 text-sm text-white/70">Take a look at the programs available at Study Point.</p>
              </div>
              <Link
                to="/courses"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-dark transition hover:bg-accent-amber"
              >
                Explore courses
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
