import { apiGet, apiCreate, apiUpdate, apiDelete } from '../services/crud';

export const list = (q = {}) => apiGet(`/discussions?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const listPinned = (q = {}) => apiGet(`/discussions/pinned?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const search = (term, q = {}) =>
  apiGet(`/discussions/search?q=${encodeURIComponent(term)}&page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const get = (id) => apiGet(`/discussions/${id}`);
export const create = (payload) => apiCreate('/discussions', payload);
export const update = (id, payload) => apiUpdate(`/discussions/${id}`, payload);
export const remove = (id) => apiDelete(`/discussions/${id}`);
export const like = (id) => apiCreate(`/discussions/${id}/like`);
export const resolve = (id) => apiCreate(`/discussions/${id}/resolve`);
export const close = (id) => apiCreate(`/discussions/${id}/close`);
export const pin = (id) => apiCreate(`/discussions/${id}/pin`);
export const unpin = (id) => apiCreate(`/discussions/${id}/unpin`);
export const report = (id, reason) =>
  apiCreate(`/discussions/${id}/report${reason ? `?reason=${encodeURIComponent(reason)}` : ''}`);
export const listReplies = (id, q = {}) =>
  apiGet(`/discussions/${id}/replies?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const addReply = (id, payload) => apiCreate(`/discussions/${id}/replies`, payload);
export const likeReply = (replyId) => apiCreate(`/discussions/replies/${replyId}/like`);
export const acceptAnswer = (replyId) => apiCreate(`/discussions/replies/${replyId}/accept`);
export const removeReply = (replyId) => apiDelete(`/discussions/replies/${replyId}`);
