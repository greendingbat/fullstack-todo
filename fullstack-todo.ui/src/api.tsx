import axios from "axios";
import type { ITodoItem } from "./types";

export async function createTodoItem(
  itemTitle: string,
  itemDesc: string,
  completed: boolean = false
) {
  const response = await axios.post("http://localhost:5000/api/todoItems", {
    itemTitle,
    itemDesc,
    completed,
  });
  return response.data;
}

export async function getTodoItems(): Promise<ITodoItem[]> {
  const response = await axios.get("http://localhost:5000/api/todoItems");
  return response.data;
}

export async function updateTodoItem(
  id: number,
  itemTitle: string,
  itemDesc: string,
  completed: boolean
) {
  const response = await axios.put(
    `http://localhost:5000/api/todoItems/${id}`,
    {
      itemTitle,
      itemDesc,
      completed,
    }
  );
  return response.data;
}

export async function deleteTodoItem(id: number) {
  const response = await axios.delete(
    `http://localhost:5000/api/todoItems/${id}`
  );
  return response.data;
}
