import { Button } from "semantic-ui-react";
import TodoItem from "./TodoItem";

function App() {
  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <header
        style={{
          backgroundColor: "#21ba45",
          color: "white",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <h1>Todo List</h1>
        <p>
          Fullstack todo list built using React, Semantic UI, Typescript,
          Express JS, and Postgres
        </p>
      </header>
      <div
        style={{
          padding: "2rem",
          maxWidth: "600px",
          margin: "0 auto",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TodoItem
          title={"Sample Todo"}
          description="This is a sample todo item."
          completed={false}
        />
        <TodoItem
          title={"Another Todo"}
          description="This is another todo item."
          completed={true}
        />
        <TodoItem
          title={"Yet Another Todo"}
          description="This is yet another todo item."
          completed={false}
        />
        <TodoItem
          title={"Final Todo"}
          description="This is the final todo item."
          completed={true}
        />
        <TodoItem
          title={"Last Todo"}
          description="This is the last todo item."
          completed={false}
        />
        <TodoItem
          title={"Extra Todo"}
          description="This is an extra todo item."
          completed={true}
        />
        <TodoItem
          title={"Bonus Todo"}
          description="This is a bonus todo item."
          completed={false}
        />
        <TodoItem
          title={"Special Todo"}
          description="This is a special todo item."
          completed={true}
        />
        <Button icon="plus" color="green"/>
      </div>
    </div>
  );
}

export default App;
