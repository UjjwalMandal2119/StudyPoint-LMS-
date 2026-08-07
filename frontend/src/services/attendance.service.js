import api from '../api/axios';
import { apiGet } from './crud';

function apiPost(url, payload) {
  return api.post(url, payload);
}

export const mark = (payload) => apiPost('/attendance/mark', payload);
export const bulkMark = (payload) => apiPost('/attendance/bulk-mark', payload);
export const getByStudent = (studentId, startDate, endDate) =>
  apiGet(`/attendance/student/${studentId}?startDate=${startDate}&endDate=${endDate}`);
export const getByBatch = (batchId, attendanceDate) =>
  apiGet(`/attendance/batch/${batchId}?attendanceDate=${attendanceDate}`);
export const getSummary = (studentId, startDate, endDate) =>
  apiGet(`/attendance/summary/${studentId}?startDate=${startDate}&endDate=${endDate}`);
