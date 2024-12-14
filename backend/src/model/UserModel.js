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
}
