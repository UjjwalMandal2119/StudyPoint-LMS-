import React from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from './navigation';

/** Shared link styling: border-b-2 reserves room for the active underline. */
const NAV_LINK_CLASSES =
  'inline-flex items-center rounded-md border-b-2 px-3 py-2 text-sm font-medium transition-colors duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-hover/40 focus-visible:ring-offset-2';

/**
 * CENTER section of the header — the primary site navigation.
 *
 * This is its own grid track (`1fr auto 1fr` layout in Header), so it always
 * stays visually centered in the header regardless of the logo and Login
 * button widths. Hidden below the lg breakpoint in favour of the mobile panel.
 */
function DesktopNavigation() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
      {navigationItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            `${NAV_LINK_CLASSES} ${
              isActive
                ? 'border-navy-primary font-semibold text-navy-hover'
                : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-navy-hover'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default DesktopNavigation;