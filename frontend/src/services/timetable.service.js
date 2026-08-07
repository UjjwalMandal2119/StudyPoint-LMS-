import { apiGet, apiCreate, apiUpdate, apiDelete } from './crud';

export const list = (q = {}) => apiGet(`/timetable?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/timetable/${id}`);
export const getByBatch = (batchId) => apiGet(`/timetable/batch/${batchId}`);
export const getByBatchAndDay = (batchId, day) =>
  apiGet(`/timetable/batch/${batchId}/day/${day}`);
export const create = (payload) => apiCreate('/timetable', payload);
export const update = (id, payload) => apiUpdate(`/timetable/${id}`, payload);
export const remove = (id) => apiDelete(`/timetable/${id}`);
export const toggleActive = (id) => apiUpdate(`/timetable/${id}/toggle-active`, {});
