// Project code goes below here.
import "./style.css";
import Todo from "./modules/Todo.js";
import Project from "./modules/Project.js";

// Test Todo class
const project = new Project(
  "To-do List Project",
  "Build a todo list app, using webpack and OOP concepts",
  []
);

project.fillRandomTodos(5);
project.logTodos();
