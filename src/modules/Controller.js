import Todo from "./Todo.js";
import Project from "./Project.js";
// Controller module: This factory function will return the functionalities of a Controller, which will help control the state of a todo list app.
// It will create projects, todos, update projects & todos, and delete them.
export const Controller = (function () {
  function addProject(name, type) {
    return new Project(name, type, []);
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

  function deleteTodo(project, projectName = "Home", title) {
    let target = `${projectName.toLowerCase()}-${title
      .toLowerCase()
      .replaceAll(" ", "_")}`;
    for (let i = 0; i < project.length; i++) {
      if (project[i].code === target) {
        project.splice(i, 1);
        break;
      }
    }
  }

  function deleteProject(projectList, projectName) {
    for (let i = 0; i < projectList.length; i++) {
      if (projectList[i].name === projectName) {
        projectList.splice(i, 1);
        break;
      }
    }
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

  function updateProjectTitle(project, title) {
    project.title = title;
  }

  function updateTodo(todo, title, description, dueDate, priority) {
    todo.update(title, description, dueDate, priority);
  }

  function todoDone(todo) {
    todo.checkDone();
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
    todoDone,
  };
})();
