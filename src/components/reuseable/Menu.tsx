import { API_URL, Todos } from "../../lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { MenuIcon, Search } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Category from "./Category";
import MenuItemsList from "./MenuItemsList";

const Menu = () => {
  const [todos, setTodos] = useState<Todos[]>([]);

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

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex relative flex-col gap-8 w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="inline-flex items-start text-lg font-medium text-center font-poppins">
          Menu
        </h1>
        <Button className="p-2 rounded-lg hover:bg-blue-200" variant="outline">
          <MenuIcon size={20} />
        </Button>
      </div>
      <div className="flex flex-row gap-2 items-center p-1 w-full bg-white rounded-lg">
        <Search size={20} className="items-center text-gray-500" />
        <input
          placeholder="Search..."
          className="p-1 w-full focus:outline-none"
        />
      </div>
      <MenuItemsList todos={todos} />
      <Category todos={todos} setTodos={setTodos} />
      <Button
        className="absolute p-2 m-auto rounded-full hover:shadow-lg hover:bg-blue-200 w-fit"
        variant="outline"
      >
        <LucideIcons.CirclePlus strokeWidth={1} size={40} />
      </Button>
    </div>
  );
};

export default Menu;
