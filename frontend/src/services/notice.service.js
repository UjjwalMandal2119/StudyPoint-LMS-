import { apiGet, apiCreate, apiUpdate, apiDelete } from '../services/crud';

export const list = (q = {}) => apiGet(`/notices?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const listPublished = (q = {}) => apiGet(`/notices/published?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const listActive = (q = {}) => apiGet(`/notices/active?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const listImportant = (q = {}) => apiGet(`/notices/important?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/notices/${id}`);
export const create = (payload) => apiCreate('/notices', payload);
export const update = (id, payload) => apiUpdate(`/notices/${id}`, payload);
export const publish = (id) => apiCreate(`/notices/${id}/publish`);
export const unpublish = (id) => apiCreate(`/notices/${id}/unpublish`);
export const remove = (id) => apiDelete(`/notices/${id}`);
