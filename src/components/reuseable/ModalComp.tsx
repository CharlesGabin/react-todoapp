import { useState } from "react";
import { API_URL, Categories, Todos } from "../../lib/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  categories: Categories[];
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
};

const ModalComp = ({ categories, setTodos }: ModalProps) => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    categoryId: 0,
    priorityId: 0,
    isComplete: false,
    isDelete: false,
    createdAt: "",
    updatedAt: "",
  });

  const handleSubmit = async () => {
    // e.preventDefault();
    await axios
      .post(API_URL.todos, todo)
      .then((res) => {
        console.log(res.data);
        const newTodo = res.data;
        setTodos((prevItems) => [...prevItems, newTodo]);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(todo);
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="bg-blue-300 modal-box">
        <h3 className="text-lg font-bold">Add TODO</h3>
      </div>
      <form
        method="dialog"
        className="flex flex-col items-center justify-center gap-4 border-2 border-yellow-200 modal-backdrop"
        onSubmit={handleSubmit}
      >
        <input
          type="input"
          placeholder="title"
          value={todo.title}
          className="input input-sm"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <input
          type="input"
          value={todo.description}
          placeholder="description"
          className="input input-sm"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <select
          className="select select-sm"
          value={todo.categoryId}
          onChange={(e) =>
            setTodo({ ...todo, categoryId: Number(e.target.value) })
          }
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
          {/* <option disabled selected>
                Pick your favorite Simpson
              </option>
              <option>Homer</option>
              <option>Marge</option>
              <option>Bart</option>
              <option>Lisa</option>
              <option>Maggie</option> */}
        </select>
        <div className="flex justify-end gap-4">
          <button type="submit" className="btn btn-sm btn-info">
            Submit
          </button>
        </div>
      </form>
      <button className="btn btn-sm btn-info">Close</button>
    </dialog>
  );
};

export default ModalComp;
