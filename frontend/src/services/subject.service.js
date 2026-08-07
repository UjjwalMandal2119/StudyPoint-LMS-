import { apiGet, apiCreate, apiUpdate, apiDelete } from '../services/crud';

export const list = (q = {}) => apiGet(`/subjects?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/subjects/${id}`);
export const getByCourse = (courseId, page = 0, size = 10) =>
  apiGet(`/subjects/course/${courseId}?page=${page}&size=${size}`);
export const getByTeacher = (teacherId, page = 0, size = 10) =>
  apiGet(`/subjects/teacher/${teacherId}?page=${page}&size=${size}`);
export const create = (payload) => apiCreate('/subjects', payload);
export const update = (id, payload) => apiUpdate(`/subjects/${id}`, payload);
export const remove = (id) => apiDelete(`/subjects/${id}`);
export const toggleActive = (id) => apiUpdate(`/subjects/${id}/toggle-active`, {});
