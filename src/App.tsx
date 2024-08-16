import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/reuseable/Menu";
import TodoList from "./components/pages/TodoList";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex w-4/5 h-4/5 bg-blue-50 rounded-lg shadow-lg">
          <aside className="flex flex-col p-4 m-3 w-1/5 bg-blue-100 rounded-lg">
            <Menu />
          </aside>
          <section className="flex flex-1 h-full">
            <Routes>
              <Route path="/" element={<TodoList />} />

              <Route path="/inbox" element={<TodoList />} />
              <Route path="/upcoming" element={<TodoList />} />
              <Route path="/completed" element={<TodoList />} />
              <Route path="/incompleted" element={<TodoList />} />
            </Routes>
          </section>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
