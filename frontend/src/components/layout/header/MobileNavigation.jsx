import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { navigationItems } from './navigation';
import LoginButton, {
  AUTH_BUTTON_BASE,
  AUTH_BUTTON_OUTLINE,
  AUTH_BUTTON_SOLID,
} from './LoginButton';
import EnrollButton from './EnrollButton';
import { logout as clearAuth } from '../../../store/slices/authSlice';
import getDashboardPath from '../../../utils/dashboardPath';

const MOBILE_LINK_CLASSES =
  'flex items-center rounded-md border-l-4 px-4 py-2.5 text-sm font-medium transition-colors duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-hover/40';

/**
 * Mobile-only navigation panel (hidden above the lg breakpoint).
 *
 * It is mounted inside the sticky header and drops down over the page content.
 * While closed it is invisible + pointer‑events‑none, so hidden links are
 * removed from both the tab order and the accessibility tree.
 */
function MobileNavigation({ isOpen, onClose }) {
  const { token, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  return (
    <div
      id="mobile-navigation-panel"
      aria-hidden={isOpen ? 'false' : 'true'}
      className={`absolute inset-x-0 top-full border-b border-lms-border bg-white shadow-sm transition-all duration-200 lg:hidden ${
        isOpen
          ? 'visible translate-y-0 opacity-100 pointer-events-auto'
          : 'invisible -translate-y-1 opacity-0 pointer-events-none'
      }`}
    >
      <nav aria-label="Primary" className="px-6 py-3 sm:px-8">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `${MOBILE_LINK_CLASSES} ${
                isActive
                  ? 'border-navy-primary bg-navy-primary/5 font-semibold text-navy-hover'
                  : 'border-transparent text-slate-600 hover:bg-navy-primary/5 hover:text-navy-hover'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

        <div className="mt-4 border-t border-lms-border pt-3">
          <div className="grid grid-cols-2 gap-3">
            {token ? (
              <>
                <Link
                  to={getDashboardPath(role)}
                  onClick={onClose}
                  className={`${AUTH_BUTTON_BASE} ${AUTH_BUTTON_SOLID} flex h-11 w-full px-4`}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${AUTH_BUTTON_BASE} ${AUTH_BUTTON_OUTLINE} flex h-11 w-full px-4`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <LoginButton className="flex h-11 w-full px-4" variant="outline" onClick={onClose} />
                <EnrollButton className="flex h-11 w-full px-4" onClick={onClose} />
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default MobileNavigation;