import { Post } from "../model/index.js";

export default class PostController {
  constructor() {
    this.model = Post;
  }

  // Method to add a new post
  async addPost(req, res) {
    const { title, content, songLink } = req.body;
    if (!title || !content || !songLink) {
      console.error("Missing title, content, or songLink");
      return res
        .status(400)
        .json({ error: "Missing title, content, or songLink" });
    }
    try {
      const newPost = await this.model.create({ title, content, songLink });
      console.log(`Post added: ${JSON.stringify(newPost)}`);
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Method to get all posts
  async getAllPosts(req, res) {
    try {
      const posts = await this.model.read();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Method to get a specific post by id
  async getPost(req, res) {
    const { id } = req.params;
    try {
      const post = await this.model.read(id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Method to update a post
  async updatePost(req, res) {
    const { id } = req.params;
    const { title, content, songLink } = req.body;
    if (!title || !content || !songLink) {
      console.error("Missing title, content, or songLink");
      return res
        .status(400)
        .json({ error: "Missing title, content, or songLink" });
    }
    try {
      const post = await this.model.update({ id, title, content, songLink });
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Method to delete a specific post by id
  async deletePost(req, res) {
    const { id } = req.params;
    try {
      const post = await this.model.delete({ id });
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({ message: `Post with id ${id} deleted` });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Method to delete all posts
  async deleteAllPosts(req, res) {
    try {
      await this.model.delete();
      res.status(200).json({ message: "All posts deleted successfully" });
    } catch (error) {
      console.error("Error deleting all posts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
