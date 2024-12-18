// Server.js
import express from "express";
import "dotenv/config";
import cors from "cors"; // Add this line
import session from "express-session";
import bodyParser from "body-parser";
import UserRoutes from "./routes/UserRoutes.js";
import PlaylistRoutes from "./routes/PlaylistRoutes.js";
import SongRoutes from "./routes/SongRoutes.js";
import SpotifyRoutes from "./routes/SpotifyRoutes.js";
import PostRoutes from "./routes/PostRoutes.js";
import { initializeModels } from "./model/index.js";

class Server {
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
  }

  // Configure middleware for static files and JSON parsing
  configureMiddleware() {
    // Enable CORS with default settings
    this.app.use(cors()); // Add this line

    // Serve static files from the frontend
    this.app.use(cors({ origin: "http://localhost:5173", credentials: true }));
    this.app.use(express.static("../../frontend/src"));

    // Parse JSON bodies, limited to 10mb
    this.app.use(express.json({ limit: "10mb" }));

    // Accept data from HTML forms through POST requests
    this.app.use(express.urlencoded({ extended: true }));

    // parse request body
    this.app.use(bodyParser.json());

    // session storage
    this.app.use(
      session({
        secret: "your-secret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // For HTTP testing
      }),
    );

    // api key authorization
    const API_KEY = process.env.API_KEY;

    const validateApiKey = (req, res, next) => {
      const apiKey = req.headers["x-api-key"];
      if (apiKey !== API_KEY) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    };

    // Protect API routes
    // this.app.use(validateApiKey);
  }

  // Setup routes by using imported TaskRoutes, prefix routes with /api
  setupRoutes() {
    this.app.use("/api", UserRoutes);
    this.app.use("/api", PlaylistRoutes);
    this.app.use("/api", SongRoutes);
    this.app.use("/api", SpotifyRoutes);
    this.app.use("/api", PostRoutes);
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
