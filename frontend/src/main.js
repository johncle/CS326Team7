import { AppControllerComponent } from "./components/AppControllerComponent/AppControllerComponent.js";
import { MusicPlayerComponent } from "./components/MusicPlayerComponent/MusicPlayerComponent.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./main.css";

const appController = new AppControllerComponent();
const appContainer = document.getElementById("app");
appContainer.appendChild(appController.render());

const musicPlayer = new MusicPlayerComponent();
appContainer.appendChild(musicPlayer.render());