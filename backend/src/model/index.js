import { Sequelize } from "sequelize";
import UserModel from "./UserModel.js";
import PlaylistModel from "./PlaylistModel.js";
import SongModel from "./SongModel.js";

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  logging: false, // silence foo
});

// create models with sequelize instance
const User = new UserModel(sequelize);
const Playlist = new PlaylistModel(sequelize);
const Song = new SongModel(sequelize);
// base sequelize models, not CRUD models
const models = {
  User: User.User,
  Playlist: Playlist.Playlist,
  Song: Song.Song,
};
const fresh = true; // TODO: set false?, true - reset entire db when starting server

async function initializeModels() {
  // activate associations using sequelize models
  User.associate(models);
  Playlist.associate(models);
  Song.associate(models);

  // authenticate, sync, and init models
  // An exception will be thrown if either of these operations fail.
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ force: fresh });
    console.log("Database synchronized");

    await User.init(models, fresh);
    await Playlist.init(models, fresh);
    await Song.init(models, fresh);
    console.log("initialized models");
  } catch (error) {
    console.error("Error initializing the database:", error);
  }
}

export { sequelize, User, Playlist, Song, initializeModels };
