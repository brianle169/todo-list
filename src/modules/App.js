import { Controller } from "./Controller.js";
import UI from "./UI.js";
import Project from "./Project.js";
import Todo from "./Todo.js";
import { format, parseISO } from "date-fns";

// App module: this module will be the center of all modules. It will use the functionalities of all other logic modules,
// combine those and control the state of the app. It will also store the variables, arrays, todos, etc.

export default (function App() {
  let currentProject = "Home";
  const projList = [];

  // Function taken from MDN Web docs on localStorage
  function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        storage &&
        storage.length !== 0
      );
    }
  }

  function loadData() {
    if (storageAvailable("localStorage")) {
      if (window.localStorage.length === 0) {
        initializeData();
      }
      // What we want is a list of project objects, within there will be a list of todo objects
      const storage = window.localStorage;
      console.log(storage);

      // The array of projects
      for (let i = 0; i < storage.length; i++) {
        const project = JSON.parse(storage.getItem(storage.key(i)));
        const projObj = new Project(project.name, project.type, project.todos);
        for (let j = 0; j < projObj.todos.length; j++) {
          const currTodo = projObj.todos[j];
          projObj.todos[j] = new Todo(
            currTodo.projectName,
            currTodo.title,
            currTodo.description,
            new Date(currTodo.dueDate),
            currTodo.priority,
            currTodo.isDone
          );
        }
        projList.push(projObj);
      }
    } else {
      console.warn("window.localStorage is not available. Please check again!");
    }
  }

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
    return getAllTodos().filter(
      (todo) => todo.dueDate === format(new Date(), "PP")
    );
  }

  function getTodoByImportance() {
    return getAllTodos().filter((todo) => todo.priority === "high");
  }

  function createNewProject(projectName) {
    // actual code to creat new project will be implemented later
    let newProj = Controller.addProject(projectName, "custom");
    projList.push(newProj);
    setCurrentProject(newProj.name);
    window.localStorage.setItem(projectName, JSON.stringify(newProj));
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
    window.localStorage.setItem(
      projectName,
      JSON.stringify(getProject(projectName))
    );
  }

  function getData() {
    return projList;
  }

  function getProject(projectName) {
    return projList.find((project) => project.name === projectName);
  }

  function getTodosByProjectName(projectName) {
    if (projectName === "Home") {
      return getAllTodos();
    } else if (projectName === "Today") {
      return getTodayTodos();
    } else if (projectName === "Important") {
      return getTodoByImportance();
    } else {
      return projList.find((project) => project.name === projectName).todos;
    }
  }

  function getTodoByCode(code) {
    let allTodos = getAllTodos();
    return allTodos.find((todo) => todo.code === code);
  }

  function initializeData() {
    const home = Controller.addProject("Home", "default");
    const today = Controller.addProject("Today", "default");
    const important = Controller.addProject("Important", "default");
    const task = Controller.addProject("Task", "default");
    projList.push(...[home, today, important, task]);
    createNewTodo(
      "Home",
      "Welcome to To-Dojo",
      "Use this todo app to boost your productivity by 1000%",
      new Date(),
      "high"
    );
    pushToLocalStorage(projList);
  }

  function pushToLocalStorage(list) {
    for (let project of list) {
      window.localStorage.setItem(project.name, JSON.stringify(project));
    }
  }

  function init() {
    // create a homepage project and intialize with some todos
    loadData();

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
    getTodosByProjectName,
    setCurrentProject,
    getCurrentProject,
    getAllTodos,
    getTodayTodos,
    getTodoByCode,
  };
})();
