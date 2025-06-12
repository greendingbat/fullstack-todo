import { Button } from "semantic-ui-react";
import "./todo-list.css";
import { useTodoList } from "../hooks/useTodoList";

function TodoList() {
  const { renderedTodoItems, addButtonDisabled, handleAddTodoItemClick } =
    useTodoList();

  return (
    <div className="todo-list-container">
      <header className="todo-list-header">
        <h1>Todo List</h1>
        <p>
          Fullstack todo list built using React, Semantic UI, Typescript,
          Express JS, and Postgres
        </p>
      </header>
      <div className="todo-list-center-content">
        {renderedTodoItems}
        <Button
          icon="plus"
          color="green"
          onClick={handleAddTodoItemClick}
          disabled={addButtonDisabled}
        />
      </div>
    </div>
  );
}

export default TodoList;
