import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import "../../main.css";

/**
 * Navbar is always displayed, except for login page. Used to switch pages/views
 */
export class Navbar extends BaseComponent {
  #navbar = null;
  #hub = EventHub.getInstance();

  constructor() {
    super();
    this.loadCSS("Navbar");
  }

  // Method to render the component and return the container
  render() {
    if (this.#navbar) {
      return this.#navbar;
    }

    this.#createNavbar();
    this.#setupNavbarContent();

    return this.#navbar;
  }

  // Creates the container element for the component
  #createNavbar() {
    this.#navbar = document.createElement("nav");
    this.#navbar.classList.add(
      "navbar",
      "navbar-expand-lg",
      "bg-tertiary-color",
    );
  }

  // Sets up the basic HTML structure of the component
  #setupNavbarContent() {
    this.#navbar.innerHTML = `
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav me-auto">
            <button class="nav-link" data-page="home">
              <img src="src/assets/sonar.svg" class="logo" alt="Sonar logo" />
            </button>
            <button class="nav-link active" aria-current="page" data-page="home">
              Home
            </button>
            <button class="nav-link" data-page="tags">Tags</button>
            <button class="nav-link" data-page="communities">Communities</button>
            <button class="nav-link" data-page="profile">Profile</button>
            <button class="nav-link" data-page="login">Logout</button>
          </div>
        </div>
      </div>
    `;

    // adds onclick event to navigate to page and update active navbar button
    const buttons = this.#navbar.querySelectorAll("button[data-page]");
    buttons.forEach((button) => {
      const pageName = button.getAttribute("data-page");
      button.addEventListener("click", () => {
        this.#navigateTo(pageName);
        this.#setActivePage(pageName);
      });
    });
  }

  /**
   * Switches pages when clicking navbar buttons
   * @param {string} pageName "home" | "tags" | "communities" | "profile" | "login" | "search"
   *  - switch to "login" page when user clicks "Logout"
   */
  #navigateTo(pageName) {
    this.#hub.publish(Events.SwitchPage, pageName);
  }

  /**
   * Sets "active" class for active page button
   * @param {string} pageName
   */
  #setActivePage(pageName) {
    // remove active class from current page button
    const curActive = this.#navbar.querySelector("button.active");
    curActive.classList.remove("active");

    // add active class to new page button
    const newActive = this.#navbar.querySelector(
      `button[data-page=${pageName}]`,
    );
    newActive.classList.add("active");
  }
}
