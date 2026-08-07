import { apiGet, apiCreate, apiUpdate, apiDelete } from './crud';

export const list = (q = {}) => apiGet(`/teachers?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/teachers/${id}`);
export const getByUserId = (userId) => apiGet(`/teachers/user/${userId}`);
export const create = (payload) => apiCreate('/teachers', payload);
export const update = (id, payload) => apiUpdate(`/teachers/${id}`, payload);
export const remove = (id) => apiDelete(`/teachers/${id}`);
export const search = (term, page = 0, size = 10) =>
  apiGet(`/teachers/search?search=${encodeURIComponent(term)}&page=${page}&size=${size}`);
