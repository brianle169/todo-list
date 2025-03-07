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
    todoItem.classList.add(...["todo", `priority-${todo.priority}`]);

    const progress = document.createElement("div");
    progress.classList.add("todo-info", "todo-progress");
    progress.innerHTML = `<input type="checkbox" name="progress" id="progress" />`;
    todoItem.appendChild(progress);

    const title = document.createElement("div");
    title.classList.add("todo-info", "todo-title");
    title.textContent = todo.title;
    todoItem.appendChild(title);

    const todoLeft = document.createElement("div");
    todoLeft.classList.add("todo-left-cont");
    todoLeft.appendChild(progress);
    todoLeft.appendChild(title);
    todoItem.appendChild(todoLeft);

    const dueDate = document.createElement("div");
    dueDate.classList.add("todo-info", "todo-due-date");
    dueDate.textContent = todo.dueDate;
    todoItem.appendChild(dueDate);

    const editButton = createEditButton("black");
    todoItem.appendChild(editButton);

    const deleteButton = createDeleteButton();
    todoItem.appendChild(deleteButton);

    const expandButton = createExpandButton();
    todoItem.appendChild(expandButton);

    const todoRight = document.createElement("div");
    todoRight.classList.add("todo-right-cont");
    todoRight.appendChild(dueDate);
    todoRight.appendChild(editButton);
    todoRight.appendChild(deleteButton);
    todoRight.appendChild(expandButton);
    todoItem.appendChild(todoRight);

    return todoItem;
  }

  function createExpandButton() {
    const expandButton = document.createElement("button");
    expandButton.classList.add("btn", "expand");
    expandButton.innerHTML = `    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#dd5555"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M18 9L12 15L6 9" stroke="#000000" stroke-width="2"></path>
      </g>
    </svg>`;
    return expandButton;
  }

  function createShrinkButton() {
    const shrinkButton = document.createElement("button");
    shrinkButton.classList.add("btn", "shrink");
    shrinkButton.innerHTML = `    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#dd5555"
      transform="rotate(180)"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M18 9L12 15L6 9" stroke="#3d66e1" stroke-width="2"></path>
      </g>
    </svg>`;
    return shrinkButton;
  }

  function createEditButton() {
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "edit");
    editButton.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="red" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
          stroke="#000000"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
          stroke="#000000"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
`;
    return editButton;
  }

  function createDeleteButton(color) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "delete");
    deleteButton.innerHTML = `
      <svg
      fill="${color}"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 482.428 482.429"
      xml:space="preserve"
      stroke="#e14747"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <g>
            <path
              d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098 c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117 h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828 C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879 C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096 c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266 c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979 V115.744z"
            ></path>
            <path
              d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"
            ></path>
            <path
              d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"
            ></path>
            <path
              d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07 c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"
            ></path>
          </g>
        </g>
      </g>
    </svg>`;
    return deleteButton;
  }

  function createProjectComponents(project) {
    const projItem = document.createElement("div");
    projItem.classList.add(...["project-item", `type-${project.type}`]);
    if (App.getCurrentProject() === project.name) {
      projItem.classList.add("selected");
    }
    projItem.id = `${project.name}`;

    const title = document.createElement("p");
    title.textContent = `${project.name}`;
    projItem.appendChild(title);

    if (project.type === "custom") {
      let deleteButton = createDeleteButton("#83d8b4");
      projItem.appendChild(deleteButton);
      deleteButton.style.opacity = 0;

      projItem.addEventListener("mouseover", () => {
        deleteButton.style.opacity = 1;
      });
      projItem.addEventListener("mouseleave", () => {
        deleteButton.style.opacity = 0;
      });

      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        Controller.deleteProject(App.getData(), project.name);
        App.setCurrentProject("Home");
        renderNavContent(App.getData());
        renderProject(App.getCurrentProject());
      });
    }
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
    addTodoButton.addEventListener("click", createAddTodoPopUp);
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
    if (document.querySelector(".add-project")) {
      document.querySelector(".add-project").remove();
    }

    // Create and add a title to custom section
    const customHeader = document.createElement("p");
    customHeader.textContent = "Projects";
    customHeader.classList.add("custom-section-header");
    customSection.appendChild(customHeader);

    // render default section first
    for (let project of projectList) {
      let projectItem = createProjectComponents(project);
      projectItem.addEventListener("click", (event) => {
        renderProject(event.currentTarget.id);
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
