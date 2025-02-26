import Project from "./Project.js";
import Todo from "./Todo.js";
import { Controller } from "./Controller.js";
import UI from "./UI.js";

// App module: this module will be the center of all modules. It will use the functionalities of all other logic modules,
// combine those and control the state of the app. It will also store the variables, arrays, todos, etc.

export default (function App() {
  function init() {
    // Render main panel
    UI.renderMainPanel();
    // create a homepage project and intialize with some todos
    const home = new Project("home", []);
    home.fillRandomTodos(10);
  }
  return { init };
})();
