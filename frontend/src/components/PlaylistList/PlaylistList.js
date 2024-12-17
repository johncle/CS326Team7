import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { Playlist } from "../Playlist/Playlist.js";

export class PlaylistList extends BaseComponent {
  #container = null;
  #playlists = [];
  #currentIndex = 0; // Track the current index for paging

  constructor(title) {
    super();
    this.loadCSS("PlaylistList");
    this.title = title; // Add title property
  }

  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    return this.#container;
  }

  // Sets the list of playlists to display
  setPlaylists(playlists) {
    this.#playlists = playlists;
    this.#renderPlaylists();
  }

  // Creates the main container for the playlist list
  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("playlist-list");
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <div class="playlist-title"> <h2>${this.title}</h2> </div>
      <div class="playlist-wrapper">
        <button class="scroll-button left-button">&lt;</button>
        <div id="playlistContainer" class="playlist-container"></div>
        <button class="scroll-button right-button">&gt;</button>
      </div>
    `;
  }

  // Renders the playlists within the list
  #renderPlaylists() {
    const playlistContainer =
      this.#container.querySelector("#playlistContainer");
    playlistContainer.innerHTML = ""; // Clear existing playlists

    const visiblePlaylists = this.#playlists.slice(this.#currentIndex, this.#currentIndex + 3);
    visiblePlaylists.forEach((playlistData) => { // Render visible playlists
      const playlistComponent = new Playlist(playlistData);
      playlistContainer.appendChild(playlistComponent.render());
    });
  }

  // Attaches event listeners for the component
  #attachEventListeners() {
    const hub = EventHub.getInstance();
    hub.subscribe(Events.NewPlaylist, (playlistData) => {
      this.#playlists.push(playlistData);
      this.#renderPlaylists();
    });

    hub.subscribe(Events.ClearPlaylists, () => {
      this.#playlists = [];
      this.#renderPlaylists();
    });

    const leftButton = this.#container.querySelector(".left-button");
    const rightButton = this.#container.querySelector(".right-button");
    const playlistContainer = this.#container.querySelector("#playlistContainer");

    leftButton.addEventListener("click", () => {
      if (this.#currentIndex > 0) {
        this.#currentIndex -= 3;
        this.#renderPlaylists();
      }
    });

    rightButton.addEventListener("click", () => {
      if (this.#currentIndex + 3 < this.#playlists.length) {
        this.#currentIndex += 3;
        this.#renderPlaylists();
      }
    });
  }
}
