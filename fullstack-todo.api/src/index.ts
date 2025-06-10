import express from "express";
import cors from "cors";
import { SERVER_PORT } from "./consts";
import { PrismaClient } from "./generated/prisma";

const app = express();
const prisma = new PrismaClient();

// automatically parses request objects into json
app.use(express.json());

app.use(cors());

// #region ENDPOINTS

app.get("/api/todoItems", async (req, res) => {
  const todoItems = await prisma.todoItem.findMany();

  res.json(todoItems);
});

app.post("/api/todoItems", async (req, res) => {
  const { itemTitle, itemDesc, completed = false } = req.body;

  // itemTitle and itemDesc are required fields
  if (!itemTitle || !itemDesc) {
    res.status(400).json({ error: "itemTitle and itemDesc are required" });
  }

  try {
    const todoItem = await prisma.todoItem.create({
      data: {
        itemTitle,
        itemDesc,
        completed,
      },
    });
    res.json(todoItem);
  } catch (error) {
    res.status(500).send("Error creating todo item");
  }
});

app.put("/api/todoItems/:id", async (req, res) => {
  const { id } = req.params;
  const { itemTitle, itemDesc, completed } = req.body;

  // for updating, itemTitle, itemDesc, and completed are required
  if (!itemTitle || !itemDesc || completed === undefined) {
    res
      .status(400)
      .json({ error: "itemTitle, itemDesc, and completed are required" });
  }

  if (isNaN(Number(id))) {
    res.status(400).json({ error: "ID must be a number" });
  }

  try {
    const todoItem = await prisma.todoItem.update({
      where: { id: Number(id) },
      data: {
        itemTitle,
        itemDesc,
        completed,
      },
    });
    res.json(todoItem);
  } catch (error) {
    res.status(500).send(`Error updating todo item with ID ${id}`);
  }
});

app.delete("/api/todoItems/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.status(400).json({ error: "ID must be a number" });
  }

  try {
    await prisma.todoItem.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send(`Error deleting todo item with ID ${id}`);
  }
});

// #endregion

app.listen(SERVER_PORT, () => {
  console.log(`server running on localhost:${SERVER_PORT}`);
});
