import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Shared colors/typography for every "Enroll Now" variant (desktop + mobile).
 * No display/sizing utilities here — the caller supplies those so the
 * desktop and mobile versions stay identical without duplicated markup.
 */
const ENROLL_BUTTON_BASE =
  'rounded-lg text-sm font-semibold items-center justify-center gap-2 ' +
  'transition-all duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-hover/40 focus-visible:ring-offset-2';

/**
 * Study Point "Enroll Now" CTA — the primary call to action in the header,
 * linking to the registration page. Rendered beside the secondary Login button.
 *
 * Desktop:
 *   <EnrollButton className="hidden h-10 px-5 lg:inline-flex" />
 * Mobile panel:
 *   <EnrollButton className="flex h-11 w-full lg:hidden" onClick={onClose} />
 */
function EnrollButton({ className = '', onClick = null }) {
  return (
    <Link
      to="/register"
      onClick={onClick}
      className={`${ENROLL_BUTTON_BASE} bg-gradient-to-r from-navy-primary to-navy-hover text-white shadow-sm hover:shadow-md hover:brightness-110 active:brightness-95 ${className}`}
    >
      Enroll Now
    </Link>
  );
}

export default EnrollButton;