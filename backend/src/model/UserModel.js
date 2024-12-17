/**
 * Create a User model in Sequelize with attributes for username, spotify id, owned playlists, and
 * followed playlists. Add model-level validation for required fields and CRUD operations. No need
 * for password since authentication is handled by Spotify's API; this is for caching user playlists
 * since repeatedly fetching those from Spotify may cause slow performance and API rate-limiting.
 * - Depends on: Playlist model (Sequelize)
 */

import { DataTypes } from "sequelize";

export default class UserModel {
  // load instance of sequelize
  constructor(sequelize) {
    // define the User model (based on https://api.spotify.com/v1/users/{user_id})
    this.User = sequelize.define("User", {
      // id (from spotify)
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      // display_name
      username: {
        type: DataTypes.STRING,
        allowNull: true, // spotify display_name is nullable
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spotifyId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  }

  // set up associations for index.js (once)
  associate(models) {
    // one user -> many owned playlists
    this.User.hasMany(models.Playlist, {
      foreignKey: {
        name: "ownerId", // associate user to playlist
        allowNull: true, // user might not be in our Users table but owns the playlist on spotify
      },
      as: "ownedPlaylists", // alias user.ownedPlaylists[]
    });

    // many users -> many followed playlists
    this.User.belongsToMany(models.Playlist, {
      through: "FollowedPlaylists", // join table name
      foreignKey: { name: "userId", allowNull: true }, // foreign key in join table referencing User
      otherKey: "playlistId", // foreign key in join table referencing Playlist
      as: "followedPlaylists", // create User.followedPlaylists[] field
    });
  }

  async init(models, fresh = false) {
    // sync models
    this.models = models;

    if (fresh) {
      await this.delete(); // clear all data

      // initial users
      await this.create(
        {
          id: "jmperezperez",
          username: "JMPerez²",
          ownedPlaylists: [
            {
              id: "3cEYpjA9oz9GiPac4AsH4n",
              title: "Spotify Web API Testing playlist",
              ownerId: "jmperezperez",
              coverUrl:
                "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da848d0ce13d55f634e290f744ba",
              snapshotId: "AAAAEur2+1I6iINI0+04uFfVLiVJraUQ",
            },
          ],
          followedPlaylists: [],
        },
        {
          // add User.ownedPlaylists
          include: [
            { model: this.models.Playlist, as: "ownedPlaylists" },
            { model: this.models.Playlist, as: "followedPlaylists" },
          ],
        },
      );

      await this.create({
        id: "smedjan",
        username: "smedjan",
        ownedPlaylists: [],
        followedPlaylists: [],
      });
    }

    console.log("User database initialized.");
  }

  async create(user) {
    return await this.User.create(user);
  }

  async read(id = null) {
    if (id) {
      return await this.User.findByPk(id, {
        // eager load ownedPlaylists and followedPlaylists
        include: [
          {
            model: this.models.Playlist,
            as: "ownedPlaylists",
            attributes: ["id", "title"], // only show identifiers for space
          },
          {
            model: this.models.Playlist,
            as: "followedPlaylists",
            attributes: ["id", "title"], // only show identifiers for space
          },
        ],
      });
    }

    // else return all users in db
    return await this.User.findAll({
      // eager load ownedPlaylists and followedPlaylists
      include: [
        {
          model: this.models.Playlist,
          as: "ownedPlaylists",
          attributes: ["id", "title"], // only show identifiers for space
        },
        {
          model: this.models.Playlist,
          as: "followedPlaylists",
          attributes: ["id", "title"], // only show identifiers for space
        },
      ],
    });
  }

  async update(user) {
    const userToUpdate = await this.User.findByPk(user.id);
    if (!userToUpdate) {
      // user not found
      return null;
    }

    await userToUpdate.update(user);
    return userToUpdate;
  }

  async updateWithExistingPlaylist(userId, playlistId) {
    const user = await this.User.findByPk(userId);
    if (!user) {
      console.error("User not found");
      return null;
    }

    const playlist = await this.models.Playlist.findByPk(playlistId);
    if (!playlist) {
      console.error("Playlist not found");
      return null;
    }

    await user.addOwnedPlaylists(playlist);
  }

  async delete(user = null) {
    if (user === null) {
      // delete all users
      await this.User.destroy({ truncate: true });
      return;
    }

    // check if user exists
    const userToDelete = await this.User.findByPk(user.id);
    if (!userToDelete) {
      // user not found
      return null;
    }

    // delete specific user
    await this.User.destroy({ where: { id: user.id } });
    return user;
  }
}
