import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";

// CommunitiesPage class extends BaseComponent
export class CommunitiesPage extends BaseComponent {
  #container = null;
  #posts = [];

  // Constructor to initialize the component
  constructor() {
    super();
    this.loadCSS("CommunitiesPage");
    this.#fetchPosts();
  }

  // Render method to create and return the container
  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    return this.#container;
  }

  // Private method to create the container element
  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("communities-page");
  }

  // Private method to set up the content of the container
  #setupContainerContent() {
    this.#container.innerHTML = `
      <h2>Communities Page</h2>
      <div class="content-wrapper">
        <div class="posts-section">
          <h3>Recent Posts</h3>
          <ul class="posts-list" id="posts-list"></ul>
        </div>
        <div class="create-post-section post-form">
          <h3>Create a New Post</h3>
          <label for="post-title">Title</label>
          <input type="text" id="post-title" placeholder="Title" />
          <label for="post-content">Content</label>
          <textarea id="post-content" placeholder="Content"></textarea>
          <label for="post-song-link">Spotify Song Link</label>
          <input type="text" id="post-song-link" placeholder="Spotify Song Link" />
          <button id="submit-post">Post</button>
        </div>
      </div>
    `;
    this.#renderPosts();
  }

  // Private method to attach event listeners
  #attachEventListeners() {
    const submitButton = this.#container.querySelector("#submit-post");
    submitButton.addEventListener("click", () => this.#handleSubmitPost());
  }

  // Private method to handle the submission of a new post
  async #handleSubmitPost() {
    const title = this.#container.querySelector("#post-title").value;
    const content = this.#container.querySelector("#post-content").value;
    const songLink = this.#container.querySelector("#post-song-link").value;

    if (title && content && songLink) {
      try {
        const response = await fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content, songLink }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create post");
        }

        const newPost = await response.json();
        this.#posts.unshift(newPost);
        this.#posts = this.#posts.slice(0, 36); // Keep only the 36 most recent posts
        this.#renderPosts();


        this.#container.querySelector("#post-title").value = "";
        this.#container.querySelector("#post-content").value = "";
        this.#container.querySelector("#post-song-link").value = "";
      } catch (error) {
        console.error("Error creating post:", error);
        alert(`Failed to create post. Error: ${error.message}`);
      }
    } else {
      alert("Please fill in all fields.");
    }
  }

  // Private method to fetch posts from the server
  async #fetchPosts() {
    try {
      const response = await fetch("http://localhost:3000/api/posts");
      const data = await response.json();
      this.#posts = data.slice(0, 36); // Keep only the 36 most recent posts
      this.#renderPosts();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  // Private method to render the posts
  #renderPosts() {
    const postsList = this.#container.querySelector("#posts-list");
    postsList.innerHTML = this.#posts
      .map(
        (post) => `
        <li class="post-item">
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <a href="${post.songLink}" target="_blank">Listen on Spotify</a>
        </li>
      `,
      )
      .join("");
  }
}