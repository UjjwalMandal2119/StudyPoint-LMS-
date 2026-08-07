import api from '../api/axios';

const extract = (response) => {
  const data = response.data.data;
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: {
      userId: data.userId,
      username: data.username,
      email: data.email,
    },
    role: data.role,
  };
};

export const login = async (usernameOrEmail, password) => {
  const response = await api.post('/auth/login', { usernameOrEmail, password });
  return extract(response);
};

export const register = async (payload) => {
  const response = await api.post('/auth/register', payload);
  return extract(response);
};

export default { login, register };
