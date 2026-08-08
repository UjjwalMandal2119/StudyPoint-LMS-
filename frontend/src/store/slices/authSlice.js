import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = () => {
  try {
    const token = localStorage.getItem('accessToken');
    const userJson = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    if (token && userJson) {
      return {
        token,
        user: JSON.parse(userJson),
        role,
      };
    }
  } catch (e) {
    // ignore and fall back to guest
  }
  return { token: null, user: null, role: null };
};

const initialState = loadFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user, role } = action.payload;
      state.token = accessToken;
      state.user = user;
      state.role = role;
      localStorage.setItem('accessToken', accessToken);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      if (role) {
        localStorage.setItem('role', role);
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
