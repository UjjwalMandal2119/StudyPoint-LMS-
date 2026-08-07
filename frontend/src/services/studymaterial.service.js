import { apiGet, apiCreate, apiUpdate, apiDelete } from '../services/crud';

export const list = (q = {}) => apiGet(`/study-materials?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const listPublic = (q = {}) => apiGet(`/study-materials/public?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const listBySubject = (subjectId, q = {}) =>
  apiGet(`/study-materials/subject/${subjectId}?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const listByBatch = (batchId, q = {}) =>
  apiGet(`/study-materials/batch/${batchId}?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/study-materials/${id}`);
export const create = (payload) => apiCreate('/study-materials', payload);
export const update = (id, payload) => apiUpdate(`/study-materials/${id}`, payload);
export const download = (id) => apiCreate(`/study-materials/${id}/download`);
export const remove = (id) => apiDelete(`/study-materials/${id}`);
