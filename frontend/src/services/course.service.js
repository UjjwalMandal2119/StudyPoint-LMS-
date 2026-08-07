import { apiGet, apiCreate, apiUpdate, apiDelete } from '../services/crud';

export const list = (q = {}) => apiGet(`/courses?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/courses/${id}`);
export const getByCode = (code) => apiGet(`/courses/code/${encodeURIComponent(code)}`);
export const search = (term, page = 0, size = 10) =>
  apiGet(`/courses/search?search=${encodeURIComponent(term)}&page=${page}&size=${size}`);
export const create = (payload) => apiCreate('/courses', payload);
export const update = (id, payload) => apiUpdate(`/courses/${id}`, payload);
export const remove = (id) => apiDelete(`/courses/${id}`);
export const publish = (id) => apiUpdate(`/courses/${id}/publish`, {});
export const toggleActive = (id) => apiUpdate(`/courses/${id}/toggle-active`, {});
