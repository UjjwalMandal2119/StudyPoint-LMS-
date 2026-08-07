import api from '../api/axios';
import { apiGet, apiCreate } from './crud';

function apiPost(url, payload) {
  return api.post(url, payload);
}

export const list = (q = {}) => apiGet(`/enrollments?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/enrollments/${id}`);
export const getByStudent = (studentId) => apiGet(`/enrollments/student/${studentId}`);
export const getByBatch = (batchId) => apiGet(`/enrollments/batch/${batchId}`);
export const create = (payload) => apiCreate('/enrollments', payload);
export const approve = (id, approvedBy) =>
  apiPost(`/enrollments/${id}/approve?approvedBy=${approvedBy}`, {});
export const reject = (id, remarks) =>
  apiPost(`/enrollments/${id}/reject?remarks=${encodeURIComponent(remarks)}`, {});
