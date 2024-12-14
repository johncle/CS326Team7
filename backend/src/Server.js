// Server.js
import express from "express";
import UserRoutes from "./routes/UserRoutes.js";
import SongRoutes from "./routes/SongRoutes.js";
import { initializeModels } from "./model/index.js";

class Server {
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
  }

  // Configure middleware for static files and JSON parsing
  configureMiddleware() {
    // Serve static files from the frontend
    this.app.use(express.static("../../frontend/src"));

    // Parse JSON bodies, limited to 10mb
    this.app.use(express.json({ limit: "10mb" }));

    // NOTE:
    // These middleware functions are built-in Express middleware. They are
    // used to process incoming requests before they are sent to the routes.
    // There are many middleware functions available in Express, and you can
    // also create custom middleware functions.
  }

  // Setup routes by using imported TaskRoutes, prefix routes with /api
  setupRoutes() {
    this.app.use("/api", UserRoutes);
    this.app.use("/api", SongRoutes);
  }

  // Start the server on a specified port
  start(port = 3000) {
    return this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

// Initialize and start the server
console.log("Starting server...");
await initializeModels();
console.log("Models initialized");
const server = new Server();
const app = server.app;
const runningServer = server.start();

export { app, runningServer };
