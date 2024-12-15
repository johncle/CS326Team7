import express from "express";
import PlaylistController from "../controller/PlaylistController.js";

class PlaylistRoutes {
  constructor() {
    this.router = express.Router();
    this.playlistController = new PlaylistController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // DESCRIPTION
    //   Get all playlists. This endpoint returns an object with a 'playlists' property
    //   containing an array of playlists.
    // REQUEST
    //   GET /playlists
    // RESPONSE
    //   [ {playlist1}, {playlist2}, ... ]
    // STATUS CODES
    //   200 - OK: The request was successful
    //   404 - Not Found: No playlists were found
    //   500 - Internal Server Error: The server encountered an error
    this.router.get("/playlists", async (req, res) => {
      await this.playlistController.getAllPlaylists(req, res);
    });

    // DESCRIPTION
    //   Get a specific playlist by ID. This endpoint returns the playlist with the specified ID.
    // REQUEST
    //   GET /playlists/:id
    // RESPONSE
    //   {
    //     "id": "playlistId",
    //     "title": "Playlist title",
    //     "ownerId": "owner id",
    //     "coverUrl": "Cover image URL",
    //     "snapshotId": "snapshotId"
    //   }
    // STATUS CODES
    //   200 - OK: The request was successful
    //   404 - Not Found: Playlist with the specified ID was not found
    //   500 - Internal Server Error: The server encountered an error
    this.router.get("/playlists/:id", async (req, res) => {
      await this.playlistController.getPlaylist(req, res);
    });

    // DESCRIPTION
    //   Add a new playlist. This endpoint creates a new playlist with the provided details.
    // REQUEST
    //   POST /playlists
    //   {
    //     "id": "spotifyId",
    //     "title": "Playlist title",
    //     "ownerId": "owner id",
    //     "coverUrl": "Cover image URL",
    //     "snapshotId": "snapshotId"
    //   }
    // RESPONSE
    //   {
    //     "id": "playlistId",
    //     "title": "Playlist title",
    //     "ownerId": "owner id",
    //     "coverUrl": "Cover image URL",
    //     "snapshotId": "snapshotId"
    //   }
    // STATUS CODES
    //   201 - OK: The playlist was created successfully
    //   400 - Bad Request: Missing required fields or invalid data
    //   500 - Internal Server Error: The server encountered an error
    this.router.post("/playlists", async (req, res) => {
      await this.playlistController.addPlaylist(req, res);
    });

    // DESCRIPTION
    //   Update an existing playlist by ID. This endpoint updates the playlist details.
    // REQUEST
    //   PUT /playlists/:id
    //   {
    //     "title": "New playlist title",
    //     "ownerId": "owner id",
    //     "coverUrl": "New cover image URL",
    //     "snapshotId": "New snapshotId"
    //   }
    // RESPONSE
    //   {
    //     "id": "playlistId",
    //     "title": "Updated playlist title",
    //     "ownerId": "owner id",
    //     "coverUrl": "Updated cover image URL",
    //     "snapshotId": "Updated snapshotId"
    //   }
    // STATUS CODES
    //   200 - OK: The playlist was updated successfully
    //   400 - Bad Request: Missing required fields or invalid data
    //   404 - Not Found: Playlist with the specified ID was not found
    //   500 - Internal Server Error: The server encountered an error
    this.router.put("/playlists/:id", async (req, res) => {
      await this.playlistController.updatePlaylist(req, res);
    });

    // DESCRIPTION
    //   Delete a specific playlist by ID. This endpoint deletes the playlist with the specified ID.
    // REQUEST
    //   DELETE /playlists/:id
    // RESPONSE
    //   { }
    // STATUS CODES
    //   200 - OK: The playlist was deleted successfully
    //   404 - Not Found: Playlist with the specified ID was not found
    //   500 - Internal Server Error: The server encountered an error
    this.router.delete("/playlists/:id", async (req, res) => {
      await this.playlistController.deletePlaylist(req, res);
    });

    // DESCRIPTION
    //   Delete all playlists. This endpoint deletes all playlists.
    // REQUEST
    //   DELETE /playlists
    // RESPONSE
    //   { }
    // STATUS CODES
    //   200 - OK: All playlists were deleted successfully
    //   500 - Internal Server Error: The server encountered an error
    this.router.delete("/playlists", async (req, res) => {
      await this.playlistController.deleteAllPlaylists(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new PlaylistRoutes().getRouter();
