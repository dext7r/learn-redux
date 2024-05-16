import React from "react";
import { Link, Routes, Route } from "react-router-dom"; // 使用 Routes 和 Route
import TodoList from "../features/todos/TodoList";
import { Counter } from "../features/counter/Counter";

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {" "}
              <Link to="/Counter">Counter</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/Counter" element={<Counter />} />
        </Routes>
      </main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default Layout;
