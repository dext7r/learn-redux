import { configureStore, ThunkAction, Action, Middleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todos/todoSlice';
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { watchFetchTodos } from '../features/sagas';

const isDevelopment = process.env.NODE_ENV === 'development';

// 创建 redux-saga 中间件实例
const sagaMiddleware = createSagaMiddleware();

// 创建根 Saga 函数
function* rootSaga() {
  // 在此处放置你的所有 saga 函数
  yield all([
    watchFetchTodos(),
  ]);
}

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
    middleware.push(sagaMiddleware);
    return middleware;
  },});

  // 运行根 Saga 函数
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

