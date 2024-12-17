import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class LoginPage extends BaseComponent {
  #container = null;
  #hub = EventHub.getInstance();
  #spotifyAuthWindow = null;

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
          <p id="login-error" class="error-message" style="display: none;">Invalid username or password.</p>
        </form>
        <button id="login-button" class="login-button">Login</button>
        <button id="spotify-login" class="spotify-login-button">Login with Spotify</button>
        <button id="create-account" class="create-account-button">Create Account</button>
        <span id="go-to-homepage" class="home-link">Go to Homepage</span>
      </div>
      <div class="create-account-container" style="display: none;">
        <h1>Create Account</h1>
        <form id="create-account-form">
          <label for="new-username">Username</label>
          <input
            type="text"
            id="new-username"
            name="new-username"
            placeholder="Create a username"
            required
          />
          <p id="username-error" class="error-message" style="display: none;">Username is required.</p>
          <label for="new-password">Password</label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            placeholder="Create a password"
            required
          />
          <p id="password-error" class="error-message" style="display: none;">Password is required.</p>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <p id="email-error" class="error-message" style="display: none;">Email is required.</p>
        </form>
        <button id="finish-account" class="spotify-login-button">Link Spotify Account</button>
        <button id="back-to-login" class="back-to-login-button">Back to Login</button>
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

    // Handle switching to Create Account view
    const createAccountBtn = this.#container.querySelector("#create-account");
    createAccountBtn.addEventListener("click", () => {
      this.#container.querySelector(".login-container").style.display = "none";
      this.#container.querySelector(".create-account-container").style.display = "block";
    });

    // Handle switching back to Login view
    const backToLoginBtn = this.#container.querySelector("#back-to-login");
    backToLoginBtn.addEventListener("click", () => {
      this.#container.querySelector(".create-account-container").style.display = "none";
      this.#container.querySelector(".login-container").style.display = "block";
    });

    // Handle account creation
    const finishAccountBtn = this.#container.querySelector("#finish-account");
    finishAccountBtn.addEventListener("click", async () => {
      const username = this.#container.querySelector("#new-username").value;
      const password = this.#container.querySelector("#new-password").value;
      const email = this.#container.querySelector("#email").value;

      const usernameError = this.#container.querySelector("#username-error");
      const passwordError = this.#container.querySelector("#password-error");
      const emailError = this.#container.querySelector("#email-error");

      let valid = true;

      if (!username) {
        usernameError.style.display = "block";
        valid = false;
      } else {
        usernameError.style.display = "none";
      }

      if (!password) {
        passwordError.style.display = "block";
        valid = false;
      } else {
        passwordError.style.display = "none";
      }

      if (!email) {
        emailError.style.display = "block";
        valid = false;
      } else {
        emailError.style.display = "none";
      }

      if (valid) {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email }),
        });

        if (response.ok) {
          alert("Account created successfully! Please link your Spotify account.");
          const spotifyResponse = await fetch("/api/spotify/login", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (spotifyResponse.ok) {
            const data = await spotifyResponse.json();
            this.#spotifyAuthWindow = window.open(data.url, "SpotifyAuth", "width=600,height=800");
            window.addEventListener("message", this.#handleSpotifyAuthMessage.bind(this), false);
          } else {
            alert("Failed to initiate Spotify login.");
          }
        } else {
          alert("Failed to create account.");
        }
      }
    });

    // Handle login with username and password
    const loginBtn = this.#container.querySelector("#login-button");
    loginBtn.addEventListener("click", async () => {
      const username = this.#container.querySelector("#username").value;
      const password = this.#container.querySelector("#password").value;
      const loginError = this.#container.querySelector("#login-error");

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        loginError.style.display = "none";
        this.#hub.publish(Events.SwitchPage, "home");
      } else {
        loginError.style.display = "block";
      }
    });

    // Handle login with Spotify
    const spotifyLoginBtn = this.#container.querySelector("#spotify-login");
    spotifyLoginBtn.addEventListener("click", async () => {
      const response = await fetch("/api/spotify/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.#spotifyAuthWindow = window.open(data.url, "SpotifyAuth", "width=600,height=800");
        window.addEventListener("message", this.#handleSpotifyAuthMessage.bind(this), false);
      } else {
        alert("Failed to log in with Spotify.");
      }
    });
  }

  #handleSpotifyAuthMessage(event) {
    if (event.origin !== window.location.origin) {
      return;
    }

    const { accessToken, refreshToken, expiresIn } = event.data;
    if (accessToken && refreshToken && expiresIn) {
      // Handle successful Spotify authentication
      this.#spotifyAuthWindow.close();
      alert("Spotify account linked successfully!");
    } else {
      alert("Failed to link Spotify account.");
    }
  }
}