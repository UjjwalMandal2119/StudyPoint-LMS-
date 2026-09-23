import React from 'react';

/**
 * Study Point logo.
 *
 * No official logo asset exists in the project yet, so this renders a clean
 * text-based brand mark that matches the existing "Study Point" styling used
 * across the site (navy‑dark "Study" + navy‑primary "Point").
 *
 * To swap in the real logo later, pass `src` and `alt` and the component will
 * render an <img /> instead of the placeholder mark:
 *
 *   <Logo src="/logos/studypoint.png" alt="Study Point" />
 */
function Logo({ src = '', alt = 'Study Point logo' }) {
  if (src) {
    return (
      <span className="inline-flex shrink-0 items-center gap-2">
        <img src={src} alt={alt} className="h-9 w-auto max-w-[9rem]" />
      </span>
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center gap-2.5">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy-primary to-navy-hover text-xl text-white shadow-sm"
      >
        🎓
      </span>
      <span className="text-xl font-extrabold tracking-tight text-navy-dark">
        Study<span className="text-navy-hover">Point</span>
      </span>
    </span>
  );
}

export default Logo;