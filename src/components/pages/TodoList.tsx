import { Box, Heading, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { API_URL, Categories, Todos } from "../../lib/utils";
import { useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { Trash } from "lucide-react";

const TodoList = ({
  todos,
  setTodos,
}: {
  todos: Todos[];
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
}) => {
  const location = useLocation();

  const [todosFiltered, setTodosFiltered] = useState<Todos[]>(
    location.state?.todos ?? []
  );

  console.log(todos);
  console.log(todosFiltered);

  const getCompletedTodos = () => {
    console.log(location.state.todos);
    setTodosFiltered(todos.filter((todo: Todos) => todo.isComplete === true));
  };

  const getIncompletedTodos = () => {
    console.log(location.state.todos);
    setTodosFiltered(todos.filter((todo: Todos) => todo.isComplete === false));
  };

  const getInboxTodos = () => {
    console.log(location.state.todos);
    setTodosFiltered(todos.filter((todo: Todos) => todo.categoryId === 0));
  };

  const handleCheckbox = (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);

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
          prevTodos.map((todo: Todos) => (todo.id === id ? updatedTodo : todo))
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
      isDelete: !todoToUpdate?.isDelete,
    };

    axios
      .put(API_URL.todos + "/" + id, todoChecked)
      .then((response) => {
        const deletedTodo = response.data;
        console.log(deletedTodo);
        setTodos((prevTodos) =>
          prevTodos.filter((todo: Todos) => todo.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      setTodosFiltered(todos);
    }
  }, [location.pathname, todos]);

  return (
    <div className="w-full h-full p-4">
      <Heading className="text-2xl font-bold font-montserrat">
        {location.state?.label ?? "Today"}
      </Heading>
      <VStack className="w-full h-full mt-4 overflow-y-scroll">
        {todosFiltered
          ? todosFiltered.map((todo: Todos) => (
              <Box
                key={todo.id}
                className="flex flex-col items-start w-full gap-4 p-4 bg-blue-100 rounded-lg"
              >
                <div className="flex items-center w-full gap-4 p-2">
                  <input
                    type="checkbox"
                    checked={todo.isComplete}
                    className="text-blue-500 checkbox checkbox-sm checkbox-info"
                    onChange={() => handleCheckbox(todo.id)}
                  />
                  <div className="flex flex-col items-start gap-2 grow ">
                    <p
                      className={clsx("text-sm font-medium", {
                        "line-through text-gray-500": todo.isComplete,
                      })}
                    >
                      {todo.title}
                    </p>
                    <p
                      className={clsx("text-sm font-medium", {
                        "line-through text-gray-500": todo.isComplete,
                      })}
                    >
                      {todo.description}
                    </p>
                  </div>
                  <div className="flex items-end gap-2 px-2 py-2 text-sm bg-white rounded-lg">
                    {
                      location.state?.categories.find(
                        (category: Categories) => category.id == todo.categoryId
                      )?.label
                    }
                  </div>
                  <button
                    className="btn btn-ghost"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </Box>
            )) ?? null
          : null}
      </VStack>
    </div>
  );
};

export default TodoList;
