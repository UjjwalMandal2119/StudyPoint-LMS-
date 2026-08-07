import { apiGet, apiCreate, apiUpdate, apiDelete } from './crud';

export const list = (q = {}) => apiGet(`/students?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/students/${id}`);
export const getByUserId = (userId) => apiGet(`/students/user/${userId}`);
export const getByBatch = (batchId, page = 0, size = 10) =>
  apiGet(`/students/batch/${batchId}?page=${page}&size=${size}`);
export const create = (payload) => apiCreate('/students', payload);
export const update = (id, payload) => apiUpdate(`/students/${id}`, payload);
export const remove = (id) => apiDelete(`/students/${id}`);
export const search = (term, page = 0, size = 10) =>
  apiGet(`/students/search?search=${encodeURIComponent(term)}&page=${page}&size=${size}`);
