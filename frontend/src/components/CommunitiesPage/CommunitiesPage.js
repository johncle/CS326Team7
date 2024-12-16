import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class CommunitiesPage extends BaseComponent {
  #container = null; // Private variable to store the container element

  constructor() {
    super();
    this.loadCSS("CommunitiesPage");
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
    this.#container.classList.add("communities-page");
  }

  #setupContainerContent() {
    this.#container.innerHTML = `
      <header class="header">
        <button id="home-button" class="home-button">Home</button>
        <h1 class="page-title">Friends and Communities</h1>
      </header>
      <main>
        <section id="add-friends">
          <h2>Add Friends</h2>
          <p>Search for and add friends to share music with:</p>
          <input type="text" id="friend-search" placeholder="Search for friends..." />
          <button id="add-friend-button">Add Friend</button>
        </section>
        <section id="create-join-communities">
          <h2>Create or Join Communities</h2>
          <p>Collaborate with others by creating or joining a music community:</p>
          <input type="text" id="community-name" placeholder="Community Name" />
          <button id="create-community-button">Create Community</button>
          <p>Or join an existing community:</p>
          <input type="text" id="community-search" placeholder="Search for a community..." />
          <button id="join-community-button">Join Community</button>
        </section>
      </main>
    `;
  }

  #attachEventListeners() {
    const homeButton = this.#container.querySelector("#home-button");
    const addFriendButton = this.#container.querySelector("#add-friend-button");
    const createCommunityButton = this.#container.querySelector("#create-community-button");
    const joinCommunityButton = this.#container.querySelector("#join-community-button");

    // Navigate to home page
    homeButton.addEventListener("click", () => {
      EventHub.getInstance().emit("navigate", { page: "home" });
    });

    // Add Friend button functionality
    addFriendButton.addEventListener("click", () => {
      const friendSearchInput = this.#container.querySelector("#friend-search").value.trim();
      if (friendSearchInput) {
        console.log(`Adding friend: ${friendSearchInput}`);
        // Integrate this action with backend or other event handling
      }
    });

    // Create Community button functionality
    createCommunityButton.addEventListener("click", () => {
      const communityName = this.#container.querySelector("#community-name").value.trim();
      if (communityName) {
        console.log(`Creating community: ${communityName}`);
        // Integrate this action with backend or other event handling
      }
    });

    // Join Community button functionality
    joinCommunityButton.addEventListener("click", () => {
      const communitySearchInput = this.#container.querySelector("#community-search").value.trim();
      if (communitySearchInput) {
        console.log(`Joining community: ${communitySearchInput}`);
        // Integrate this action with backend or other event handling
      }
    });
  }
}
