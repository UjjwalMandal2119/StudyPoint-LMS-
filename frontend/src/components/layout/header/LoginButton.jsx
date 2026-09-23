import React from 'react';
import { Link } from 'react-router-dom';
import { loginItem } from './navigation';

/**
 * Shared colors/typography for every Login variant (desktop + mobile).
 * No display/sizing utilities here — the caller supplies those so the
 * desktop and mobile versions stay identical without duplicated markup.
 */
/** Shared base for every auth button (Login / Enroll / Dashboard / Logout). */
export const AUTH_BUTTON_BASE =
  'rounded-lg text-sm font-semibold items-center justify-center gap-2 ' +
  'transition-colors duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-hover/40 focus-visible:ring-offset-2';

/** Filled brand CTA. */
export const AUTH_BUTTON_SOLID =
  'bg-gradient-to-r from-navy-primary to-navy-hover text-white shadow-sm ' +
  'hover:from-navy-hover hover:to-navy-primary active:from-navy-dark active:to-navy-hover';

/** Quiet secondary action — used next to the primary Enroll Now CTA. */
export const AUTH_BUTTON_OUTLINE =
  'border border-navy-hover/40 bg-white text-navy-hover ' +
  'hover:border-navy-primary hover:bg-navy-primary/5 hover:text-navy-primary ' +
  'active:bg-navy-primary/10';

const LOGIN_VARIANTS = {
  solid: AUTH_BUTTON_SOLID,
  outline: AUTH_BUTTON_OUTLINE,
};

/**
 * Study Point Login action — single authentication entry point.
 *
 * Desktop (outline, next to the solid Enroll Now CTA):
 *   <LoginButton className="hidden h-10 px-4 lg:inline-flex" variant="outline" />
 * Mobile panel:
 *   <LoginButton className="flex h-11 w-full lg:hidden" variant="outline" onClick={onClose} />
 */
function LoginButton({ className = '', onClick = null, variant = 'solid' }) {
  return (
    <Link
      to={loginItem.path}
      onClick={onClick}
      className={`${AUTH_BUTTON_BASE} ${LOGIN_VARIANTS[variant] || AUTH_BUTTON_SOLID} ${className}`}
    >
      {loginItem.label}
    </Link>
  );
}

export default LoginButton;