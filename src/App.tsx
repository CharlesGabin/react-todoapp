import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/reuseable/Menu";
import TodoList from "./components/pages/TodoList";
import { useEffect, useState } from "react";
import { API_URL, Todos } from "./lib/utils";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState<Todos[]>([]);

  const getTodos = () => {
    axios
      .get(API_URL.todos)
      .then((res) => {
        const TODOS = res.data;
        console.log(TODOS);

        setTodos(TODOS);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <BrowserRouter>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex w-4/5 rounded-lg shadow-lg h-4/5 bg-blue-50">
          <aside className="flex flex-col w-1/5 p-4 m-3 bg-blue-100 rounded-lg">
            <Menu todos={todos} />
          </aside>
          <section className="flex flex-1 h-full">
            <Routes>
              <Route
                path="/"
                element={<TodoList todos={todos} setTodos={setTodos} />}
              />

              <Route
                path="/inbox"
                element={<TodoList todos={todos} setTodos={setTodos} />}
              />
              <Route
                path="/upcoming"
                element={<TodoList todos={todos} setTodos={setTodos} />}
              />
              <Route
                path="/completed"
                element={<TodoList todos={todos} setTodos={setTodos} />}
              />
              <Route
                path="/incompleted"
                element={<TodoList todos={todos} setTodos={setTodos} />}
              />
            </Routes>
          </section>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
