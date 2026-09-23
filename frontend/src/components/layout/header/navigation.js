/**
 * Shared navigation configuration for the public Study Point header.
 *
 * Keeping the navigation entries in one place avoids duplicating markup
 * across the desktop and mobile navigation components.
 */

export const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Courses', path: '/courses' },
  { label: 'Contact', path: '/contact' },
];

/**
 * Login stays separate from the primary navigation — it is the
 * authentication entry point to the Study Point platform.
 */
export const loginItem = { label: 'Login', path: '/login' };