import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class Playlist extends BaseComponent {
  #container = null;
  #playlistData = null;

  constructor(playlistData) {
    super();
    this.#playlistData = playlistData;
    this.loadCSS("Playlist"); 
  }

  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();

    return this.#container;
  }

  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("playlist-item");
  }

  #setupContainerContent() {
    const { icon, title, category, action } = this.#playlistData;
    this.#container.innerHTML = `
      <div class="playlist-image">
          <img src="${icon}" alt="Playlist Image" class="playlist-icon">
      </div>
      <div class="playlist-information">
        <div class="playlist-name">
          <span class="playlist-title">${title}</span>
        </div>
        <div class="playlist-category">
          <span class="playlist-info">${category}</span>
        </div>
        <div class="playlist-button">
          <span class="playlist-action">${action}</span>
        </div>
      </div>  
    `;
    this.#attachEventListeners();

    /**
     * `
      <span class="playlist-icon">${icon}</span>
      <span class="playlist-title">${title}</span>
      <span class="playlist-info">${category}</span>
      <span class="playlist-action">${action}</span>
    `;
     * 
     * 
     * `
          <div class="playlist-image">
              <img src="${icon}" alt="Playlist Image">
          </div>
          <div class="playlist-information">
              <div class="playlist-name">
                <span class="playlist-title">${title}</span>
              </div>
              <div class="playlist-category">
                <span class="playlist-info">${category}</span>
              </div>
              <div>
      <span class="playlist-action">${action}</span>
              </div>
          </div>
    `;
     */
  }

  #attachEventListeners() {
    const actionButton = this.#container.querySelector(".playlist-action");
    actionButton.addEventListener("click", () => {
      alert(`Playing ${this.#playlistData.title}`);
    });
  }
}