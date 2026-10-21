import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiMapPin,
} from 'react-icons/fi';

function Icon({ children, className = 'h-5 w-5' }) {
  return React.cloneElement(children, { className });
}

export function ProgramCard({ program, index = 0 }) {
  const imageUrl = (() => {
    if (!program.imageUrl) return '';
    try {
      const url = new URL(program.imageUrl, window.location.origin);
      if (!['http:', 'https:'].includes(url.protocol)) return '';
      return url.origin === window.location.origin
        ? `${url.pathname}${url.search}${url.hash}`
        : url.toString();
    } catch {
      return '';
    }
  })();

  return (
    <article
      id={program.id}
      className={`academics-reveal program-card program-card-${program.accent}`}
      style={{ '--reveal-delay': `${index * 65}ms` }}
    >
      <div className="program-card-art">
        {imageUrl ? (
          <img src={imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <span className="program-card-mark" aria-hidden="true">
            <Icon>{program.icon || <FiBookOpen />}</Icon>
          </span>
        )}
        <span className="program-card-grade">{program.classes}</span>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">{program.wing}</p>
            <h3 className="mt-1 text-xl font-extrabold text-slate-950">{program.title}</h3>
          </div>
          <span className={`program-status ${program.isLive ? 'program-status-live' : ''}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {program.availability}
          </span>
        </div>
        <p className="mt-3 min-h-[3rem] text-sm leading-relaxed text-slate-600">{program.description}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="program-meta">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Medium</span>
            <p className="mt-1 text-xs font-semibold text-slate-800">{program.mediums.join(' / ')}</p>
          </div>
          <div className="program-meta">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Learning mode</span>
            <p className="mt-1 text-xs font-semibold text-slate-800">{program.modes.join(' + ')}</p>
          </div>
          <div className="program-meta">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500"><FiClock /> Duration</span>
            <p className="mt-1 text-xs font-semibold text-slate-800">{program.duration}</p>
          </div>
          <div className="program-meta">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500"><FiMapPin /> Availability</span>
            <p className="mt-1 text-xs font-semibold text-slate-800">{program.availability}</p>
          </div>
        </div>

        <div id={`${program.id}-details`} className="mt-5 scroll-mt-24">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Subjects</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {program.subjects.map((subject) => (
              <span key={subject} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700">{subject}</span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row">
          <a href={`#${program.id}-details`} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50">
            View details <FiArrowRight className="h-4 w-4" />
          </a>
          <Link to="/contact#admission-enquiry" className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-800">
            Take admission <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ScholarshipCard({ program, index = 0 }) {
  return (
    <article className="academics-reveal scholarship-card" style={{ '--reveal-delay': `${index * 55}ms` }}>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800"><FiBookOpen className="h-5 w-5" /></span>
      <h3 className="mt-4 text-lg font-extrabold text-slate-950">{program.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{program.description}</p>
      <dl className="mt-4 space-y-3 border-t border-amber-100 pt-4 text-xs leading-relaxed">
        <div><dt className="font-bold text-slate-800">Eligibility</dt><dd className="mt-0.5 text-slate-600">{program.eligibility}</dd></div>
        <div><dt className="font-bold text-slate-800">Benefits</dt><dd className="mt-0.5 text-slate-600">{program.benefits}</dd></div>
        <div><dt className="font-bold text-slate-800">Preparation support</dt><dd className="mt-0.5 text-slate-600">{program.support}</dd></div>
      </dl>
      <Link to="/contact#admission-enquiry" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:gap-3">
        Apply now <FiArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

export function LearningModeCard({ mode, index = 0 }) {
  return (
    <article className={`academics-reveal learning-mode-card learning-mode-card-${mode.accent}`} style={{ '--reveal-delay': `${index * 70}ms` }}>
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm"><Icon className="h-6 w-6">{mode.icon}</Icon></span>
      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-700">{mode.kicker}</p>
      <h3 className="mt-1 text-xl font-extrabold text-slate-950">{mode.title}</h3>
      <ul className="mt-5 grid gap-3">
        {mode.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-slate-600"><FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" /> {feature}</li>
        ))}
      </ul>
    </article>
  );
}

export function FAQAccordion({ items, openIndex, onToggle }) {
  return (
    <div className="mt-10 space-y-3">
      {items.map((faq, index) => (
        <article key={faq.question} className="academics-reveal overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <h3>
            <button
              type="button"
              id={`academics-faq-question-${index}`}
              aria-expanded={openIndex === index}
              aria-controls={`academics-faq-answer-${index}`}
              onClick={() => onToggle(openIndex === index ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-slate-900 transition hover:bg-slate-50 sm:px-6"
            >
              {faq.question}
              <FiChevronDown className={`h-5 w-5 shrink-0 text-blue-700 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
          </h3>
          {openIndex === index && (
            <div id={`academics-faq-answer-${index}`} role="region" aria-labelledby={`academics-faq-question-${index}`} className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600 sm:px-6">
              {faq.answer}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export function AdmissionTimeline({ steps }) {
  return (
    <ol className="admission-timeline mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, index) => (
        <li key={step.title} className="academics-reveal admission-step" style={{ '--reveal-delay': `${index * 60}ms` }}>
          <span className="admission-step-number">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="mt-4 font-bold text-slate-950">{step.title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
