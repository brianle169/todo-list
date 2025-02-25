// Project code goes below here.
import "./style.css";
import Todo from "./modules/Todo.js";

// Test Todo class
const td1 = new Todo(
  "title #1",
  "create todolist",
  new Date(2024, 12, 24),
  "high",
  false
);
td1.logInfo();
const defaultTodo = new Todo();
defaultTodo.logInfo();
