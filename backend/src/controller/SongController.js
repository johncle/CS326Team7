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

  // get specific song by id
  async getSong(req, res) {
    const { id } = req.params;

    try {
      if (id) {
        const song = await this.model.read(id);
        if (!song) {
          return res.status(404).json({ error: "Song not found" });
        }
        return res.status(200).json(song);
      } else {
        return res.status(400).json({ error: "Song id is required" });
      }
    } catch (error) {
      console.error("Error reading song(s):", error);
      return res.status(500).json({ error: "Error reading song(s)" });
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

  // update a song's details given id
  async updateSong(req, res) {
    const { id } = req.params;
    const { title, artistName, albumName, albumId, coverUrl, durationMs } =
      req.body;

    if (
      !title ||
      !artistName ||
      !albumName ||
      !albumId ||
      !coverUrl ||
      !durationMs
    ) {
      return res.status(400).json({ error: "All song details are required" });
    }

    try {
      const song = await this.model.update({
        id,
        title,
        artistName,
        albumName,
        albumId,
        coverUrl,
        durationMs,
      });
      if (!song) {
        return res.status(404).json({ error: "Song not found" });
      }
      return res.status(200).json(song);
    } catch (error) {
      console.error("Error updating song:", error);
      return res.status(500).json({ error: "Error updating song" });
    }
  }
}
