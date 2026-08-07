import { apiGet, apiCreate, apiUpdate, apiDelete } from '../services/crud';

export const list = (q = {}) => apiGet(`/questions?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/questions/${id}`);
export const getBySubject = (subjectId, page = 0, size = 10) =>
  apiGet(`/questions/subject/${subjectId}?page=${page}&size=${size}`);
export const getApprovedBySubject = (subjectId, page = 0, size = 10) =>
  apiGet(`/questions/subject/${subjectId}/approved?page=${page}&size=${size}`);
export const create = (payload) => apiCreate('/questions', payload);
export const createBulk = (payload) => apiCreate('/questions/bulk', payload);
export const update = (id, payload) => apiUpdate(`/questions/${id}`, payload);
export const remove = (id) => apiDelete(`/questions/${id}`);
export const approve = (id) => apiUpdate(`/questions/${id}/approve`, {});
