import { Categories, Todos } from "../../lib/utils";
import { Button } from "@chakra-ui/react";
import { MenuIcon, Search } from "lucide-react";
import * as LucideIcons from "lucide-react";
import CategoryList from "./CategoryList.tsx";
import MenuItemsList from "./MenuItemsList";
import ModalComp from "./ModalComp";
import { SetStateAction, useState } from "react";

type MenuProps = {
  todos: Todos[];
  setTodos: React.Dispatch<SetStateAction<Todos[]>>;
  categories: Categories[];
};

const Menu = ({ todos, setTodos, categories }: MenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex flex-col w-full max-h-screen gap-8">
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
      <MenuItemsList />
      <CategoryList todos={todos} categories={categories} />
      <Button
        className="absolute p-2 m-auto rounded-full hover:shadow-lg hover:bg-blue-200 w-fit"
        variant="outline"
        onClick={() => setIsModalOpen(true)}
      >
        <LucideIcons.CirclePlus strokeWidth={1} size={40} />
      </Button>
      <ModalComp
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        setTodos={setTodos}
      />
    </div>
  );
};

export default Menu;
