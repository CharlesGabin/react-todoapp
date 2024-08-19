import { Categories, Todos } from "../../lib/utils";
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
  categories: Categories[];
  todos: Todos[];
};

const Category = ({ todos, categories }: PropsCategory) => {
  console.log(todos);

  return (
    <div className="flex flex-col justify-center w-full gap-2">
      <span className="text-sm font-light text-gray-500">Categories</span>
      <Accordion defaultIndex={[0]} allowToggle className="w-full">
        {categories
          ? categories.map((cat) => (
              <AccordionItem key={cat.id}>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      className="flex items-center justify-between w-full px-4 py-2 text-sm font-normal text-left rounded-lg font-poppins hover:bg-blue-200"
                    >
                      {cat.label}
                      <Box className="flex items-center justify-between gap-4">
                        <span className="text-sm font-light text-gray-500">
                          {
                            todos.filter((todo) => todo.categoryId == cat.id)
                              .length
                          }
                        </span>
                      </Box>
                      <AccordionIcon />
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <List>
                    {todos
                      .filter((tods) => tods.categoryId == cat.id)
                      .map((todo) => (
                        <ListItem
                          key={todo.id}
                          className="flex items-center justify-between w-full px-4 py-2 text-sm font-normal text-left rounded-lg font-poppins hover:bg-blue-200"
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
