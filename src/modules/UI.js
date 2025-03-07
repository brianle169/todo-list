import App from "./App.js";
import { Controller } from "./Controller.js";
import { add, format } from "date-fns";
// UI module: controls the DOM
export default (function UI() {
  const body = document.querySelector("body");

  function createBanner(text) {
    // create banner with logo
    const banner = document.createElement("div");
    const bannerText = document.createElement("p");
    bannerText.textContent = text || "To-Dojo";
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

    nav.appendChild(defaultSection);
    nav.appendChild(customSection);
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
    if (App.getCurrentProject() === project.name) {
      projItem.classList.add("selected");
    }
    projItem.id = `${project.name}`;
    projItem.textContent = `${project.name}`;
    return projItem;
  }

  function createAddProjectButton() {
    const addProjectButton = document.createElement("button");
    addProjectButton.classList.add(...["btn", "add-project"]);
    addProjectButton.textContent = "Add Project";
    addProjectButton.addEventListener("click", addProjectHandler);
    return addProjectButton;
  }

  function createAddTodoButton() {
    const addTodoButton = document.createElement("button");
    addTodoButton.classList.add(...["btn", "add-todo"]);
    addTodoButton.textContent = "Add Todo";
    addTodoButton.addEventListener("click", addTodoHandler);
    return addTodoButton;
  }

  function createAddProjectForm() {
    let addProjectForm = document.createElement("form");
    addProjectForm.classList.add("add-project-form");
    addProjectForm.innerHTML = `
      <input
        type="text"
        name="projectName"
        id="projectName"
        placeholder="Project Name"
        autocomplete="off"
        required
      />
      <div class="btn-cont">
        <button class="btn" type="submit">Add</button>
        <button class="btn cancel">Cancel</button>
      </div>`;
    return addProjectForm;
  }

  function createAddTodoPopUp() {
    const blurOverlay = document.createElement("div");
    const formCont = document.createElement("div");
    const addTodoForm = document.createElement("form");
    const formBanner = createBanner("New Todo");
    const closeFormButton = document.createElement("button");

    closeFormButton.textContent = "X";
    closeFormButton.classList.add("btn", "close-form");
    formBanner.appendChild(closeFormButton);

    blurOverlay.classList.add(...["blur-overlay", "active"]);
    formCont.classList.add("add-todo-form-container");
    addTodoForm.classList.add("add-todo-form");
    addTodoForm.classList.add("active");

    formCont.appendChild(formBanner);
    formCont.appendChild(addTodoForm);
    body.appendChild(blurOverlay);
    body.appendChild(formCont);

    addTodoForm.innerHTML = `<div class="entry title">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          autocomplete="off"
          autofocus="on"
          required
        />
      </div>
      <div class="entry description">
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description..."
          autocomplete="off"
        />
      </div>
      <fieldset class="priority-options">
        <legend>Priority</legend>
        <div class="entry priority">
          <input type="radio" name="priority" id="low" value="low" required />
          <label for="low">Low</label>
        </div>
        <div class="entry priority">
          <input
            type="radio"
            name="priority"
            id="medium"
            value="medium"
            required
          />
          <label for="medium">Medium</label>
        </div>
        <div class="entry priority">
          <input type="radio" name="priority" id="high" value="high" required />
          <label for="high">High</label>
        </div>
      </fieldset>
      <div class="entry due-date">
        <label for="dueDate">Due date</label>
        <input type="date" name="dueDate" id="dueDate" required />
      </div>
      <button class="btn submit-todo" type="submit">Add</button>`;

    addTodoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = event.target.title.value;
      const description = event.target.description.value;
      const priority = event.target.priority.value;
      const dueDate = event.target.dueDate.value;
      console.log(dueDate);
      console.log(new Date(dueDate + "T00:00:00"));
      App.createNewTodo(
        App.getCurrentProject(),
        title,
        description,
        dueDate,
        priority
      );
      renderProject(App.getCurrentProject());
      blurOverlay.remove();
      formCont.remove();
    });
    closeFormButton.addEventListener("click", (event) => {
      event.preventDefault();
      blurOverlay.remove();
      formCont.remove();
    });
  }
  // Task: create a form that pops up to fill in for todo information.
  function addTodoHandler() {
    createAddTodoPopUp();
    // pop up a form to add a new todo
    // get the data from the form
    // create new todo and push to the project todo-list
    // let newTodo = App.createNewTodo(App.getCurrentProject());
    // render the project again
    // renderProject(App.getCurrentProject());
  }

  // Task: create a form that pops up to fill in for Project information. Create a project on submission.
  function addProjectHandler() {
    // replace add project button with a form
    const navBar = document.querySelector(".nav-bar");
    navBar.replaceChild(createAddProjectForm(), navBar.lastChild);
    document.getElementById("projectName").focus();

    const addProjectForm = document.querySelector(".add-project-form");

    addProjectForm.addEventListener("submit", (event) => {
      event.preventDefault();
      event.target.remove();
      App.createNewProject(event.target.projectName.value);
      renderNavContent(App.getData());
      renderProject(App.getCurrentProject());
    });

    // Set up cancel button
    const cancelButton = document.querySelector(".btn.cancel");
    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      addProjectForm.remove();
      renderNavContent(App.getData());
    });
  }

  function renderMainPanel() {
    const mainPanel = createMainPanel();
    body.appendChild(mainPanel);
  }

  function renderProject(projectName) {
    // Check if "selected" class exists, remove it --> Switch to new project.
    let previousProject = document.querySelector(".selected");
    if (previousProject) {
      previousProject.classList.remove("selected");
    }
    let currentProject = document.getElementById(projectName);
    currentProject.classList.add("selected");
    App.setCurrentProject(projectName);

    // Clear the todo container
    const todoBody = document.querySelector(".todo-container");
    todoBody.innerHTML = "";

    // get the correct project object
    const todos = App.getProject(projectName);
    for (let todo of todos) {
      let todoItem = createTodoComponents(todo);
      todoBody.appendChild(todoItem);
    }
    todoBody.appendChild(createAddTodoButton());
  }

  function renderNavContent(projectList) {
    const navBar = document.querySelector(".nav-bar");
    const defaultSection = document.querySelector(".default-section");
    defaultSection.innerHTML = "";
    const customSection = document.querySelector(".custom-section");
    customSection.innerHTML = "";

    // Create and add a title to custom section
    const customHeader = document.createElement("p");
    customHeader.textContent = "Projects";
    customHeader.classList.add("custom-section-header");
    customSection.appendChild(customHeader);

    // render default section first
    for (let project of projectList) {
      let projectItem = createProjectComponents(project);
      projectItem.addEventListener("click", (event) => {
        renderProject(event.target.id);
      });
      if (project.type === "default") {
        defaultSection.appendChild(projectItem);
      } else {
        customSection.appendChild(projectItem);
      }
    }

    // Add the add project button to the navBar
    navBar.appendChild(createAddProjectButton());
  }
  return {
    renderMainPanel,
    renderNavContent,
    renderProject,
  };
})();
