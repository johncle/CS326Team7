import express from "express";
import SongController from "../controller/SongController.js";

class SongRoutes {
  constructor() {
    this.router = express.Router();
    this.songController = new SongController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // DESCRIPTION
    //   Add a new song
    // REQUEST
    //   POST /songs
    //   {
    //     "id": "songId",
    //     "title": "Song Title",
    //     "artistName": "Artist Name",
    //     "albumName": "Album Name",
    //     "albumId": "Album Id",
    //     "coverUrl": "Cover Image URL",
    //     "durationMs": "Duration in ms"
    //   }
    // RESPONSE
    //   201 - Created: The song was created successfully
    //   400 - Bad Request: Missing required fields
    //   500 - Internal Server Error: Server encountered an error
    this.router.post("/songs", async (req, res) => {
      await this.songController.addSong(req, res);
    });

    // DESCRIPTION
    //   Get all songs
    // REQUEST
    //   GET /songs
    // RESPONSE
    //   200 - OK: Returns a list of songs
    //   500 - Internal Server Error: Server encountered an error
    this.router.get("/songs", async (req, res) => {
      await this.songController.getAllSongs(req, res);
    });

    // DESCRIPTION
    //   Get a specific song by id
    // REQUEST
    //   GET /songs/:id
    // RESPONSE
    //   200 - OK: Returns the song data
    //   404 - Not Found: No song found with given id
    //   500 - Internal Server Error: Server encountered an error
    this.router.get("/songs/:id", async (req, res) => {
      await this.songController.getSong(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new SongRoutes().getRouter();
