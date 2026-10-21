import { apiGet } from './crud';

export async function listPublicPrograms() {
  const response = await apiGet('/public/programs');
  if (!Array.isArray(response.data)) {
    throw new Error('The public program catalog returned an unexpected response.');
  }
  return response.data;
}
