import { Sequelize } from "sequelize";
import UserModel from "./UserModel.js";
import PlaylistModel from "./PlaylistModel.js";
import SongModel from "./SongModel.js";
import PostModel from "./PostModel.js";


// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  logging: false, // silence foo
});


// Create models with sequelize instance
const User = new UserModel(sequelize);
const Playlist = new PlaylistModel(sequelize);
const Song = new SongModel(sequelize);
const Post = new PostModel(sequelize);


// Base sequelize models, not CRUD models
const models = {
  User: User.User,
  Playlist: Playlist.Playlist,
  Song: Song.Song,
  Post: Post.Post,
};
const fresh = true; // TODO: set false?, true - reset entire db when starting server


async function initializeModels() {
  // Activate associations using sequelize models
  User.associate(models);
  Playlist.associate(models);
  Song.associate(models);


  // Authenticate, sync, and init models
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");


    await sequelize.sync({ force: fresh });
    console.log("Database synchronized");


    await User.init(models, fresh);
    await Playlist.init(models, fresh);
    await Song.init(models, fresh);
    await Post.init(fresh);
    console.log("Initialized models");
  } catch (error) {
    console.error("Error initializing the database:", error);
  }
}


export { sequelize, User, Playlist, Song, Post, initializeModels };
