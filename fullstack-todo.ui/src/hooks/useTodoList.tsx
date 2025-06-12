import { useCallback, useEffect, useRef, useState } from "react";
import type { ITodoItem } from "../types/types";
import TodoItem from "../components/TodoItem";
import {
  createTodoItem,
  deleteTodoItem,
  getTodoItems,
  updateTodoItem,
} from "../api/api";

const debounce = (callback: Function, delay: number) => {
  let timeoutId: number | undefined = undefined;

  return (...args: any[]) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, delay);
  };
};

export function useTodoList() {
  const [todoItems, setTodoItems] = useState<ITodoItem[]>([]);
  const addButtonDisabled = todoItems.some((item) => item.id === null);

  useEffect(() => {
    const fetchTodoItems = async () => {
      try {
        const items: ITodoItem[] = await getTodoItems();
        setTodoItems(items);
      } catch (error) {
        window.alert("Error fetching todo items");
      }
    };
    fetchTodoItems();
  }, []);

  const debouncedUpdate = useRef(
    debounce(
      async (id: number, title: string, desc: string, completed: boolean) => {
        // only send request to api if id exists, otherwise, the update will happen when save is clicked
        if (id !== null) {
          await updateTodoItem(id, title, desc, completed);
        }
      },
      500
    )
  );

  const handleCheckboxChange = useCallback(
    (
      id: number | null,
      itemTitle: string,
      itemDescription: string,
      completed: boolean
    ) => {
      debouncedUpdate.current(id, itemTitle, itemDescription, completed);
      setTodoItems((prevItems: ITodoItem[]) =>
        prevItems.map((item: ITodoItem) =>
          item.id === id
            ? {
                ...item,
                completed: completed,
                itemTitle,
                itemDesc: itemDescription,
              }
            : item
        )
      );
    },
    []
  );

  const handleAddTodoItemClick = useCallback(() => {
    const newTodoItem: ITodoItem = {
      id: null,
      itemTitle: "New Item",
      itemDesc: "Description of the new todo item",
      completed: false,
      editingProp: true,
    };
    setTodoItems((prevItems: ITodoItem[]) => [...prevItems, newTodoItem]);
  }, [setTodoItems]);

  const handleDeleteButtonClick = useCallback(
    async (id: number | null) => {
      try {
        // only delete if item exists in db already
        if (id !== null) {
          await deleteTodoItem(id as number);
        }
        setTodoItems((prevItems: ITodoItem[]) =>
          prevItems.filter((item: ITodoItem) => item.id !== id)
        );
      } catch (error) {
        window.alert(`Error deleting todo item with id ${id}.`);
      }
    },
    [setTodoItems]
  );

  const handleEditButtonClick = useCallback(
    async (
      id: number | null,
      index: number,
      editing: boolean,
      itemTitle: string,
      itemDescription: string,
      checked: boolean
    ) => {
      if (editing) {
        if (id === null) {
          // if id does not exist, create new
          try {
            const response = await createTodoItem(
              itemTitle,
              itemDescription,
              checked
            );
            // update state
            const newTodoItem: ITodoItem = {
              id: response.id,
              itemTitle: itemTitle,
              itemDesc: itemDescription,
              completed: checked,
              editingProp: false,
            };
            const updatedTodoItems = [...todoItems];
            updatedTodoItems[index] = newTodoItem; // replace the new item with the created one
            setTodoItems(updatedTodoItems);
          } catch (error) {
            window.alert(`Error creating todo item.`);
          }
        } else {
          // if id exists, update
          try {
            const response = await updateTodoItem(
              id,
              itemTitle,
              itemDescription,
              checked
            );
            const newTodoItem: ITodoItem = {
              id: response.id,
              itemTitle: itemTitle,
              itemDesc: itemDescription,
              completed: checked,
              editingProp: false,
            };
            const updatedTodoItems = [...todoItems];
            updatedTodoItems[index] = newTodoItem; // replace the new item with the created one
            setTodoItems(updatedTodoItems);
          } catch (error) {
            window.alert(`Error updating todo item with id ${id}.`);
          }
        }
      }
      return !editing;
    },
    [todoItems, createTodoItem, updateTodoItem]
  );

  const renderedTodoItems = todoItems.map((item, index) => (
    <TodoItem
      key={item.id}
      index={index}
      id={item.id}
      title={item.itemTitle}
      description={item.itemDesc}
      completed={item.completed}
      editingProp={item.editingProp}
      handleCheckboxChange={handleCheckboxChange}
      handleDeleteButtonClick={handleDeleteButtonClick}
      handleEditButtonClick={handleEditButtonClick}
    />
  ));

  return {
    renderedTodoItems,
    addButtonDisabled,
    handleAddTodoItemClick
  };
}
