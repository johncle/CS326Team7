import { Song } from "../model/index.js";

export default class SongController {
  constructor() {
    this.model = Song;
  }

  // add new song
  async addSong(req, res) {
    if (
      !req.body ||
      !req.body.id ||
      !req.body.title ||
      !req.body.artistName ||
      !req.body.albumName ||
      !req.body.albumId ||
      !req.body.coverUrl ||
      !req.body.durationMs
    ) {
      return res.status(400).json({
        error:
          "id, title, artistName, albumName, albumId, coverUrl, and durationMs are required",
      });
    }

    const { id, title, artistName, albumName, albumId, coverUrl, durationMs } =
      req.body;
    try {
      const song = await this.model.create({
        id,
        title,
        artistName,
        albumName,
        albumId,
        coverUrl,
        durationMs,
      });
      console.log(`Created song ${title} by ${artistName}`);
      return res.status(201).json(song); // return created song
    } catch (error) {
      console.error("Error creating song:", error);
      return res.status(500).json({ error: "Error creating song" });
    }
  }

  // get all songs
  async getAllSongs(req, res) {
    try {
      const songs = await this.model.read();
      return res.status(200).json(songs);
    } catch (error) {
      console.error("Error reading all songs:", error);
      return res.status(500).json({ error: "Error reading all songs" });
    }
  }
}
