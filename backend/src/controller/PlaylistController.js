import { Playlist, User } from "../model/index.js";

export default class PlaylistController {
  constructor() {
    this.playlistModel = Playlist;
    this.userModel = User;
  }

  // add new playlist
  async addPlaylist(req, res) {
    const { id, title, ownerId, coverUrl, snapshotId } = req.body;
    try {
      // validate input (coverUrl is nullable)
      if (!id || !title || !ownerId || !snapshotId) {
        return res.status(400).json({
          error: "id, title, owner id, and snapshot id are required",
        });
      }

      const newPlaylist = await this.playlistModel.create({
        id,
        title,
        ownerId,
        coverUrl,
        snapshotId,
      });
      return res.status(201).json(newPlaylist);
    } catch (error) {
      // failed to create because owner doesnt exist in Users table
      if (error.name === "SequelizeForeignKeyConstraintError") {
        try {
          // create user for owner, try searching on spotify first
          // cant directly use spotifyController because access token wont be synced
          const spotifyRes = await fetch(
            `http://localhost:3000/api/spotify/user/${ownerId}`,
          );
          if (spotifyRes.status === 200) {
            const { display_name } = spotifyRes.body;

            // create user based on spotify data
            await this.userModel.create({
              username: display_name,
              id: ownerId,
            });
          } else {
            // searching on spotify didnt work, so make a fake user for our app
            console.error(
              "couldn't get user from spotify:",
              await spotifyRes.json(),
            );
            await this.userModel.create({
              username: ownerId,
              id: ownerId,
            });
          }

          // now with user added, try creating playlist again
          // if successful, playlist is automatically added to user's ownedPlaylists
          const newPlaylist = await this.playlistModel.create({
            id,
            title,
            ownerId,
            coverUrl,
            snapshotId,
          });
          return res.status(201).json(newPlaylist);
        } catch (error2) {
          console.error("Error adding user or playlist:", error2);
          return res.status(500).json({ error: "Failed to add playlist." });
        }
      } else if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(400)
          .json({ error: `Playlist with id '${id}' already exists` });
      } else {
        console.error("Error adding playlist:", error);
        return res.status(500).json({ error: "Failed to add playlist." });
      }
    }
  }

  // get specific playlist by id
  async getPlaylist(req, res) {
    try {
      const { id } = req.params;
      const playlist = await this.playlistModel.read(id);

      if (!playlist) {
        return res.status(404).json({ error: "Playlist not found." });
      }
      return res.status(200).json(playlist);
    } catch (error) {
      console.error("Error getting playlist:", error);
      return res.status(500).json({ error: "Failed to get playlist." });
    }
  }

  // get all playlists
  async getAllPlaylists(req, res) {
    try {
      const playlists = await this.playlistModel.read();
      return res.status(200).json(playlists);
    } catch (error) {
      console.error("Error getting playlists:", error);
      return res.status(500).json({ error: "Failed to get playlists." });
    }
  }

  // update existing playlist
  async updatePlaylist(req, res) {
    try {
      const { id } = req.params;
      const { title, ownerId, coverUrl, snapshotId } = req.body;

      const playlist = await this.playlistModel.read(id);
      // ensure playlist exists
      if (!playlist) {
        return res.status(404).json({ error: "Playlist not found." });
      }

      const updatedPlaylist = await this.playlistModel.update({
        id,
        title,
        ownerId,
        coverUrl,
        snapshotId,
      });
      return res.status(200).json(updatedPlaylist);
    } catch (error) {
      console.error("Error updating playlist:", error);
      return res.status(500).json({ error: "Failed to update playlist." });
    }
  }

  // delete specific playlist by id
  async deletePlaylist(req, res) {
    try {
      const { id } = req.params;
      const playlist = await this.playlistModel.read(id);

      if (!playlist) {
        return res.status(404).json({ error: "Playlist not found." });
      }

      await this.playlistModel.delete(playlist);
      return res
        .status(200)
        .json({ message: `Playlist with id ${id} deleted.` });
    } catch (error) {
      console.error("Error deleting playlist:", error);
      return res.status(500).json({ error: "Failed to delete playlist." });
    }
  }

  // delete all playlists
  async deleteAllPlaylists(req, res) {
    try {
      await this.playlistModel.delete();
      return res.status(200).json({ message: "All playlists deleted." });
    } catch (error) {
      console.error("Error deleting all playlists:", error);
      return res.status(500).json({ error: "Failed to delete all playlists." });
    }
  }
}
