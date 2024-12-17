import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class LoginPage extends BaseComponent {
  #container = null; // Container element for the login page
  #hub = EventHub.getInstance(); // EventHub instance for managing events

  constructor() {
    super();
    this.loadCSS("LoginPage");
  }

  // Render the login page and return the container
  render() {
    if (this.#container) return this.#container;

    this.#container = document.createElement("div");
    this.#container.classList.add("login-page");
    this.#container.id = "login-page";

    // Center the login page
    const wrapper = document.createElement("div");
    wrapper.classList.add("login-wrapper");
    this.#container.appendChild(wrapper);

    // HTML structure
    wrapper.innerHTML = `
      <div class="login-container">
        <h1>Welcome to <span class="sonar-highlight">Sonar</span></h1>
        <button id="spotify-login" class="spotify-login-button">
          LOGIN WITH SPOTIFY
        </button>
        <a id="go-to-homepage" class="home-link">Go to Homepage</a>
      </div>
    `;
    this.#attachEventListeners();

    return this.#container;
  }


  #generateRandomString(length) {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  async #generateCodeChallenge(codeVerifier) {
    const sha256 = async (plain) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      return window.crypto.subtle.digest("SHA-256", data);
    };

    const base64encode = (input) => {
      return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    };

    const hashed = await sha256(codeVerifier);
    return base64encode(hashed);
  }

  // Attach event listeners to the login page
  #attachEventListeners() {
    const spotifyLoginButton = this.#container.querySelector("#spotify-login");
    spotifyLoginButton.addEventListener("click", async () => {
      const clientId = "97b13cdb7b4e499abd6f07c6652c1035";
      const redirectUri = "http://localhost:5173/callback";
      const scopes = ["user-read-private", "user-read-email"];

      const codeVerifier = this.#generateRandomString(128);
      localStorage.setItem("code_verifier", codeVerifier);

      const codeChallenge = await this.#generateCodeChallenge(codeVerifier);
      const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(
        scopes.join(" ")
      )}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

      window.location.href = spotifyAuthUrl;
    });

    const goToHomepageBtn = this.#container.querySelector("#go-to-homepage");
    goToHomepageBtn.addEventListener("click", () => {
      this.#hub.publish(Events.SwitchPage, "home");
    });
  }
}
