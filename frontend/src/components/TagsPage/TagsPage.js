import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { PlaylistComponent } from "../PlaylistComponent/PlaylistComponent.js";

export class TagsPage extends BaseComponent {
  #container = null; // Private variable to store the container element
  #playlists = []; // Array to store playlists

  constructor() {
    super();
    this.loadCSS("TagsPage");
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
    this.#container.classList.add("tags-page");
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <h2>Tags Page</h2>
      <div class="playlists-container"></div>
    `;
  }

  // Attaches the event listeners to the component
  #attachEventListeners() {
    const hub = EventHub.getInstance();
    hub.subscribe(Events.NewPlaylist, (playlistData) => {
      this.#playlists.push(playlistData);
      this.#renderPlaylists();
    });
  }

  // Renders the playlists in the container
  #renderPlaylists() {
    const playlistsContainer = this.#container.querySelector(".playlists-container");
    playlistsContainer.innerHTML = ""; // Clear existing content

    this.#playlists.forEach((playlist) => {
      const playlistComponent = new PlaylistComponent(playlist);
      playlistsContainer.appendChild(playlistComponent.render());
    });
  }
}
