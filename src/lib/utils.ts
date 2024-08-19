export const MenuItems = [
  {
    id: 1,
    label: "Inbox",
    icon: "InboxIcon",
    link: "/inbox",
  },
  {
    id: 2,
    label: "Upcoming",
    icon: "CalendarClock",
    link: "/upcoming",
  },
  {
    id: 3,
    label: "Completed",
    icon: "ListTodo",
    link: "/completed",
  },
  {
    id: 4,
    label: "Today",
    icon: "CalendarDays",
    link: "/",
  },

  {
    id: 5,
    label: "Incompleted",
    icon: "AlertCircle",
    link: "/incompleted",
  },
];

export const API_URL = {
  todos: "http://localhost:3000/todos",
  categories: "http://localhost:3000/categories",
  priorities: "http://localhost:3000/priorities",
};

export type Categories = {
  id: number;
  label: string;
};

export type Todos = {
  id: string;
  title: string;
  description: string;
  categoryId: number;
  priorityId: number;
  isComplete: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
};
