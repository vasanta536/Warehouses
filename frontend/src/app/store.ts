// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import perPageReducer from '../features/counter/counterSlice';


export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    perPage: perPageReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
