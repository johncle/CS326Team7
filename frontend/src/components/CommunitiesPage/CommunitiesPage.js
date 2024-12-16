import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class CommunitiesPage extends BaseComponent {
  #container = null; // The view container
  #posts = []; // The list of posts

  constructor() {
    super();
    this.loadCSS("CommunitiesPage");
    this.#fetchPosts();
  }

  // Renders the container
  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    return this.#container;
  }

  // Creates the container
  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("communities-page");
  }

  // Sets up the HTML content of the container
  #setupContainerContent() {
    this.#container.innerHTML = `
      <h2>Communities Page</h2>
      <div class="posts-section">
        <ul class="posts-list" id="posts-list"></ul>
      </div>
      <div class="create-post-section post-form">
        <label for="post-title">Title</label>
        <input type="text" id="post-title" placeholder="Title" />
        <label for="post-content">Content</label>
        <textarea id="post-content" placeholder="Content"></textarea>
        <label for="post-song">Spotify Song ID</label>
        <input type="text" id="post-song" placeholder="Spotify Song ID" />
        <label for="post-song-title">Song Title</label>
        <input type="text" id="post-song-title" placeholder="Song Title" />
        <button id="submit-post">Submit</button>
      </div>
    `;
    this.#renderPosts();
  }

  // Attaches the event listeners
  #attachEventListeners() {
    const hub = EventHub.getInstance();
    const submitButton = this.#container.querySelector("#submit-post");
    submitButton.addEventListener("click", () => this.#handleSubmitPost());
  }

  // Handles creating posts
  #handleSubmitPost() {
    const title = this.#container.querySelector("#post-title").value;
    const content = this.#container.querySelector("#post-content").value;
    const songId = this.#container.querySelector("#post-song").value;
    const songTitle = this.#container.querySelector("#post-song-title").value;

    if (title && content && songId && songTitle) {
      fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, songId, songTitle })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Post created:', data); // Add this line
        this.#posts.push({ id: data.id, title, content, songId, songTitle });
        this.#renderPosts();
      })
      .catch(error => console.error('Error:', error));
    }
  }

  // Fetches posts from the server
  #fetchPosts() {
    fetch('http://localhost:3000/api/posts')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched posts:', data); 
        this.#posts = data;
        this.#renderPosts();
      })
      .catch(error => console.error('Error:', error));
  }

  // Renders the list of posts
  #renderPosts() {
    const postsList = this.#container.querySelector("#posts-list");
    postsList.innerHTML = this.#posts
      .map(
        (post) => `
        <li class="post-item">
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <p><strong>Song:</strong> ${post.songTitle}</p>
          <button onclick="window.open('https://open.spotify.com/track/${post.songId}', '_blank')">Play Song</button>
        </li>
      `
      )
      .join("");
    console.log('Rendered posts:', this.#posts);
  }
}
