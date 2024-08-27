import { Box, Heading, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { API_URL, Categories, Todos } from "../../lib/utils";
import { SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { Trash } from "lucide-react";

type TodoProps = {
  todos: Todos[];
  setTodos: React.Dispatch<SetStateAction<Todos[]>>;
  categories: Categories[];
  searchParam: string;
};

const TodoList = ({ todos, setTodos, categories, searchParam }: TodoProps) => {
  const location = useLocation();

  const todoNotDeleted = todos.filter((todo: Todos) => !todo.isDelete);

  const [todosFiltered, setTodosFiltered] = useState<Todos[]>(todoNotDeleted);

  const getTodayTodos = () => {
    // todoNotDeleted = todos.filter((todo: Todos) => !todo.isDelete);
    setTodosFiltered(todoNotDeleted);
  };

  const getCompletedTodos = () => {
    setTodosFiltered(todoNotDeleted.filter((todo: Todos) => todo.isComplete));
  };

  const getIncompletedTodos = () => {
    setTodosFiltered(todoNotDeleted.filter((todo: Todos) => !todo.isComplete));
  };

  const getInboxTodos = () => {
    setTodosFiltered(
      todoNotDeleted.filter((todo: Todos) => todo.categoryId === 0),
    );
  };

  const handleCheckbox = (id: string) => {
    const todoToUpdate = todoNotDeleted.find((todo) => todo.id === id);

    const todoChecked = {
      ...todoToUpdate,
      isComplete: !todoToUpdate?.isComplete,
    };

    axios
      .put(API_URL.todos + "/" + id, todoChecked)
      .then((response) => {
        const updatedTodo = response.data;
        console.log(updatedTodo);

        setTodos((prevTodos) =>
          prevTodos.map((todo: Todos) => (todo.id === id ? updatedTodo : todo)),
        );
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(todos);
    console.log(todosFiltered);
  };

  const deleteTodo = (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);

    const todoChecked = {
      ...todoToUpdate,
      isDelete: true,
    };

    axios
      .put(API_URL.todos + "/" + id, todoChecked)
      .then((response) => {
        const deletedTodo = response.data;
        console.log(deletedTodo);
        // setTodos((prevTodos) =>
        //   prevTodos.filter((todo: Todos) => todo.id !== id),
        // );
        setTodos((prevTodos) =>
          prevTodos.map((todo: Todos) => (todo.id === id ? deletedTodo : todo)),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = () => {
    let todoSearched = todoNotDeleted;
    if (searchParam) {
      todoSearched = todoNotDeleted.filter((todo) =>
        todo.title.includes(searchParam),
      );
      setTodosFiltered(todoSearched);
    }
    setTodosFiltered(todoSearched);
  };

  useEffect(() => {
    handleSearch();
  }, [searchParam]);

  useEffect(() => {
    if (location.pathname === "/completed") {
      getCompletedTodos();
    }
    if (location.pathname === "/incompleted") {
      getIncompletedTodos();
    }
    if (location.pathname === "/inbox") {
      getInboxTodos();
    }
    if (location.pathname === "/") {
      getTodayTodos();
    }
    console.log(location.state?.todos);
  }, [location.pathname, todos]);

  return (
    <div className="w-full p-4">
      {searchParam}
      <Heading className="text-2xl font-bold font-montserrat">
        {location.state?.label ?? "Today"}
      </Heading>
      <VStack className="w-full h-full mt-4">
        {todosFiltered
          ? (todosFiltered.map((todo: Todos) => (
              <Box
                key={todo.id}
                className="flex flex-col items-start w-full border-gray-300 border-2 gap-4 p-4 bg-blue-100 rounded-lg"
              >
                <div className="flex items-center w-full gap-4 p-2 ">
                  <input
                    type="checkbox"
                    checked={todo.isComplete}
                    className="text-blue-500 checkbox checkbox-sm checkbox-info"
                    onChange={() => handleCheckbox(todo.id)}
                  />
                  <div className="flex flex-col items-start gap-2 grow ">
                    <p
                      className={clsx("text-[1rem] font-bold", {
                        "line-through text-gray-500": todo.isComplete,
                      })}
                    >
                      {todo.title}
                    </p>
                    <p
                      className={clsx("text-[.8rem] font-medium", {
                        "line-through text-gray-500": todo.isComplete,
                      })}
                    >
                      {todo.description}
                    </p>
                  </div>
                  {todo.categoryId === 0 ? null : (
                    <div className="badge text-gray-600 font-poppins text-sm badge-lg badge-outline border-gray-400">
                      {
                        categories.find(
                          (category: Categories) =>
                            category.id == todo.categoryId,
                        )?.label
                      }
                    </div>
                  )}
                  <button
                    className="bg-red-500 p-3 rounded-lg hover:bg-red-700"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash size={15} />
                  </button>
                </div>
              </Box>
            )) ?? null)
          : null}
      </VStack>
    </div>
  );
};

export default TodoList;
