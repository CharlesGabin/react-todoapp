import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/reuseable/Menu";
import TodoList from "./components/pages/TodoList";
import { useEffect, useState } from "react";
import { API_URL, Categories, Todos } from "./lib/utils.ts";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [searchParams, setSearchParams] = useState("");

  const getTodos = () => {
    axios
      .get(API_URL.todos)
      .then((res) => {
        const TODOS = res.data;

        setTodos(TODOS);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const getCategories = () => {
    axios
      .get(API_URL.categories)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    getTodos();
    getCategories();
  }, []);

  return (
    <BrowserRouter>
      <main className="flex items-center justify-center bg-gray-50 font-poppins">
        <div className="flex flex-col md:flex-row w-full md:w-4/5 h-full md:h-screen m-auto">
          <aside className="flex flex-row md:flex-col w-full md:w-1/5 p-4 m-3 bg-blue-100 border-2 border-gray--300 rounded-lg overflow-auto">
            <Menu
              setSearchParam={setSearchParams}
              searchParam={searchParams}
              todos={todos}
              categories={categories}
              setTodos={setTodos}
            />
          </aside>
          <div className="flex flex-1 overflow-auto">
            <section className="flex flex-1 h-fit">
              <Routes>
                <Route
                  path="/"
                  element={
                    <TodoList
                      searchParam={searchParams}
                      todos={todos}
                      categories={categories}
                      setTodos={setTodos}
                    />
                  }
                />
                <Route
                  path="/inbox"
                  element={
                    <TodoList
                      todos={todos}
                      categories={categories}
                      setTodos={setTodos}
                      searchParam={searchParams}
                    />
                  }
                />
                <Route
                  path="/upcoming"
                  element={
                    <TodoList
                      todos={todos}
                      categories={categories}
                      setTodos={setTodos}
                      searchParam={searchParams}
                    />
                  }
                />
                <Route
                  path="/completed"
                  element={
                    <TodoList
                      todos={todos}
                      categories={categories}
                      setTodos={setTodos}
                      searchParam={searchParams}
                    />
                  }
                />
                <Route
                  path="/incompleted"
                  element={
                    <TodoList
                      todos={todos}
                      categories={categories}
                      setTodos={setTodos}
                      searchParam={searchParams}
                    />
                  }
                />
              </Routes>
            </section>
          </div>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
