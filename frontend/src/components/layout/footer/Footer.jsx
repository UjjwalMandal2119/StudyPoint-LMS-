import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiUser } from 'react-icons/fi';

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
  { label: 'Courses', to: '/courses' },
  { label: 'Contact', to: '/contact' },
];

const PORTAL_LINKS = [
  { label: 'Login', to: '/login' },
  { label: 'New Admission', to: '/register' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

function Footer() {
  return (
    <footer className="border-t border-lms-border bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
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
              Online coaching institute committed to excellence, concept clarity, and academic success.
            </p>
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
              <p className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-amber" />
                {CONTACT.address}
              </p>
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
          <p>Empowering Students through Quality Online Education.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;