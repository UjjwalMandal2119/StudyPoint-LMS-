import { apiGet, apiCreate, apiUpdate } from './crud';

export const list = (q = {}) => apiGet(`/results?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/results/${id}`);
export const getByExam = (examId, page = 0, size = 10) =>
  apiGet(`/results/exam/${examId}?page=${page}&size=${size}`);
export const getByStudent = (studentId, page = 0, size = 10) =>
  apiGet(`/results/student/${studentId}?page=${page}&size=${size}`);
export const getByExamAndStudent = (examId, studentId) =>
  apiGet(`/results/exam/${examId}/student/${studentId}`);
export const create = (payload) => apiCreate('/results', payload);
export const publish = (id) => apiUpdate(`/results/${id}/publish`, {});
