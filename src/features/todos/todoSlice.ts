import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import mockTodos from '../mock/todos';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodosState {
  list: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  list: [],
  loading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: state.list.length ? state.list[state.list.length - 1].id + 1 : 1,
        text: action.payload,
        completed: false,
      };
      state.list.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    fetchTodosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.error = null;
      state.list = action.payload;
    },
    fetchTodosFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, fetchTodosStart, fetchTodosSuccess, fetchTodosFailure } = todoSlice.actions;

export const selectTodos = (state: { todos: TodosState }) => state.todos.list;

export const fetchTodos = (): AppThunk => async (dispatch) => {
  dispatch(fetchTodosStart());
  try {
    // 模拟异步请求
    setTimeout(() => {
      dispatch(fetchTodosSuccess(mockTodos));
    }, 1000);
  } catch (error) {
    dispatch(fetchTodosFailure((error as Error).message));
  }
};

export default todoSlice.reducer;
