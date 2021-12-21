import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import TodoModel from "./TODOSchema/todoSchema.js";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT || 9000;
const url = process.env.DB_URL;
app.use(express.json());
app.use(cors());

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //if database is connected successfully
    console.log("database connected successfully................");
  })
  .catch((error) => {
    //if an error occurs
    console.log(error);
  });
///////////////////////////////////////
//home route
app.get("/", (req, res) => {
  res.send("Wellcome to Monica's todo API");
});
//d\get all Todos route
app.get("/todos", async (req, res) => {
  const todo = await TodoModel.find({});

  if (todo) {
    return res.status(200).json({
      massage: "Fetch all todo from database",

      data: todo,
    });
  } else {
    return res.status(400).json({
      massage: "failed to fetch todos from database",
    });
  }
});

//create a new todo in y
app.post("/create", async (req, res) => {
  const { title, description, isCompleted } = req.body;
  const createTodo = await TodoModel.create({
    title,
    description,
    isCompleted,
  });
  if (createTodo) {
    return res.status(200).json({
      message: "Todo created successfull",
      date: "createTodo",
    });
  } else {
    return res.status(400).json({
      message: "failed to create a new todo",
    });
  }
});

// /update:
app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  const updateTodo = await TodoModel.updateOne({
    isCompleted: isCompleted,
  }).where({ _id: id });

  if (updateTodo) {
    return res.status(200).json({
      massage: "todo updated was successfull ",

      data: updateTodo,
    });
  } else {
    return res.status(400).json({
      massage: "faild to update todo",
    });
  }
});

///delete todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const deleteTodo = await TodoModel.findByIdAndDelete({ _id: id });
  if (deleteTodo) {
    return res.status(200).json({});
  } else {
    return res.status(400).json({
      message: "todo deleted successfully",
    });
  }
});

app.listen(port, () => {
  console.log(`Todo server running at ${port}`);
});

http://localhost:9000/create