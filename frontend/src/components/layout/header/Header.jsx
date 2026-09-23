import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import LoginButton, {
  AUTH_BUTTON_BASE,
  AUTH_BUTTON_OUTLINE,
  AUTH_BUTTON_SOLID,
} from './LoginButton';
import EnrollButton from './EnrollButton';
import { logout as clearAuth } from '../../../store/slices/authSlice';
import getDashboardPath from '../../../utils/dashboardPath';

/**
 * Public website header for Study Point.
 *
 * True three-section layout using CSS Grid:
 *
 *   grid-template-columns: 1fr auto 1fr
 *
 *   LEFT    → Study Point logo
 *   CENTER  → primary navigation (always visually centered in the header,
 *             independent of the logo and auth button widths)
 *   RIGHT   → Login (outline) + Enroll Now (solid) + mobile menu toggle
 *
 * The inner content is constrained to `max-w-7xl` so it aligns with the
 * announcement bar above it and the page content below it — the header no
 * longer stretches edge-to-edge on large monitors.
 *
 * Sticky at the top of the viewport (pass `sticky={false}` inside the
 * authenticated portal, where the sidebar already shares the top edge)
 * and keyboard accessible. When a user is signed in, the right side shows
 * "Dashboard / Logout" instead of "Login / Enroll Now". Usage:
 *
 *   <Header />                 // public pages (sticky)
 *   <Header sticky={false} />  // inside the authenticated portal
 */
function Header({ sticky = true }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  // Never leave the mobile menu open across route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape and hand focus back to the menu toggle button.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className={`${sticky ? 'sticky top-0 ' : ''}z-50 border-b border-lms-border bg-white/95 shadow-sm backdrop-blur`}>
      {/* Constrained to max-w-7xl so the header aligns with the page content and never touches the screen edges. */}
      <div className="mx-auto max-w-7xl px-6 py-3.5 sm:px-8">
        {/* LEFT | CENTER | RIGHT — the 1fr side tracks keep CENTER visually centered. */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 lg:gap-6">
          {/* SECTION 1 — LEFT: logo */}
          <div className="flex min-w-0 justify-self-start">
            <Link
              to="/"
              aria-label="Study Point — Home"
              className="inline-flex items-center rounded-md transition hover:opacity-90 active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-hover/40"
            >
              <Logo />
            </Link>
          </div>

          {/* SECTION 2 — CENTER: primary navigation */}
          <DesktopNavigation />

          {/* SECTION 3 — RIGHT: auth actions (guest vs signed-in) + mobile menu toggle */}
          <div className="flex min-w-0 items-center justify-end gap-2.5 lg:gap-3">
            {token ? (
              <>
                <Link
                  to={getDashboardPath(role)}
                  className={`${AUTH_BUTTON_BASE} ${AUTH_BUTTON_SOLID} hidden h-10 px-5 lg:inline-flex`}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${AUTH_BUTTON_BASE} ${AUTH_BUTTON_OUTLINE} hidden h-10 px-4 lg:inline-flex`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <LoginButton className="hidden h-10 px-4 lg:inline-flex" variant="outline" />
                <EnrollButton className="hidden h-10 px-5 lg:inline-flex" />
              </>
            )}

            <button
              ref={menuToggleRef}
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-panel"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-hover/40 lg:hidden"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <MobileNavigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}

export default Header;