import { useCallback, useRef, useState } from "react";
import { Button, Checkbox, Icon, type CheckboxProps } from "semantic-ui-react";

const debounce = (callback: Function, delay: number) => {
  let timeoutId: number | undefined = undefined;

  return (...args: any[]) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, delay);
  };
};

interface ITodoItemProps {
  title: string;
  description: string;
  completed: boolean;
}

const TodoItem = ({ title, description, completed }: ITodoItemProps) => {
  const [itemTitle, setItemTitle] = useState<string>(title);
  const [itemDescription, setItemDescription] = useState<string>(description);
  const [checked, setChecked] = useState<boolean>(completed);
  const [editing, setEditing] = useState<boolean>(false);

  const debouncedLogRef = useRef(
    debounce(() => console.log("sending update request"), 500)
  );

  const handleCheckboxChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      setChecked(data.checked as boolean);
      debouncedLogRef.current();
    },
    []
  );

  const handleEditButtonClick = useCallback(() => {
    if (editing) {
      // Save changes
      debouncedLogRef.current();
    }
    setEditing(!editing);
  }, [editing]);

  const titleComponent = editing ? (
    <input
      type="text"
      value={itemTitle}
      onChange={(e) => setItemTitle(e.target.value)}
      style={{
        width: "100%",
        fontSize: "1.5rem",
        textDecoration: checked ? "line-through" : "",
      }}
    />
  ) : (
    <h1
      style={{
        marginTop: "0px",
        textDecoration: checked ? "line-through" : "",
      }}
    >
      {itemTitle}
    </h1>
  );

  const descriptionComponent = editing ? (
    <textarea
      value={itemDescription}
      onChange={(e) => setItemDescription(e.target.value)}
      style={{
        width: "100%",
        fontSize: "1rem",
        textDecoration: checked ? "line-through" : "",
      }}
    />
  ) : (
    <p
      style={{
        fontSize: "1rem",
        textDecoration: checked ? "line-through" : "",
      }}
    >
      {itemDescription}
    </p>
  );

  return (
    <div
      style={{
        border: "1px solid #ccc",
        backgroundColor: checked ? "#d9d9d9" : "#fff",
        margin: "4px 0",
        padding: "4px",
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
              checked={checked}
              onChange={handleCheckboxChange}
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
            onClick={handleEditButtonClick}
          >
            {editing ? (
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
            onClick={() =>
              console.log("Delete functionality not implemented yet")
            }
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
