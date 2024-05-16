import { configureStore, ThunkAction, Action, Middleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todos/todoSlice';
import logger from 'redux-logger'

const isDevelopment = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();
    if (isDevelopment) {
      middleware.push(logger as Middleware<{}, any, any>);
    }
    return middleware;
  },});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
