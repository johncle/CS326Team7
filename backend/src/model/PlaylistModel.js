/**
 * Create a Playlist model in Sequelize with attributes for title, owner id, cover image, spotify
 * id, snapshot id, and array of Songs. Add model-level validation for required fields and CRUD
 * operations.
 * - Snapshot id is a unique id for a specific version of a playlist that we can use to tell if it has
 * been modified.
 * - Every playlist is owned by a spotify user, but many are owned by users who aren't on sonar.
 * - Each playlist can be followed by multiple users.
 * - Each playlist can have multiple songs
 * - Depends on: Song model (Sequelize)
 */

import { DataTypes } from "sequelize";

export default class PlaylistModel {
  // load instance of sequelize
  constructor(sequelize) {
    // define the Playlist model (based on https://developer.spotify.com/documentation/web-api/reference/get-playlist)
    this.Playlist = sequelize.define("Playlist", {
      // id (from spotify)
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      // name
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // owner.id (also corresponds to user.id if they are in our users db)
      ownerId: {
        type: DataTypes.STRING,
        allowNull: true, // playlist still exists even if user is deleted
      },
      // images[0].url (largest image)
      coverUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      // snapshot_id
      snapshotId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  }

  // set up associations for index.js (once)
  associate(models) {
    // many playlists -> many following users
    this.Playlist.belongsToMany(models.User, {
      through: "FollowedPlaylists", // join table name
      foreignKey: "playlistId", // foreign key in join table referencing Playlist
      otherKey: "userId", // foreign key in join table referencing User
      as: "followers", // alias Playlist.followers[]
    });

    // many playlists -> many songs
    this.Playlist.belongsToMany(models.Song, {
      through: "PlaylistSong", // join table name
      foreignKey: "playlistId",
      otherKey: "songId",
      as: "songs", // alias Playlist.songs[]
    });
  }

  async init(models, fresh = false) {
    if (fresh) {
      await this.delete(); // clear all data

      // initial playlist
      await this.create({
        id: "3cEYpjA9oz9GiPac4AsH4n",
        title: "Spotify Web API Testing playlist",
        ownerId: "jmperezperez",
        coverUrl:
          "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da848d0ce13d55f634e290f744ba",
        snapshotId: "AAAAEur2+1I6iINI0+04uFfVLiVJraUQ",
      });
    }

    console.log("Playlist database initialized.");
  }

  async create(playlist) {
    return await this.Playlist.create(playlist);
  }

  async read(id = null) {
    if (id) {
      return await this.Playlist.findByPk(id); // primary key (spotify id)
    }
    // else return all playlists in db
    return await this.Playlist.findAll();
  }

  async update(playlist) {
    const playlistToUpdate = await this.Playlist.findByPk(playlist.id);
    if (!playlistToUpdate) {
      return null;
    }

    await playlistToUpdate.update(playlist);
    return playlistToUpdate;
  }

  async delete(playlist = null) {
    if (playlist === null) {
      // delete all playlists
      await this.Playlist.destroy({ truncate: true });
      return;
    }

    // check if playlist exists
    const playlistToDelete = await this.Playlist.findByPk(playlist.id);
    if (!playlistToDelete) {
      // playlist not found
      return null;
    }

    // delete specific playlist
    await this.Playlist.destroy({ where: { id: playlist.id } });
    return playlist;
  }
}
