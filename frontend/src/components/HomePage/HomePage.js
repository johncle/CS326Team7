import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { Playlist } from "../Playlist/Playlist.js";
import { PlaylistList } from "../PlaylistList/PlaylistList.js";

export class HomePage extends BaseComponent {
  #container = null; // Private variable to store the container element
  #categories = null; // { categoryName: playlists[] }, group playlists by category

  constructor() {
    super();
    this.loadCSS("HomePage");
    this.#categories = {
      "Curated for you": new PlaylistList(),
      "Discover New": new PlaylistList(),
      Trending: new PlaylistList(),
    };
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
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <div id="homepage"></div>
    `;
    const mainDiv = this.#container.querySelector("#homepage");

    Object.entries(this.#categories).forEach((category) => {
      // console.log(category);
      const playlistList = category[1];
      playlistList.render();
      playlistList.setPlaylists([
        {
          icon: "icon1",
          title: "title1",
          category: "category1",
          action: "action1",
        },
        {
          icon: "icon2",
          title: "title2",
          category: "category2",
          action: "action2",
        },
        {
          icon: "icon3",
          title: "title3",
          category: "category3",
          action: "action3",
        },
      ]);
      mainDiv.classList.add("categories");
      mainDiv.appendChild(playlistList.render());
    });

    // div.appendChild(this.#playlistList.render());
    // this.#playlistList.setPlaylists(this.#playlists);
  }

  /**
   * Gets playlists for "Curated for you", "Discover New", "Trending", and "Your Playlists" from
   * spotify api
   */
  #getPlaylists() {}

  // Attaches the event listeners to the component
  #attachEventListeners() {
    const hub = EventHub.getInstance();
    // hub.subscribe(Events.NewTask, (taskData) => {
    //   this.#tasks.push(taskData);
    //   this.#renderTasks();
    // });
  }
}
