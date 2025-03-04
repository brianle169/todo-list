import App from "./App.js";
import { Controller } from "./Controller.js";
// UI module: controls the DOM
export default (function UI() {
  const body = document.querySelector("body");

  function createBanner() {
    // create banner with logo
    const banner = document.createElement("div");
    const bannerText = document.createElement("p");
    bannerText.textContent = "To-Dojo";
    banner.classList.add("banner");
    banner.appendChild(bannerText); // Ensure bannerText is appended to banner
    return banner;
  }

  function createFooter() {
    const footer = document.createElement("footer");
    footer.textContent = `© 2025 Cong Minh Le. All rights reserved.`;
    return footer;
  }

  function createNav() {
    const nav = document.createElement("nav");
    nav.classList.add("nav-bar");

    const defaultSection = document.createElement("div");
    defaultSection.classList.add(
      ...["project-name-container", "default-section"]
    );
    const customSection = document.createElement("div");
    customSection.classList.add(
      ...["project-name-container", "custom-section"]
    );

    const addProjectButton = document.createElement("button");
    addProjectButton.classList.add(...["btn", "add-project"]);
    addProjectButton.textContent = "Add Project";

    nav.appendChild(defaultSection);
    nav.appendChild(customSection);
    nav.appendChild(addProjectButton);
    return nav;
  }

  function createTodoBody() {
    const todoBody = document.createElement("div");
    todoBody.classList.add("todo-container");
    return todoBody;
  }

  function createMainPanel() {
    let mainPanel = document.createElement("div");
    let banner = createBanner();
    let nav = createNav();
    let todoBody = createTodoBody();
    let footer = createFooter();

    mainPanel.classList.add("main");
    mainPanel.appendChild(banner);
    mainPanel.appendChild(nav);
    mainPanel.appendChild(todoBody);
    mainPanel.appendChild(footer);
    return mainPanel;
  }

  function createTodoComponents(todo) {
    const todoItem = document.createElement("div");
    todoItem.textContent = todo.info;
    todoItem.classList.add(...["todo", `priority-${todo.priority}`]);
    return todoItem;
  }

  function createProjectComponents(project) {
    const projItem = document.createElement("div");
    projItem.classList.add(...["project-item", `type-${project.type}`]);
    projItem.id = `${project.name}`;
    projItem.textContent = `${project.name}`;
    return projItem;
  }

  function addProjectHandler() {
    console.log("Pressed");
    App.createNewProject();
    let newData = App.getData();
    console.log(newData);
    let nav = document.querySelector(".nav-bar");
    if (nav.innerHTML) {
      nav.innerHTML = "";
    }
    nav.innerHTML = createNav().innerHTML;

    renderNavContent(newData);
  }

  function renderMainPanel() {
    const mainPanel = createMainPanel();
    body.appendChild(mainPanel);
  }

  function renderTodos(projectName) {
    const todoBody = document.querySelector(".todo-container");
    todoBody.innerHTML = "";
    // get the correct project object
    const project = App.getProject(projectName);
    for (let todo of project.todos) {
      let todoItem = createTodoComponents(todo);
      todoBody.appendChild(todoItem);
    }
  }

  function renderAllTodos() {
    const data = App.getData();
    const todoBody = document.querySelector(".todo-container");
    for (let project of data) {
      for (let todo of project.todos) {
        let todoItem = createTodoComponents(todo);
        todoBody.appendChild(todoItem);
      }
    }
  }

  function renderNavContent(projectList) {
    const defaultSection = document.querySelector(".default-section");
    const customSection = document.querySelector(".custom-section");
    const addProjectButton = document.querySelector(".add-project");
    addProjectButton.addEventListener("click", addProjectHandler);

    // Create and add a title to custom section
    const customHeader = document.createElement("p");
    customHeader.textContent = "Projects";
    customHeader.classList.add("custom-section-header");
    customSection.appendChild(customHeader);

    // render default section first
    for (let project of projectList) {
      let projectItem = createProjectComponents(project);
      projectItem.addEventListener("click", (event) =>
        renderTodos(event.target.textContent)
      );
      if (project.type === "default") {
        defaultSection.appendChild(projectItem);
      } else {
        customSection.appendChild(projectItem);
      }
    }
  }
  return { renderMainPanel, renderNavContent, renderAllTodos };
})();
