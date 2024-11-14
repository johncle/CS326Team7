import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { Playlist } from "./Playlist.js";

export class PlaylistList extends BaseComponent {
  #container = null;
  #playlists = [];

  constructor() {
    super();
    this.loadCSS("PlaylistList");
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
      <h2>Your Playlists</h2>
      <div id="playlistContainer"></div>
    `;
  }

  // Renders the playlists within the list
  #renderPlaylists() {
    const playlistContainer = this.#container.querySelector("#playlistContainer");
    playlistContainer.innerHTML = ""; // Clear existing playlists

    this.#playlists.forEach(playlistData => {
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
  }
}
