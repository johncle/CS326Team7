import { AppControllerComponent } from "./components/AppControllerComponent/AppControllerComponent.js";
// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Optionally import Bootstrap JavaScript (for interactive components)
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./main.css";

// Create an instance of AppControllerComponent
const appController = new AppControllerComponent();

// Render the component in the #app container
const appContainer = document.getElementById("app");
appContainer.appendChild(appController.render());

// Services
// const taskRepository = TaskRepositoryFactory.get('remote');
