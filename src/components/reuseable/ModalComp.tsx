import { API_URL, Categories, Todos } from "../../lib/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircleX } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { useState } from "react";

type ModalProps = {
  categories: Categories[];
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
  isOpen: boolean;
  onClose: () => void;
};

const todoSchema = z.object({
  title: z.string().min(2, "The title must have at least 2 characters"),
  description: z
    .string()
    .min(2, "The description must have at least 2 characters"),
  categoryId: z.string(),
  priorityId: z.number().optional(),
  isComplete: z.boolean().optional(),
  isDelete: z.boolean().optional(),
  createdAt: z.string().optional(),
  date: z.string().optional(),
});

const ModalComp = ({ categories, setTodos, isOpen, onClose }: ModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
  });

  const [date, setDate] = useState<Date>();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const onSubmit = async (data: Todos, e) => {
    data.isComplete = false;
    data.isDelete = false;
    data.categoryId = Number(data.categoryId);
    data.date = data.date.toString();
    console.log(data);
    e.preventDefault();
    try {
      const res = await axios.post(API_URL.todos, data);
      const newTodo = res.data;
      setTodos((prevItems) => [...prevItems, newTodo]);
      toast.success("Successful created !");
      onClose();
      // alert("Todo succesfully created");
      reset();
      navigate("/");
    } catch (err) {
      console.log("An error occurs during the creation", err);
      toast.error("An error occurs during the creation");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      // onClick={(e) => handleOverlayClick(e)}
    >
      <Toaster position="top-center" richColors />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col items-center gap-2 w-3/5 h-3/5 p-4 rounded shadow-lg z-10 bg-white">
        <button
          onClick={onClose}
          className="absolute -top-6 -right-6 p-3 rounded-full"
        >
          <CircleX color="red" size={35} />
        </button>
        <h3 className="text-2xl font-bold uppercase">Add a To-Do</h3>

        <form
          className="flex flex-col items-center h-full justify-center gap-4 border-2 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-4 items-center w-4/5">
            <label htmlFor="" className="w-1/5">
              Title
            </label>
            <input
              className="input w-3/5 p-1 input-sm"
              type="input"
              placeholder="Title"
              {...register("title")}
            />
          </div>
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
          <div className="flex gap-4 items-center w-4/5">
            <label htmlFor="" className="w-1/5">
              Description
            </label>
            <input
              type="input"
              // value={todo.description}
              placeholder="Description"
              className="input w-3/5 p-1 input-sm"
              {...register("description")}
              // onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            />
          </div>
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
          <div className="flex gap-4 items-center w-4/5">
            <label htmlFor="" className="w-1/5">
              Categories
            </label>
            <select
              className="select select-sm w-3/5 p-1"
              // value={todo.categoryId}
              // onChange={(e) =>
              //   setTodo({ ...todo, categoryId: Number(e.target.value) })
              // }
              {...register("categoryId")}
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 items-center w-4/5">
            <label htmlFor="date" className="w-1/5">
              Date
            </label>
            <input
              type="date"
              className="input w-3/5 p-1 input-sm"
              {...register("date")}
            />
          </div>
          <button type="submit" className="w-3/6 btn btn-sm btn-info">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalComp;
