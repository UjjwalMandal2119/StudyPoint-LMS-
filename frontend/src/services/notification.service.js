import { apiGet, apiCreate, apiDelete } from '../services/crud';

export const listMy = (q = {}) => apiGet(`/notifications/my?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const listUnread = (q = {}) => apiGet(`/notifications/unread?page=${q.page ?? 0}&size=${q.size ?? 10}`);
export const unreadCount = () => apiGet('/notifications/unread-count');
export const get = (id) => apiGet(`/notifications/${id}`);
export const markRead = (id) => apiCreate(`/notifications/${id}/read`);
export const markAllRead = () => apiCreate('/notifications/mark-all-read');
export const remove = (id) => apiDelete(`/notifications/${id}`);
export const create = (payload) => apiCreate('/notifications', payload);
