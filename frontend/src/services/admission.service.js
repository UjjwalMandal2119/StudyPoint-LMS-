import { apiGet, apiCreate, apiUpdate, apiDelete } from '../services/crud';

export const list = (q = {}) => apiGet(`/admissions?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const listByStatus = (status, q = {}) =>
  apiGet(`/admissions/status/${status}?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/admissions/${id}`);
export const create = (payload) => apiCreate('/admissions', payload);
export const update = (id, payload) => apiUpdate(`/admissions/${id}`, payload);
export const remove = (id) => apiDelete(`/admissions/${id}`);
export const review = (id, status, remarks) =>
  apiCreate(`/admissions/${id}/review?status=${status}${remarks ? `&remarks=${encodeURIComponent(remarks)}` : ''}`);
export const trackByEmail = (email, q = {}) =>
  apiGet(`/admissions/track?email=${encodeURIComponent(email)}&page=${q.page ?? 0}&size=${q.size ?? 10}`);
