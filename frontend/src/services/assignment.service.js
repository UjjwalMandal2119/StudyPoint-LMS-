import { apiGet, apiCreate, apiUpdate, apiDelete } from '../services/crud';

export const list = (q = {}) => apiGet(`/assignments?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/assignments/${id}`);
export const getByBatch = (batchId, page = 0, size = 10) =>
  apiGet(`/assignments/batch/${batchId}?page=${page}&size=${size}`);
export const getBySubject = (subjectId, page = 0, size = 10) =>
  apiGet(`/assignments/subject/${subjectId}?page=${page}&size=${size}`);
export const create = (payload) => apiCreate('/assignments', payload);
export const update = (id, payload) => apiUpdate(`/assignments/${id}`, payload);
export const remove = (id) => apiDelete(`/assignments/${id}`);
export const publish = (id) => apiUpdate(`/assignments/${id}/publish`, {});
