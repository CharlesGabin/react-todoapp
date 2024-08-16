import { useEffect, useState } from "react";
import { API_URL, Categories, Todos } from "../../lib/utils";
import axios from "axios";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";

type PropsCategory = {
  todos: Todos[];
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
};

const Category = ({ todos, setTodos }: PropsCategory) => {
  const [cats, setCats] = useState<Categories[]>([]);

  console.log(todos);

  const getCategories = async () => {
    await axios
      .get(API_URL.categories)
      .then((res) => {
        setCats(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    setTodos(todos);
    getCategories();
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-center w-full">
      <span className="text-sm font-light text-gray-500">Categories</span>
      <Accordion defaultIndex={[0]} allowToggle className="w-full">
        {cats
          ? cats.map((cat) => (
              <AccordionItem key={cat.id}>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      className="flex justify-between items-center px-4 py-2 w-full text-sm font-normal text-left rounded-lg font-poppins hover:bg-blue-200"
                    >
                      {cat.label}
                      <Box className="flex gap-4 justify-between items-center">
                        <span className="text-sm font-light text-gray-500">
                          {
                            todos.filter((todo) => todo.categoryId === cat.id)
                              .length
                          }
                        </span>
                        <AccordionIcon />
                      </Box>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <List>
                    {todos
                      .filter((todo) => todo.categoryId === cat.id)
                      .map((todo) => (
                        <ListItem
                          key={todo.id}
                          className="flex justify-between items-center px-4 py-2 w-full text-sm font-normal text-left rounded-lg font-poppins hover:bg-blue-200"
                        >
                          <span className="text-sm font-light text-gray-500">
                            {todo.title}
                          </span>
                        </ListItem>
                      ))}
                  </List>
                </AccordionPanel>
              </AccordionItem>
            ))
          : null}
      </Accordion>
    </div>
  );
};

export default Category;
