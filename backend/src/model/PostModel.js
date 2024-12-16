/**
 * Create a Post model in Sequelize with attributes for title, content, songId, and songTitle.
 * Add model-level validation for required fields and CRUD operations.
 * - Each title is the title of a post created by a user.
 * - Each content is the content of the post, in text. Functionality only allows for text.
 * - Each songId is a unique identifier for a specific song on Spotify that can be played.
 * - Each songTitle is the title of the song associated with the post.
 */

import { DataTypes } from "sequelize";

export default class PostModel {
  // load instance of sequelize
  constructor(sequelize) {
    // define the Post model
    this.Post = sequelize.define("Post", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      songId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      songTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  }

  // initialize the model
  async init(fresh = false) {
    if (fresh) {
      await this.delete(); // clear all data
    }
    console.log("Post database initialized.");
  }

  // create a new post
  async create(post) {
    return await this.Post.create(post);
  }

  // read post(s)
  async read(id = null) {
    if (id) {
      return await this.Post.findByPk(id);
    }
    return await this.Post.findAll();
  }

  // update a post
  async update(post) {
    const postToUpdate = await this.Post.findByPk(post.id);
    if (!postToUpdate) {
      return null; // post not found
    }
    await postToUpdate.update(post);
    return postToUpdate;
  }

  // delete post(s)
  async delete(post = null) {
    if (post === null) {
      await this.Post.destroy({ truncate: true }); // delete all posts
      return;
    }
    const postToDelete = await this.Post.findByPk(post.id);
    if (!postToDelete) {
      return null; // post not found
    }
    await this.Post.destroy({ where: { id: post.id } });
    return post;
  }
}
