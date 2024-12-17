import express from "express";
import SongController from "../controller/SongController.js";
import path from "path";
import fs from "fs";

class SongRoutes {
  constructor() {
    this.router = express.Router();
    this.songController = new SongController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // DESCRIPTION
    //   Add a new song
    this.router.post("/songs", async (req, res) => {
      await this.songController.addSong(req, res);
    });

    // DESCRIPTION
    //   Get all songs
    this.router.get("/songs", async (req, res) => {
      await this.songController.getAllSongs(req, res);
    });

    // DESCRIPTION
    //   Get a specific song by id

    this.router.get("/songs/:id", async (req, res) => {
      await this.songController.getSong(req, res);
    });

    // DESCRIPTION
    //   Serve the song file given a song ID
    // REQUEST
    //   GET /songs/:id/file
    // RESPONSE
    //   200 - OK: Returns the song file
    //   404 - Not Found: If the file doesn't exist
    //   500 - Internal Server Error: If the server encounters an error
    this.router.get("/songs/:id/file", (req, res) => {
      const { id } = req.params;
      const songPath = path.resolve(`./src/uploads/songs/${id}.mp3`); // File path
      console.log(`Serving song file for song ID: ${songPath}`);

      fs.access(songPath, fs.constants.F_OK, (err) => {
        if (err) {
          console.error(`Song file not found: ${songPath}`);
          return res.status(404).json({ error: "Song file not found" });
        }

        // Serve the file
        res.sendFile(songPath, (err) => {
          if (err) {
            console.error(`Error serving song file: ${err.message}`);
            return res.status(500).json({ error: "Error serving song file" });
          }
        });
      });
    });

    // DESCRIPTION
    //   Update a song's details
    this.router.put("/songs/:id", async (req, res) => {
      await this.songController.updateSong(req, res);
    });

    // DESCRIPTION
    //   Delete a specific song by id
    this.router.delete("/songs/:id", async (req, res) => {
      await this.songController.deleteSong(req, res);
    });

    // DESCRIPTION
    //   Delete all songs
    this.router.delete("/songs", async (req, res) => {
      await this.songController.deleteAllSongs(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new SongRoutes().getRouter();
