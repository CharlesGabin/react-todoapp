import { API_URL, Categories, Todos } from "../../lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { MenuIcon, Search } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Category from "./Category";
import MenuItemsList from "./MenuItemsList";
import ModalComp from "./ModalComp";

const Menu = ({ todos }: { todos: Todos[] }) => {
  const [cats, setCats] = useState<Categories[]>([]);
  const [todosMenu, setTodos] = useState<Todos[]>(todos);

  console.log(todos);

  const getCategories = () => {
    axios
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
    getCategories();
  }, []);

  return (
    <div className="relative flex flex-col w-full gap-8">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="inline-flex items-start text-lg font-medium text-center font-poppins">
          Menu
        </h1>
        <Button className="p-2 rounded-lg hover:bg-blue-200" variant="outline">
          <MenuIcon size={20} />
        </Button>
      </div>
      <div className="flex flex-row items-center w-full gap-2 p-1 bg-white rounded-lg">
        <Search size={20} className="items-center text-gray-500" />
        <input
          placeholder="Search..."
          className="w-full p-1 focus:outline-none"
        />
      </div>
      <MenuItemsList todos={todos} categories={cats} />
      <Category todos={todos} categories={cats} />
      <Button
        className="absolute p-2 m-auto rounded-full hover:shadow-lg hover:bg-blue-200 w-fit"
        variant="outline"
        onClick={() => document.getElementById("my_modal_1")?.showModal()}
      >
        <LucideIcons.CirclePlus strokeWidth={1} size={40} />
      </Button>
      <ModalComp categories={cats} setTodos={setTodos} />
    </div>
  );
};

export default Menu;
