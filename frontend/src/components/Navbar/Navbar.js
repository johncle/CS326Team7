import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class Navbar extends BaseComponent {
  #container = null; // Private variable to store the container element
  #tasks = []; // To store task data

  constructor() {
    super();
    this.loadCSS("Navbar");
  }

  // Method to render the component and return the container
  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createNavbar();
    this.#setupContainerContent();
    // this.#attachEventListeners();

    return this.#container;
  }

  // Method to set the list of tasks to display
  setTasks(tasks) {
    this.#tasks = tasks;
    // this.#renderTasks();
  }

  // Creates the container element for the component
  #createNavbar() {
    this.#container = document.createElement("nav");
    this.#container.classList.add(
      "navbar",
      "navbar-expand-lg",
      "bg-body-tertiary",
    );
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a href="#"><img src="src/assets/sonar.svg" class="logo" alt="Sonar logo" /></a>
            <a class="nav-link active" aria-current="page" href="#">Home</a>
            <a class="nav-link" href="#">Tags</a>
            <a class="nav-link" href="#">Communities</a>
          </div>
          <div class="navbar-nav">
            <a class="nav-link" href="#">Profile</a>
            <a class="nav-link" href="#">Logout</a>
          </div>
        </div>
      </div>
    `;
  }

  // // Renders the tasks in the list
  // #renderTasks() {
  //   const taskList = this.#container.querySelector("#simpleTaskList");
  //   taskList.innerHTML = ""; // Clear existing content

  //   this.#tasks.forEach((taskData) => {
  //     const taskContainer = document.createElement("li");
  //     taskContainer.classList.add("task-item");

  //     // Create a new TaskComponent for each task
  //     const task = new TaskComponent(taskData);
  //     taskContainer.appendChild(task.render());
  //     taskList.appendChild(taskContainer);
  //   });
  // }

  // // Attaches the event listeners to the component
  // #attachEventListeners() {
  //   const backToMainViewBtn =
  //     this.#container.querySelector("#backToMainViewBtn");

  //   const hub = EventHub.getInstance();
  //   hub.subscribe(Events.NewTask, (taskData) => {
  //     this.#tasks.push(taskData);
  //     this.#renderTasks();
  //   });

  //   hub.subscribe(Events.UnStoreTasks, () => {
  //     this.#tasks = [];
  //     this.#renderTasks();
  //   });
  // }
}
