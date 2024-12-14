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
}
