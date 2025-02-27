import Project from "./Project.js";
import Todo from "./Todo.js";
import { Controller } from "./Controller.js";
import UI from "./UI.js";

// App module: this module will be the center of all modules. It will use the functionalities of all other logic modules,
// combine those and control the state of the app. It will also store the variables, arrays, todos, etc.

export default (function App() {
  let data;

  function loadData() {}

  function createNewProject(event) {}

  function init() {
    // create a homepage project and intialize with some todos
    const home = Controller.addProject("Home", "default");
    const today = Controller.addProject("Today", "default");
    const important = Controller.addProject("Important", "default");
    const task = Controller.addProject("Task", "default");
    const custom1 = Controller.addProject("Custom 1", "custom");
    const custom2 = Controller.addProject("Custom 2", "custom");
    const custom3 = Controller.addProject("Custom 3", "custom");
    const custom4 = Controller.addProject("Custom 4", "custom");
    const projList = [
      home,
      today,
      important,
      task,
      custom1,
      custom2,
      custom3,
      custom4,
    ];

    // Load data from localStorage
    // let data = loadData();

    // process the data to start rendering page
    // let projectNames = getProjectNames(data); // this is used for navigation bar
    // let allTodos = getAllTodos(data);

    // Render main panel
    UI.renderMainPanel();

    // Render the navigation bar using project names
    UI.renderNavContent(projList);

    // Render the todos
    // UI.renderTodoBody();
  }
  return { init, createNewProject };
})();
