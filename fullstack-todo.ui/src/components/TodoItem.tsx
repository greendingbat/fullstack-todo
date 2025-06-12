import { useState } from "react";
import { Button, Checkbox, Icon } from "semantic-ui-react";

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
      value={itemTitle}
      onChange={(e) => setItemTitle(e.target.value)}
      style={{
        width: "100%",
        fontSize: "1.5rem",
        textDecoration: completed ? "line-through" : "",
      }}
    />
  ) : (
    <h1
      style={{
        marginTop: "0px",
        textDecoration: completed ? "line-through" : "",
      }}
    >
      {itemTitle}
    </h1>
  );

  const descriptionComponent = editingState ? (
    <textarea
      value={itemDescription}
      onChange={(e) => setItemDescription(e.target.value)}
      style={{
        width: "100%",
        fontSize: "1rem",
        textDecoration: completed ? "line-through" : "",
      }}
    />
  ) : (
    <p
      style={{
        fontSize: "1rem",
        textDecoration: completed ? "line-through" : "",
      }}
    >
      {itemDescription}
    </p>
  );

  return (
    <div
      style={{
        border: "1px solid #ccc",
        backgroundColor: completed ? "#d9d9d9" : "#fff",
        margin: "4px 0",
        padding: "4px 8px",
        borderRadius: ".28571429rem", // value copied from semantic-ui button style
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
            }}
          >
            <Checkbox
              style={{ marginRight: "1rem" }}
              checked={completed}
              onChange={() =>
                handleCheckboxChange(id, itemTitle, itemDescription, !completed)
              }
            />
            {titleComponent}
          </div>
          {descriptionComponent}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            basic
            style={{
              marginRight: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
            }}
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
          <Button
            basic
            color="red"
            style={{
              marginRight: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => handleDeleteButtonClick(id)}
          >
            <Icon
              name="trash alternate"
              size="large"
              style={{ margin: "0 auto" }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
