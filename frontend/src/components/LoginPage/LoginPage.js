import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class LoginPage extends BaseComponent {
  #container = null;
  #hub = EventHub.getInstance();

  constructor() {
    super();
    this.loadCSS("LoginPage"); // Load the CSS file for this component
  }

  render() {
    if (this.#container) return this.#container;

    // Create the container for the login page
    this.#container = document.createElement("div");
    this.#container.classList.add("login-page");
    this.#container.id = "login-page";

    // HTML structure
    this.#container.innerHTML = `
      <div class="login-container">
        <h1>Login</h1>
        <form id="login-form">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
          />
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </form>
        <button id="spotify-login" class="spotify-login-button">Login with Spotify</button>
        <span id="go-to-homepage" class="home-link">Go to Homepage</span>
      </div>
    `;

    this.#attachEventListeners();

    return this.#container;
  }

  #attachEventListeners() {
    // Handle navigation to HomePage
    const goToHomepageBtn = this.#container.querySelector("#go-to-homepage");
    goToHomepageBtn.addEventListener("click", () => {
      this.#hub.publish(Events.SwitchPage, "home");
    });
  }
}