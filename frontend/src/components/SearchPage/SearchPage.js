import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class SearchPage extends BaseComponent {
  #container = null;

  constructor() {
    super();
    this.loadCSS("SearchPage");
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

  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("search-page");
  }

  #setupContainerContent() {
    this.#container.innerHTML = `
      <div class="search-bar-container">
        <input
          type="text"
          id="search-input"
          class="search-input"
          placeholder="Search for songs or playlists..."
        />
        <button id="search-button" class="search-button">Search</button>
      </div>
      <div class="results-container">
        <div class="section">
          <h2>Playlists</h2>
          <div class="card-container" id="playlist-results">
            <!-- Preloaded playlists will be added here -->
          </div>
        </div>
        <div class="section">
          <h2>Songs</h2>
          <div class="card-container" id="song-results">
            <!-- Songs will be dynamically populated after search -->
          </div>
        </div>
      </div>
    `;

    // Call this to load playlists on page load
    this.#loadDefaultPlaylists();
  }

  #attachEventListeners() {
    const searchButton = this.#container.querySelector("#search-button");
    const searchInput = this.#container.querySelector("#search-input");

    // Add event listeners for button click and Enter keypress
    searchButton.addEventListener("click", () => this.#performSearch());
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.#performSearch();
      }
    });
  }

  #performSearch() {
    const query = this.#container
      .querySelector("#search-input")
      .value.toLowerCase();
    const songResultsContainer = this.#container.querySelector("#song-results");
    const playlistResultsContainer =
      this.#container.querySelector("#playlist-results");

    // Mock data (replace with actual API integration later)
    const mockSongs = [
      {
        title: "Song Title 1",
        artist: "Artist 1",
        image: "https://via.placeholder.com/80",
      },
      {
        title: "Song Title 2",
        artist: "Artist 2",
        image: "https://via.placeholder.com/80",
      },
      {
        title: "Song Title 3",
        artist: "Artist 3",
        image: "https://via.placeholder.com/80",
      },
    ];
    const mockPlaylists = [
      {
        title: "Playlist Name 1",
        creator: "User 1",
        image: "https://via.placeholder.com/80",
      },
      {
        title: "Playlist Name 2",
        creator: "User 2",
        image: "https://via.placeholder.com/80",
      },
      {
        title: "Playlist Name 3",
        creator: "User 3",
        image: "https://via.placeholder.com/80",
      },
    ];

    // Filter results based on query
    const filteredSongs = mockSongs.filter((song) =>
      song.title.toLowerCase().includes(query),
    );
    const filteredPlaylists = mockPlaylists.filter((playlist) =>
      playlist.title.toLowerCase().includes(query),
    );

    // Clear previous results
    songResultsContainer.innerHTML = "";
    playlistResultsContainer.innerHTML = "";

    // Render song results
    filteredSongs.forEach((song) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${song.image}" alt="${song.title}" />
        <div class="card-title">${song.title}</div>
        <div class="card-subtitle">${song.artist}</div>
      `;
      songResultsContainer.appendChild(card);
    });
    // Render playlist results
    filteredPlaylists.forEach((playlist) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${playlist.image}" alt="${playlist.title}" />
        <div class="card-title">${playlist.title}</div>
        <div class="card-subtitle">${playlist.creator}</div>
      `;
      playlistResultsContainer.appendChild(card);
    });
  }
  #loadDefaultPlaylists() {
    const playlistResultsContainer =
      this.#container.querySelector("#playlist-results");

    // Mock data for preloaded playlists
    const mockPlaylists = [
      {
        title: "Relaxing Beats",
        creator: "DJ Chill",
        image: "https://via.placeholder.com/80",
      },
      {
        title: "Workout Hits",
        creator: "Gym",
        image: "https://via.placeholder.com/80",
      },
      {
        title: "Roadtrip Vibes",
        creator: "Adventure",
        image: "https://via.placeholder.com/80",
      },
    ];

    // Populate playlists in the container
    mockPlaylists.forEach((playlist) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${playlist.image}" alt="${playlist.title}" />
        <div class="card-title">${playlist.title}</div>
        <div class="card-subtitle">${playlist.creator}</div>
      `;
      playlistResultsContainer.appendChild(card);
    });
  }
}
