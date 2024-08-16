import { Box, Divider, Heading, HStack, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Todos } from "../../lib/utils";
import { useEffect, useState } from "react";
import { Circle } from "lucide-react";

const TodoList = () => {
  const location = useLocation();

  const [todosFiltered, setTodosFiltered] = useState<Todos[]>(
    location.state?.todos ?? []
  );

  const getCompletedTodos = () => {
    setTodosFiltered(
      location.state?.todos.filter((todo: Todos) => todo.isComplete === true)
    );
  };

  const getIncompletedTodos = () => {
    setTodosFiltered(
      location.state?.todos.filter((todo: Todos) => todo.isComplete === false)
    );
  };

  const getInboxTodos = () => {
    setTodosFiltered(
      location.state?.todos.filter((todo: Todos) => todo.categoryId === null)
    );
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
      setTodosFiltered(location.state?.todos);
    }
  }, [location.pathname]);

  return (
    <div className="p-4 w-full">
      <Heading className="text-2xl font-bold font-montserrat">
        {location.state?.label ?? "Today"}
      </Heading>
      <VStack className="mt-4 w-full">
        {todosFiltered.map((todo: Todos) => (
          <Box
            key={todo.id}
            className="flex flex-col gap-4 items-start p-4 w-full bg-blue-100"
          >
            <HStack className="flex gap-4 items-center">
              <Circle size="18" color="blue" />
              <p className="text-sm font-medium">{todo.title}</p>
            </HStack>
            <HStack className="flex items-center">
              <p className="text-sm font-light">{todo.description}</p>
            </HStack>
          </Box>
        )) ?? null}
      </VStack>
    </div>
  );
};

export default TodoList;
