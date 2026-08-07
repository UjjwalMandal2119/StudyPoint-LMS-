import { apiGet, apiCreate, apiUpdate, apiDelete } from '../services/crud';

export const list = (q = {}) => apiGet(`/batches?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/batches/${id}`);
export const getByCourse = (courseId, page = 0, size = 10) =>
  apiGet(`/batches/course/${courseId}?page=${page}&size=${size}`);
export const getByTeacher = (teacherId, page = 0, size = 10) =>
  apiGet(`/batches/teacher/${teacherId}?page=${page}&size=${size}`);
export const create = (payload) => apiCreate('/batches', payload);
export const update = (id, payload) => apiUpdate(`/batches/${id}`, payload);
export const remove = (id) => apiDelete(`/batches/${id}`);
export const toggleActive = (id) => apiUpdate(`/batches/${id}/toggle-active`, {});
