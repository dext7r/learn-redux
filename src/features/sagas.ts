import { put, takeEvery } from 'redux-saga/effects';
import { Todo, fetchTodosFailure, fetchTodosSuccess } from './todos/todoSlice';

// 模拟异步获取 todos 的函数
const fetchTodosFromAPI = () => {
  return new Promise<Todo[]>((resolve, reject) => {
    setTimeout(() => {
      // 这里假设从 API 获取到了 todos 数据
      const todos: Todo[] = [
        { id: 1, text: 'Todo 1', completed: false },
        { id: 2, text: 'Todo 2', completed: true },
      ];
      resolve(todos);
    }, 1000);
  });
};

// 处理获取 todos 的 saga 函数
function* fetchTodosWorkerSaga(): Generator<any, void, Todo[]> {
  try {
    const todos = yield fetchTodosFromAPI();
    yield put(fetchTodosSuccess(todos));
  } catch (error: any) { // 使用类型断言将 error 转换为 string 类型
    yield put(fetchTodosFailure(error as string));
  }
}

// 监听获取 todos 的 action
export function* watchFetchTodos() {
  yield takeEvery('todos/fetchTodos', fetchTodosWorkerSaga);
}
