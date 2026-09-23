/**
 * Role → dashboard route mapping for the authenticated site header.
 * Mirrors the switch used on the /dashboard landing page so the header's
 * "Dashboard" button always points at the signed-in user's portal.
 */
const ROLE_DASHBOARDS = {
  ADMIN: '/admin-dashboard',
  SUPER_ADMIN: '/admin-dashboard',
  STUDENT: '/student-dashboard',
  TEACHER: '/teacher-dashboard',
  PARENT: '/parent-dashboard',
};

/**
 * Resolve the portal URL for a role, falling back to the generic dashboard
 * for roles without a dedicated panel (e.g. RECEPTIONIST, ACCOUNTANT).
 */
export default function getDashboardPath(role) {
  return ROLE_DASHBOARDS[role] || '/dashboard';
}