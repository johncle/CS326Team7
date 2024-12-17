import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class ProfilePage extends BaseComponent {
  #container = null;
  #hub = EventHub.getInstance();

  constructor() {
    super();
    this.loadCSS("ProfilePage"); // Load the CSS file for this component
  }

  render() {
    if (this.#container) return this.#container;

    // Create the container for the profile page
    this.#container = document.createElement("div");
    this.#container.classList.add("profile-page");
    this.#container.id = "profile-page";

    // HTML structure
    this.#container.innerHTML = `
      <div class="profile-container">
        <h2>Profile</h2>
        <div class="profile-field">
          <label for="username">Username</label>
          <span id="username-display"></span>
          <input type="text" id="username-input" />
          <p id="username-error" class="error-message" style="display: none;">Username is required.</p>
          <p id="username-taken-error" class="error-message" style="display: none;">Username is already taken.</p>
          <button class="edit-button" id="edit-username">Edit</button>
          <button class="save-button" id="save-username" style="display: none;">Save</button>
        </div>
        <div class="profile-field">
          <label for="password">Password</label>
          <span id="password-display">********</span>
          <input type="password" id="password-input" />
          <p id="password-error" class="error-message" style="display: none;">Password is required.</p>
          <button class="edit-button" id="edit-password">Edit</button>
          <button class="save-button" id="save-password" style="display: none;">Save</button>
        </div>
      </div>
    `;

    this.#attachEventListeners();

    return this.#container;
  }

  #attachEventListeners() {
    // Handle editing username
    const editUsernameBtn = this.#container.querySelector("#edit-username");
    const saveUsernameBtn = this.#container.querySelector("#save-username");
    const usernameDisplay = this.#container.querySelector("#username-display");
    const usernameInput = this.#container.querySelector("#username-input");
    const usernameError = this.#container.querySelector("#username-error");
    const usernameTakenError = this.#container.querySelector("#username-taken-error");

    editUsernameBtn.addEventListener("click", () => {
      usernameDisplay.style.display = "none";
      usernameInput.style.display = "inline-block";
      saveUsernameBtn.style.display = "inline-block";
      editUsernameBtn.style.display = "none";
    });

    saveUsernameBtn.addEventListener("click", async () => {
      const newUsername = usernameInput.value;

      if (!newUsername) {
        usernameError.style.display = "block";
        return;
      } else {
        usernameError.style.display = "none";
      }

      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (response.ok) {
        usernameTakenError.style.display = "none";
        usernameDisplay.textContent = newUsername;
        usernameDisplay.style.display = "inline-block";
        usernameInput.style.display = "none";
        saveUsernameBtn.style.display = "none";
        editUsernameBtn.style.display = "inline-block";
      } else if (response.status === 400) {
        const errorData = await response.json();
        if (errorData.error.includes("already exists")) {
          usernameTakenError.style.display = "block";
        } else {
          alert("Failed to update username.");
        }
      } else {
        alert("Failed to update username.");
      }
    });

    // Handle editing password
    const editPasswordBtn = this.#container.querySelector("#edit-password");
    const savePasswordBtn = this.#container.querySelector("#save-password");
    const passwordDisplay = this.#container.querySelector("#password-display");
    const passwordInput = this.#container.querySelector("#password-input");
    const passwordError = this.#container.querySelector("#password-error");

    editPasswordBtn.addEventListener("click", () => {
      passwordDisplay.style.display = "none";
      passwordInput.style.display = "inline-block";
      savePasswordBtn.style.display = "inline-block";
      editPasswordBtn.style.display = "none";
    });

    savePasswordBtn.addEventListener("click", async () => {
      const newPassword = passwordInput.value;

      if (!newPassword) {
        passwordError.style.display = "block";
        return;
      } else {
        passwordError.style.display = "none";
      }

      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        passwordDisplay.style.display = "inline-block";
        passwordInput.style.display = "none";
        savePasswordBtn.style.display = "none";
        editPasswordBtn.style.display = "inline-block";
      } else {
        alert("Failed to update password.");
      }
    });
  }
}
