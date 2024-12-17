import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { Playlist } from "../Playlist/Playlist.js";
import { PlaylistList } from "../PlaylistList/PlaylistList.js";

export class HomePage extends BaseComponent {
  #container = null; // Container element for the homepage
  #categories = null; // Group playlists by category

  constructor() {
    super();
    this.loadCSS("HomePage");
    this.#categories = {
      "Your Playlists": new PlaylistList("Your Playlists"),
      "Discover New": new PlaylistList("Discover New"),
    };
  }

  // Render the component and return the container
  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    return this.#container;
  }

  // Create the container element for the component
  #createContainer() {
    this.#container = document.createElement("div");
  }

  // Set up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <div id="homepage" class="homepage"></div>
    `;
    const mainDiv = this.#container.querySelector("#homepage");

    Object.entries(this.#categories).forEach((category) => {
      const playlistList = category[1];
      playlistList.render();
      playlistList.setPlaylists([
        {
          icon: "/src/components/HomePage/playlist-1-picture.png",
          title: "Cool Cat Playlist",
          category: "Pop",
          action: "Play!",
        },
        {
          icon: "/src/components/HomePage/playlist-2-picture.png",
          title: "Graduation",
          category: "Nostalgia",
          action: "Play!",
        },
        {
          icon: "/src/components/HomePage/playlist-3-picture.png",
          title: "Vent",
          category: "Sad Songs",
          action: "Play!",
        },
        {
          icon: "/src/components/HomePage/playlist-4-picture.png",
          title: "Discover Music",
          category: "Trending",
          action: "Play!",
        },
        {
          icon: "/src/components/HomePage/playlist-5-picture.png",
          title: "Motivational",
          category: "Happy Songs",
          action: "Play!",
        },
      ]);
      mainDiv.classList.add("categories");
      mainDiv.appendChild(playlistList.render());
    });
  }

  /**
   * Gets playlists for "Curated for you", "Discover New", "Trending", and "Your Playlists" from
   * spotify api
   */
  #getPlaylists() {}

  // Attach event listeners to the component
  #attachEventListeners() {
    const hub = EventHub.getInstance();
    // Example: hub.subscribe(Events.NewTask, (taskData) => {
    //   this.#tasks.push(taskData);
    //   this.#renderTasks();
    // });
  }
}
