import { HomePage } from "../HomePage/HomePage.js";
import { SearchPage } from "../SearchPage/SearchPage.js";
import { CommunitiesPage } from "../CommunitiesPage/CommunitiesPage.js";
import { ProfilePage } from "../ProfilePage/ProfilePage.js";
import { LoginPage } from "../LoginPage/LoginPage.js";
import { Navbar } from "../Navbar/Navbar.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { VisualizorPage } from "../VisualizorPage/VisualizorPage.js";

export class AppControllerComponent {
  #container = null; // Main container for the component
  #currentView = "login"; // Track the current view
  #hub = null; // EventHub instance for managing events

  // Component instances
  #navbar = null;
  #homePage = null;
  #searchPage = null;
  #communitiesPage = null;
  #profilePage = null;
  #loginPage = null;
  #visualizorPage = null;

  constructor() {
    this.#hub = EventHub.getInstance();
    this.#navbar = new Navbar();
    this.#homePage = new HomePage();
    this.#searchPage = new SearchPage();
    this.#communitiesPage = new CommunitiesPage();
    this.#profilePage = new ProfilePage();
    this.#loginPage = new LoginPage();
    this.#visualizorPage = new VisualizorPage();
  }

  // Render the AppController component and return the container
  render() {
    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    // Initially render the main view
    this.#renderCurrentView();

    return this.#container;
  }

  // Creates the main container element
  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("app-controller");
    this.#container.style.height = "100vh"; // Full viewport height
  }

  // Sets up the HTML structure for the container
  #setupContainerContent() {
    this.#container.innerHTML = `<div id="viewContainer" class="view-container"></div>`;
  }

  // Attaches the necessary event listeners
  #attachEventListeners() {
    // Subscribe to SwitchPage event from Navbar
    this.#hub.subscribe("SwitchPage", (pageName) => {
      console.log("app switch page:", pageName);
      this.#currentView = pageName;
      this.#renderCurrentView();
    });
  }

  // Renders the current view based on the #currentView state
  #renderCurrentView() {
    const viewContainer = this.#container.querySelector("#viewContainer");
    viewContainer.innerHTML = ""; // Clear existing content

    switch (this.#currentView) {
      case "home":
        viewContainer.appendChild(this.#navbar.render());
        viewContainer.appendChild(this.#homePage.render());
        break;
      case "search":
        viewContainer.appendChild(this.#navbar.render());
        viewContainer.appendChild(this.#searchPage.render());
        break;
      case "communities":
        viewContainer.appendChild(this.#navbar.render());
        viewContainer.appendChild(this.#communitiesPage.render());
        break;
      case "profile":
        viewContainer.appendChild(this.#navbar.render());
        viewContainer.appendChild(this.#profilePage.render());
        break;
      case "login":
        // Do not render navbar for login page
        viewContainer.appendChild(this.#loginPage.render());
        break;
      case "visualizor":
        viewContainer.appendChild(this.#navbar.render());
        viewContainer.appendChild(this.#visualizorPage.render());
        break;
      default:
        // Page not found, show home page
        console.log(`page name '${this.#currentView}' is invalid`);
        viewContainer.appendChild(this.#navbar.render());
        viewContainer.appendChild(this.#homePage.render());
    }
  }
}
