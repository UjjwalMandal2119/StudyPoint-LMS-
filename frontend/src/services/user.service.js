import { apiGet, apiCreate, apiUpdate, apiDelete } from '../services/crud';

export const list = (q = {}) => apiGet(`/users?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/users/${id}`);
export const getByUsername = (username) => apiGet(`/users/username/${encodeURIComponent(username)}`);
export const search = (term, page = 0, size = 10) =>
  apiGet(`/users/search?search=${encodeURIComponent(term)}&page=${page}&size=${size}`);
export const update = (id, payload) => apiUpdate(`/users/${id}`, payload);
export const remove = (id) => apiDelete(`/users/${id}`);
export const countByRole = (role) => apiGet(`/users/count/role/${role}`);
export const lock = (id) => apiUpdate(`/users/${id}/lock`, {});
export const unlock = (id) => apiUpdate(`/users/${id}/unlock`, {});
