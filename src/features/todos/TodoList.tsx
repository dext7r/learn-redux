import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Todo,
  addTodo,
  deleteTodo,
  selectTodos,
  toggleTodo,
} from "./todoSlice";
import styles from "./TodoList.module.css";

function TodoList() {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const isTextEmpty = text.trim() === "";
  const handleAddTodo = () => {
    const trimmedText = text.trim();
    if (trimmedText && !todos.find((todo) => todo.text === trimmedText)) {
      dispatch(addTodo(trimmedText));
      setText("");
    } else {
      alert(`已存在该项~`)
      setText("")
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set todo text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          disabled={isTextEmpty}
          className={`${styles.button} ${
            isTextEmpty ? styles.disabledButton : ""
          }`}
          onClick={handleAddTodo}
        >
          添加代办项
        </button>
      </div>
      <ul className={styles.list}>
        {todos.map((todo: Todo) => (
          <li key={todo.id} className={styles.listItem}>
            <span
              className={todo.completed ? styles.completed : ""}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button
              className={styles.button}
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoList;
