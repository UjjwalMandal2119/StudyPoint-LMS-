import { apiGet, apiCreate, apiUpdate, apiDelete } from './crud';

export const list = (q = {}) => apiGet(`/parents?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/parents/${id}`);
export const create = (payload) => apiCreate('/parents', payload);
export const update = (id, payload) => apiUpdate(`/parents/${id}`, payload);
export const remove = (id) => apiDelete(`/parents/${id}`);
