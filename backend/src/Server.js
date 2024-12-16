// Server.js
import express from "express";
import "dotenv/config";
import UserRoutes from "./routes/UserRoutes.js";
import PlaylistRoutes from "./routes/PlaylistRoutes.js";
import SongRoutes from "./routes/SongRoutes.js";
import SpotifyRoutes from "./routes/SpotifyRoutes.js";
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

    // accept data from HTML forms through POST requests
    this.app.use(express.urlencoded({ extended: true }));

    // NOTE:
    // These middleware functions are built-in Express middleware. They are
    // used to process incoming requests before they are sent to the routes.
    // There are many middleware functions available in Express, and you can
    // also create custom middleware functions.

    // api key authorization
    const API_KEY = process.env.API_KEY;

    const validateApiKey = (req, res, next) => {
      const apiKey = req.headers["x-api-key"];
      if (apiKey !== API_KEY) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    };

    // protect api routes
    // this.app.use(validateApiKey);
  }

  // Setup routes by using imported TaskRoutes, prefix routes with /api
  setupRoutes() {
    this.app.use("/api", UserRoutes);
    this.app.use("/api", PlaylistRoutes);
    this.app.use("/api", SongRoutes);
    this.app.use("/api", SpotifyRoutes);
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
