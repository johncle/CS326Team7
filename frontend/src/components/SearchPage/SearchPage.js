import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class SearchPage extends BaseComponent {
  #container = null; // Private variable to store the container element

  constructor() {
    super();
    this.loadCSS("SearchPage");
  }

  // Method to render the component and return the container
  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    return this.#container;
  }

  // Creates the container element for the component
  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("search-page");
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <h2>Search Page</h2>
      <div class="search-bar">
        <input type="text" class="search-input" placeholder="Search for songs, artists, or playlists..." />
        <button class="search-button">Search</button>
      </div>
      <div class="search-results"></div>
    `;
  }

  // Attaches the event listeners to the component
  #attachEventListeners() {
    const searchButton = this.#container.querySelector(".search-button");
    const searchInput = this.#container.querySelector(".search-input");

    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) {
        this.#publishSearchEvent(query);
      }
    });

    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          this.#publishSearchEvent(query);
        }
      }
    });
  }

  // Publishes the search event with the query
  #publishSearchEvent(query) {
    const hub = EventHub.getInstance();
    hub.publish(Events.Search, { query });
  }
}