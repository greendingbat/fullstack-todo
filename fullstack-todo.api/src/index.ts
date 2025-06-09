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

// #endregion

app.listen(SERVER_PORT, () => {
  console.log(`server running on localhost:${SERVER_PORT}`);
});
