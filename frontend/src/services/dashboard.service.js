import { apiGet } from './crud';

export const getAdminStats = () => apiGet('/dashboard/admin');
export const getStudentStats = () => apiGet('/dashboard/student');
export const getTeacherStats = () => apiGet('/dashboard/teacher');
export const getParentStats = () => apiGet('/dashboard/parent');

export default { getAdminStats, getStudentStats, getTeacherStats, getParentStats };