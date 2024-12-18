import { BaseComponent } from "../../src/components/BaseComponent/BaseComponent.js";
import { EventHub } from "../../src/eventhub/EventHub.js";
import { Events } from "../../src/eventhub/Events.js";

export class TagsPage extends BaseComponent {
  #container = null; // Private variable to store the container element

  constructor() {
    super();
    this.loadCSS("TagsPage");
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
    this.#container.classList.add("tags-page");
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <h2>Tags Page</h2>
    `;
  }

  // Attaches the event listeners to the component
  #attachEventListeners() {
    const hub = EventHub.getInstance();
    // hub.subscribe(Events.NewTask, (taskData) => {
    //   this.#tasks.push(taskData);
    // });
  }
}
