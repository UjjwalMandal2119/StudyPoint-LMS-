import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

