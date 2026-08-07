import api from '../api/axios';

/**
 * Reads the standard ApiResponse envelope and returns { data, success, message, status }.
 * Throws a normalized error so callers can `catch` a friendly message.
 */
export async function request(method, url, payload) {
  try {
    const res = await api.request({ method, url, data: payload });
    const body = res.data || {};
    return {
      data: body.data,
      success: body.success !== undefined ? body.success : res.status >= 200 && res.status < 300,
      message: body.message,
      status: res.status,
    };
  } catch (err) {
    if (err.response) {
      const b = err.response.data || {};
      const normalized = new Error(b.message || `Request failed with status ${err.response.status}`);
      normalized.status = err.response.status;
      normalized.errors = b.errors;
      normalized.payload = b;
      throw normalized;
    }
    const net = new Error(err.message || 'Network error');
    net.status = 0;
    throw net;
  }
}

export const apiGet = (url) => request('GET', url);
export const apiCreate = (url, payload) => request('POST', url, payload);
export const apiUpdate = (url, payload) => request('PUT', url, payload);
export const apiDelete = (url) => request('DELETE', url);

export async function listPage(url) {
  const res = await apiGet(url);
  // Backend returns a Spring Page object under data: { content, totalElements, totalPages, number, size }
  const page = res.data;
  return {
    items: (page && page.content) || [],
    totalElements: page ? page.totalElements : 0,
    totalPages: page ? page.totalPages : 0,
    number: page ? page.number : 0,
    size: page ? page.size : 0,
  };
}
