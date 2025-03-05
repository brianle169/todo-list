import Project from "./Project.js";
import Todo from "./Todo.js";
import { Controller } from "./Controller.js";
import UI from "./UI.js";

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

  function createNewProject() {
    let newProj = Controller.addProject(
      `Test Custom ${testProjectCounter++}`,
      "custom"
    );
    projList.push(newProj);
    setCurrentProject(newProj.name);
  }

  function getData() {
    return projList;
  }

  function getProject(projectName) {
    return projList.find((project) => project.name === projectName);
  }

  function init() {
    // create a homepage project and intialize with some todos
    const home = Controller.addProject("Home", "default");
    home.fillRandomTodos(5);
    const today = Controller.addProject("Today", "default");
    const important = Controller.addProject("Important", "default");
    important.fillRandomTodos(3);
    const task = Controller.addProject("Task", "default");
    task.fillRandomTodos(2);
    const custom1 = Controller.addProject("Custom 1", "custom");
    custom1.fillRandomTodos(3);
    const custom2 = Controller.addProject("Custom 2", "custom");
    custom2.fillRandomTodos(2);
    const custom3 = Controller.addProject("Custom 3", "custom");
    custom3.fillRandomTodos(4);
    const custom4 = Controller.addProject("Custom 4", "custom");
    custom4.fillRandomTodos(1);
    projList.push(
      ...[home, today, important, task, custom1, custom2, custom3, custom4]
    );

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
    UI.renderHomeProject();
  }
  return {
    init,
    createNewProject,
    getData,
    getProject,
    setCurrentProject,
    getCurrentProject,
  };
})();
