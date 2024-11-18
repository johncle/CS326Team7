import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

/**
 * Navbar is always displayed, except for login page. Used to switch pages/views
 */
export class Navbar extends BaseComponent {
  #container = null;
  #hub = EventHub.getInstance();

  constructor() {
    super();
    this.loadCSS("Navbar");
  }

  // Method to render the component and return the container
  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();

    return this.#container;
  }

  // Creates the container element for the component
  #createContainer() {
    this.#container = document.createElement("nav");
    this.#container.classList.add(
      "navbar",
      "navbar-expand-lg",
      "bg-tertiary-color",
    );
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <div class="container-fluid">
        <div id="navbarNavAltMarkup">
          <div class="navbar-nav me-auto">
            <button class="nav-link" data-page="">
              <img src="src/assets/sonar.svg" class="logo" alt="Sonar logo" />
            </button>
            <button class="nav-link active" aria-current="page" data-page="home">
              Home
            </button>
            <button class="nav-link" data-page="search">Search</button>
            <button class="nav-link" data-page="communities">Communities</button>
            <button class="nav-link" data-page="profile">Profile</button>
            <button class="nav-link" data-page="login">Logout</button>
          </div>
        </div>
      </div>
    `;

    // adds onclick event to navigate to page and update active navbar button
    const buttons = this.#container.querySelectorAll("button[data-page]");
    buttons.forEach((button) => {
      // icon has data-page="" to redirect to home page
      const pageName = button.getAttribute("data-page") || "home";
      button.addEventListener("click", () => {
        this.#navigateTo(pageName);
        this.#setActivePage(pageName);
      });
    });
  }

  /**
   * Switches pages when clicking navbar buttons
   * @param {string} pageName "home" | "search" | "communities" | "profile" | "login"
   *  - switch to "login" page when user clicks "Logout"
   */
  #navigateTo(pageName) {
    this.#hub.publish(Events.SwitchPage, pageName);
  }

  /**
   * Sets "active" class for active page button which highlights the button in the navbar
   * @param {string} pageName
   */
  #setActivePage(pageName) {
    // remove active class from current page button
    const curActive = this.#container.querySelector("button.active");
    curActive.classList.remove("active");

    // add active class to new page button
    const newActive = this.#container.querySelector(
      `button[data-page=${pageName}]`,
    );
    newActive.classList.add("active");
  }
}
