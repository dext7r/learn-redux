import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import TodoList from './features/todos/TodoList';
import { Counter } from './features/counter/Counter';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TodoList />} />
          <Route path="/Counter" element={<Counter />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;