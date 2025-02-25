import Todo from "./Todo.js";
import Project from "./Project.js";
// Controller module: This factory function will return the functionalities of a Controller, which will control the state of a todo list app.
// It will create projects, todos, update projects & todos, and delete them.
export default function Controller() {
  const homeTodos = [];

  function addProject(name, description) {
    return new Project(name, description, []);
  }

  function addTodo(
    title,
    description,
    dueDate,
    priority,
    projectName = "home"
  ) {
    return new Todo(title, description, dueDate, priority, false, projectName);
  }

  function deleteTodo() {}

  function deleteProject() {}

  function displayAllTodos() {}

  function displayAllProject() {}

  function updateProjectInfo() {}

  function updateTodo() {}

  return {
    addTodo,
    deleteTodo,
    addProject,
    deleteProject,
    displayAllTodos,
    displayAllProject,
    updateProjectInfo,
    updateTodo,
  };
}
