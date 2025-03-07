import Project from "./Project.js";
import Todo from "./Todo.js";
import { Controller } from "./Controller.js";
import UI from "./UI.js";
import { format } from "date-fns";

// App module: this module will be the center of all modules. It will use the functionalities of all other logic modules,
// combine those and control the state of the app. It will also store the variables, arrays, todos, etc.

export default (function App() {
  let currentProject = "Home";
  let testProjectCounter = 1;
  const projList = [];

  function setCurrentProject(projectName) {
    currentProject = projectName;
  }

  function getCurrentProject() {
    return currentProject;
  }

  // *** Try to reformat using JavaScript's array methods
  function getAllTodos() {
    let allTodos = [];
    for (const project of projList) {
      allTodos.push(...project.todos);
    }
    return allTodos;
  }

  // *** Try to reformat using JavaScript's array methods
  function getTodayTodos() {
    let today = format(new Date(), "dd/MM/yyyy");
    let todayTodos = [];
    for (let project of projList) {
      for (let todo of project.todos) {
        if (todo.isToday()) {
          todayTodos.push(todo);
        }
      }
    }
    return todayTodos;
  }

  function createNewProject(projectName) {
    // actual code to creat new project will be implemented later
    let newProj = Controller.addProject(projectName, "custom");
    projList.push(newProj);
    setCurrentProject(newProj.name);
  }

  function createNewTodo(projectName, title, description, dueDate, priority) {
    // actual code to creat new todo will be implemented later
    let newTodo = Controller.addTodo(
      projectName,
      title,
      description,
      dueDate,
      priority
    );
    let project = projList.find((project) => project.name === projectName);
    project.todos.push(newTodo);
  }

  function getData() {
    return projList;
  }

  function getProject(projectName) {
    if (projectName === "Home") {
      return getAllTodos();
    } else if (projectName === "Today") {
      return getTodayTodos();
    } else {
      return projList.find((project) => project.name === projectName).todos;
    }
  }

  function init() {
    // create a homepage project and intialize with some todos
    const home = Controller.addProject("Home", "default");
    // home.fillRandomTodos(5);
    const today = Controller.addProject("Today", "default");
    const important = Controller.addProject("Important", "default");
    // important.fillRandomTodos(3);
    const task = Controller.addProject("Task", "default");
    // task.fillRandomTodos(2);
    projList.push(...[home, today, important, task]);

    // Load data from localStorage
    // let data = loadData();

    // process the data to start rendering page
    // let projectNames = getProjectNames(data); // this is used for navigation bar
    // let allTodos = getAllTodos(data);

    // Render main panel
    UI.renderMainPanel();

    // Render the navigation bar using project names
    UI.renderNavContent(projList);

    // Render the todos from home project
    UI.renderProject("Home");
  }
  return {
    init,
    createNewProject,
    createNewTodo,
    getData,
    getProject,
    setCurrentProject,
    getCurrentProject,
    getAllTodos,
    getTodayTodos,
  };
})();
