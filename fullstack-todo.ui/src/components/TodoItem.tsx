import { useState } from "react";
import { Button, Checkbox, Icon } from "semantic-ui-react";
import "./todo-item.css";

interface ITodoItemProps {
  index: number; // used as key for deleting item that has not been saved yet
  id: number | null;
  title: string;
  description: string;
  completed: boolean;
  editingProp?: boolean;
  handleCheckboxChange: (
    id: number | null,
    itemTitle: string,
    itemDescription: string,
    completed: boolean
  ) => void;
  handleDeleteButtonClick: (id: number | null) => void;
  handleEditButtonClick: (
    id: number | null,
    index: number,
    editing: boolean,
    itemTitle: string,
    itemDescription: string,
    checked: boolean
  ) => Promise<boolean>;
}

const TodoItem = ({
  index,
  id,
  title,
  description,
  completed,
  editingProp,
  handleCheckboxChange,
  handleDeleteButtonClick,
  handleEditButtonClick,
}: ITodoItemProps) => {
  const [itemTitle, setItemTitle] = useState<string>(title);
  const [itemDescription, setItemDescription] = useState<string>(description);
  const [editingState, setEditingState] = useState<boolean>(
    editingProp || false
  );

  const titleComponent = editingState ? (
    <input
      type="text"
      className={`item-title-input ${completed ? "completed-text" : ""}`}
      value={itemTitle}
      onChange={(e) => setItemTitle(e.target.value)}
    />
  ) : (
    <h1 className={`item-title ${completed ? "completed-text" : ""}`}>
      {itemTitle}
    </h1>
  );

  const descriptionComponent = editingState ? (
    <textarea
      className={`item-description-input ${completed ? "completed-text" : ""}`}
      value={itemDescription}
      onChange={(e) => setItemDescription(e.target.value)}
    />
  ) : (
    <p className={`item-description ${completed ? "completed-text" : ""}`}>
      {itemDescription}
    </p>
  );

  return (
    <div
      className={`todo-item-container ${
        completed ? "completed-background" : ""
      }`}
    >
      <div>
        <div className="todo-item-title-container">
          <Checkbox
            className="todo-item-checkbox"
            checked={completed}
            onChange={() =>
              handleCheckboxChange(id, itemTitle, itemDescription, !completed)
            }
          />
          {titleComponent}
        </div>
        {descriptionComponent}
      </div>
      <div className="todo-item-button-container">
        <Button
          className="todo-item-edit-button"
          basic
          onClick={() =>
            handleEditButtonClick(
              id,
              index,
              editingState,
              itemTitle,
              itemDescription,
              completed
            ).then((result) => setEditingState(result))
          }
        >
          {editingState ? (
            "Save"
          ) : (
            <Icon
              name="pencil alternate"
              size="large"
              style={{ marginRight: "0px" }}
            />
          )}
        </Button>
        <Button basic color="red" onClick={() => handleDeleteButtonClick(id)}>
          <Icon
            name="trash alternate"
            size="large"
            style={{ margin: "0 auto" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
