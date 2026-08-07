import { apiGet, apiCreate, apiUpdate, apiDelete } from '../services/crud';

export const list = (q = {}) => apiGet(`/grievances?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const listMine = (q = {}) => apiGet(`/grievances/my?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const listByStatus = (status, q = {}) =>
  apiGet(`/grievances/status/${status}?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/grievances/${id}`);
export const create = (payload) => apiCreate('/grievances', payload);
export const updateStatus = (id, status, adminResponse) =>
  apiUpdate(`/grievances/${id}/status`, { status, adminResponse });
export const remove = (id) => apiDelete(`/grievances/${id}`);
