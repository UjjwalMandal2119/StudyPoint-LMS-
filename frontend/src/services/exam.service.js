import { apiGet, apiCreate, apiUpdate, apiDelete } from '../services/crud';

export const list = (q = {}) => apiGet(`/exams?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/exams/${id}`);
export const getByBatch = (batchId, page = 0, size = 10) =>
  apiGet(`/exams/batch/${batchId}?page=${page}&size=${size}`);
export const getBySubject = (subjectId, page = 0, size = 10) =>
  apiGet(`/exams/subject/${subjectId}?page=${page}&size=${size}`);
export const create = (payload) => apiCreate('/exams', payload);
export const update = (id, payload) => apiUpdate(`/exams/${id}`, payload);
export const remove = (id) => apiDelete(`/exams/${id}`);
export const publish = (id) => apiUpdate(`/exams/${id}/publish`, {});
