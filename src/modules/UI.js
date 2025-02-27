import App from "./App.js";
// UI module: controls the DOM
export default (function UI() {
  const body = document.querySelector("body");

  function createBanner() {
    // create banner with logo
    const banner = document.createElement("div");
    const bannerText = document.createElement("p");
    bannerText.textContent = "To-do List";
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
    addProjectButton.addEventListener("click", App.createNewProject);

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
    // mainPanel.appendChild(footer);
    return mainPanel;
  }

  function createProjectComponents(project) {
    const projItem = document.createElement("div");
    projItem.classList.add(...["project-item", `type-${project.type}`]);
    projItem.textContent = `${project.name}`;
    return projItem;
  }

  function renderMainPanel() {
    const mainPanel = createMainPanel();
    body.appendChild(mainPanel);
  }

  function renderNavContent(projectList) {
    const nav = document.querySelector(".nav-bar");
    const defaultSection = document.querySelector(".default-section");
    const customSection = document.querySelector(".custom-section");

    // Create and add a title to custom section
    const customHeader = document.createElement("p");
    customHeader.textContent = "Projects";
    customHeader.classList.add("custom-section-header");
    customSection.appendChild(customHeader);

    // render default section first
    for (let project of projectList) {
      let projectItem = createProjectComponents(project);
      if (project.type === "default") {
        defaultSection.appendChild(projectItem);
      } else {
        customSection.appendChild(projectItem);
      }
    }
  }
  return { renderMainPanel, renderNavContent };
})();
