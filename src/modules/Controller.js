import Todo from "./Todo.js";
import Project from "./Project.js";
import App from "./App.js";
// Controller module: This factory function will return the functionalities of a Controller, which will help control the state of a todo list app.
// It will create projects, todos, update projects & todos, and delete them.
export const Controller = (function () {
  function addProject(name, type, todos) {
    return new Project(name, type, todos || []);
  }

  function addTodo(
    projectName = "Home",
    title,
    description,
    dueDate,
    priority
  ) {
    return new Todo(projectName, title, description, dueDate, priority, false);
  }

  function deleteTodo(project, title) {
    let target = `${project.name.toLowerCase().replaceAll(" ", "_")}-${title
      .toLowerCase()
      .replaceAll(" ", "_")}`;
    for (let i = 0; i < project.todos.length; i++) {
      if (project.todos[i].code === target) {
        project.todos.splice(i, 1);
        break;
      }
    }
    window.localStorage.setItem(project.name, JSON.stringify(project));
  }

  function deleteProject(projectList, projectName) {
    for (let i = 0; i < projectList.length; i++) {
      if (projectList[i].name === projectName) {
        projectList.splice(i, 1);
        break;
      }
    }
    window.localStorage.removeItem(projectName);
  }

  function displayAllTodos(projectList) {
    for (const project of projectList) {
      for (const todo of project.todos) {
        todo.logInfo();
      }
    }
  }

  function displayAllProject(projectList) {
    for (const project of projectList) {
      console.log(project);
    }
  }

  function updateProjectTitle(project, name) {
    const oldName = project.name;
    project.name = name;
    window.localStorage.setItem(oldName, JSON.stringify(project));
  }

  function updateTodo(todo, title, description, dueDate, priority) {
    todo.update(title, description, dueDate, priority);
    window.localStorage.setItem(
      todo.projectName,
      JSON.stringify(App.getProject(todo.projectName))
    );
  }

  function updateTodoProgress(todo) {
    todo.checkDone();
    window.localStorage.setItem(
      todo.projectName,
      JSON.stringify(App.getProject(todo.projectName))
    );
  }

  return {
    addTodo,
    deleteTodo,
    addProject,
    deleteProject,
    displayAllTodos,
    displayAllProject,
    updateProjectTitle,
    updateTodo,
    updateTodoProgress,
  };
})();
