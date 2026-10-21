import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiUser } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

/**
 * Shared site footer for every Study Point page (public, auth and portal).
 *
 * Carries the same brand block, quick links, portal links and contact
 * details so the whole application stays visually consistent.
 */

const CONTACT = {
  email: 'studypoint.ujjwal@gmail.com',
  phone: '8294823430',
  phoneDisplay: '+91 82948 23430',
  address: 'Bindapathar, Jamtara, Jharkhand — 815351',
  founder: 'Ujjwal Mandal',
};

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Academics', to: '/courses' },
  { label: 'Contact', to: '/contact' },
];

const PROGRAM_LINKS = [
  { label: 'Foundation Program', to: '/courses#foundation' },
  { label: 'Middle School Program', to: '/courses#middle-school' },
  { label: 'Board Program', to: '/courses#board' },
  { label: 'PCM', to: '/courses#pcm' },
  { label: 'PCB', to: '/courses#pcb' },
  { label: 'Scholarship Preparation', to: '/courses#scholarship-preparation' },
  { label: 'JEE Foundation', to: '/courses#jee-foundation' },
  { label: 'NEET Foundation', to: '/courses#neet-foundation' },
];

const PORTAL_LINKS = [
  { label: 'Login', to: '/login' },
  { label: 'New Admission', to: '/register' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

function Footer({ hideLocation = false }) {
  return (
    <footer className="border-t border-lms-border bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy-primary to-navy-hover text-xl text-white shadow-sm">
                🎓
              </span>
              <span className="text-xl font-extrabold tracking-tight">
                Study<span className="text-navy-hover">Point</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              One Platform for Students, Parents, and Teachers.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/80">Academic Programs</p>
            <nav className="mt-4 grid gap-2 text-sm" aria-label="Programs">
              {PROGRAM_LINKS.map((program) => (
                <Link key={program.label} to={program.to} className="text-white/70 transition hover:text-white">
                  {program.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/80">Quick Links</p>
            <nav className="mt-4 grid gap-2 text-sm" aria-label="Quick links">
              {QUICK_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="text-white/70 transition hover:text-white">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Student Portal */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/80">Student Portal</p>
            <nav className="mt-4 grid gap-2 text-sm" aria-label="Student portal">
              {PORTAL_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="text-white/70 transition hover:text-white">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/80">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              {!hideLocation && (
                <p className="flex items-start gap-2">
                  <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-amber" />
                  {CONTACT.address}
                </p>
              )}
              <p className="flex items-center gap-2">
                <FiMail className="h-4 w-4 shrink-0 text-accent-amber" />
                <a href={`mailto:${CONTACT.email}`} className="transition hover:text-white">
                  {CONTACT.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FiPhone className="h-4 w-4 shrink-0 text-accent-amber" />
                <a href={`tel:${CONTACT.phone}`} className="transition hover:text-white">
                  {CONTACT.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FiUser className="h-4 w-4 shrink-0 text-accent-amber" />
                Director: {CONTACT.founder}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Study Point. All rights reserved.</p>
          <p>Learning Today. Leading Tomorrow.</p>
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row">
          <p className="text-xs font-semibold text-white/70">Connect with Study Point</p>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/91${CONTACT.phone}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Contact Study Point on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <FaWhatsapp className="h-4 w-4" />
            </a>
            <span title="YouTube channel coming soon" aria-label="YouTube channel coming soon" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/45">
              <FaYoutube className="h-4 w-4" />
            </span>
            <span title="Instagram profile coming soon" aria-label="Instagram profile coming soon" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/45">
              <FaInstagram className="h-4 w-4" />
            </span>
            <span title="Facebook page coming soon" aria-label="Facebook page coming soon" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/45">
              <FaFacebookF className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;