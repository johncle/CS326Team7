/**
 * Create a Song model in Sequelize with attributes for title, artist, album, duration, cover image
 * url, spotify album id, spotify id. Add model-level validation for required fields and CRUD
 * operations.
 * - Each song can be in multiple playlists
 */

import { DataTypes } from "sequelize";

export default class SongModel {
  // load instance of sequelize
  constructor(sequelize) {
    // Define the Song model (based on https://developer.spotify.com/documentation/web-api/reference/get-track)
    this.Song = sequelize.define("Song", {
      // id (from spotify)
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      // name
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // artists[0].name
      artistName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // album.name
      albumName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // album.id
      albumId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // album.images[0].url
      coverUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      // duration_ms
      durationMs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 0,
        },
      },
    });
  }

  // set up associations for index.js (once)
  associate(models) {
    this.Song.belongsToMany(models.Playlist, {
      through: "PlaylistSong", // join table name
      foreignKey: "songId",
      otherKey: "playlistId",
      as: "playlists", // alias Song.playlists[]
    });
  }

  async init(models, fresh = false) {
    if (fresh) {
      await this.delete(); // clear all data

      // initial song
      await this.create({
        id: "1QoyuMHNBe7lg3YW4Qtll4",
        title: "St. Chroma (feat. Daniel Caesar)",
        artistName: "Tyler, The Creator",
        albumName: "CHROMAKOPIA",
        albumId: "0U28P0QVB1QRxpqp5IHOlH",
        coverUrl:
          "https://i.scdn.co/image/ab67616d0000b273124e9249fada4ff3c3a0739c",
        durationMs: 197019,
      });
    }

    console.log("Song database initialized.");
  }

  async create(song) {
    return await this.Song.create(song);
  }

  async read(id = null) {
    if (id) {
      return await this.Song.findByPk(id); // primary key (spotify id)
    }
    // else return all songs in db
    return await this.Song.findAll();
  }

  async update(song) {
    const songToUpdate = await this.Song.findByPk(song.id);
    if (!songToUpdate) {
      console.error("Song not found.");
      return null;
    }

    await songToUpdate.update(song);
    return songToUpdate;
  }

  async delete(song = null) {
    if (song === null) {
      // delete all songs
      await this.Song.destroy({ truncate: true });
      console.log("All songs deleted.");
      return;
    }

    // delete specific song
    await this.Song.destroy({ where: { id: song.id } });
    console.log(`Song with id ${song.id} deleted.`);
    return song;
  }
}
