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
  // Load instance of sequelize
  constructor(sequelize) {
    // Define the Post model
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
      songLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  }

  // Initialize the model
  async init(fresh = false) {
    if (fresh) {
      await this.delete(); // Clear all data
    }
    console.log("Post database initialized.");
  }

  // Create a new post
  async create(post) {
    return await this.Post.create(post);
  }

  // Read post(s)
  async read(id = null) {
    if (id) {
      return await this.Post.findByPk(id);
    }
    return await this.Post.findAll();
  }

  // Update a post
  async update(post) {
    const postToUpdate = await this.Post.findByPk(post.id);
    if (!postToUpdate) {
      return null; // Post not found
    }
    await postToUpdate.update(post);
    return postToUpdate;
  }


  // Delete post(s)
  async delete(post = null) {
    if (post === null) {
      await this.Post.destroy({ truncate: true }); // Delete all posts
      return;
    }
    const postToDelete = await this.Post.findByPk(post.id);
    if (!postToDelete) {
      return null; // Post not found
    }
    await this.Post.destroy({ where: { id: post.id } });
    return post;
  }
}
