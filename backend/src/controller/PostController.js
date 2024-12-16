import { Post } from "../model/index.js";

export default class PostController {
  constructor() {
    this.model = Post;
  }

  // add new post
  async addPost(req, res) {
    const { title, content, songId, songTitle } = req.body;

    // validate input
    if (!title || !content || !songId || !songTitle) {
      return res.status(400).json({ error: "title, content, songId, and songTitle are required" });
    }

    try {
      // create post
      const post = await this.model.create({ title, content, songId, songTitle });
      return res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ error: "Error creating post" });
    }
  }

  // get specific post by id
  async getPost(req, res) {
    const { id } = req.params;

    try {
      // read post
      const post = await this.model.read(id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      return res.status(200).json(post);
    } catch (error) {
      console.error("Error reading post:", error);
      return res.status(500).json({ error: "Error reading post" });
    }
  }

  // get all posts
  async getAllPosts(req, res) {
    try {
      // read all posts
      const posts = await this.model.read();
      return res.status(200).json(posts);
    } catch (error) {
      console.error("Error reading posts:", error);
      return res.status(500).json({ error: "Error reading posts" });
    }
  }

  // update a post given id and new data
  async updatePost(req, res) {
    const { id } = req.params;
    const { title, content, songId, songTitle } = req.body;

    // validate input
    if (!title || !content || !songId || !songTitle) {
      return res.status(400).json({ error: "title, content, songId, and songTitle are required" });
    }

    try {
      // update post
      const post = await this.model.update({ id, title, content, songId, songTitle });
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      return res.status(200).json(post);
    } catch (error) {
      console.error("Error updating post:", error);
      return res.status(500).json({ error: "Error updating post" });
    }
  }

  // delete a post given id
  async deletePost(req, res) {
    const { id } = req.params;

    try {
      // delete post
      const post = await this.model.delete({ id });
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      return res.status(200).json({ message: `Post with id ${id} deleted` });
    } catch (error) {
      console.error("Error deleting post:", error);
      return res.status(500).json({ error: "Error deleting post" });
    }
  }

  // delete all posts
  async deleteAllPosts(req, res) {
    try {
      // delete all posts
      await this.model.delete();
      return res.status(200).json({ message: "All posts deleted successfully" });
    } catch (error) {
      console.error("Error deleting all posts:", error);
      return res.status(500).json({ error: "Error deleting all posts" });
    }
  }
}
