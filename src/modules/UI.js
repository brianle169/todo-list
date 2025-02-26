// UI module: controls the DOM
export default (function UI() {
  const body = document.querySelector("body");

  function createMainPanel() {
    let mainPanel = document.createElement("div");
    mainPanel.classList.add("main");

    // create banner with logo
    let banner = document.createElement("div");
    let bannerText = document.createElement("p");
    bannerText.textContent = "To-do List";
    banner.classList.add("banner");
    banner.appendChild(bannerText);

    // create todo-body & nav ()

    // create footer
    let footer = document.createElement("footer");
    footer.textContent = `© 2025 Cong Minh Le. All rights reserved.`;

    mainPanel.appendChild(banner);
    mainPanel.appendChild(footer);
    return mainPanel;
  }

  function renderMainPanel() {
    const mainPanel = createMainPanel();
    body.appendChild(mainPanel);
  }
  return { renderMainPanel };
})();
