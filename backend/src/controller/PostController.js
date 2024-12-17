import { Post } from "../model/index.js";
import SpotifyController from "./SpotifyController.js";

export default class PostController {
  constructor() {
    this.model = Post;
    this.spotifyController = new SpotifyController();
  }

  // add new post
  async addPost(req, res) {
    if (!req.body || !req.body.content || !req.body.userId) {
      return res.status(400).json({ error: "content and userId are required" });
    }

    const { content, userId } = req.body;
    try {
      const post = await this.model.create({
        content,
        userId,
      });
      console.log(`created post for user ${userId}`);
      return res.status(201).json(post); // return created post
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ error: "Error creating post" });
    }
  }

  // get specific post by id
  async getPost(req, res) {
    const { id } = req.params;

    try {
      if (id) {
        const post = await this.model.read(id);
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json(post);
      } else {
        return res.status(400).json({ error: "post id is required" });
      }
    } catch (error) {
      console.error("Error reading post(s):", error);
      return res.status(500).json({ error: "Error reading post(s)" });
    }
  }

  // get all posts
  async getAllPosts(req, res) {
    try {
      const posts = await this.model.read();
      return res.status(200).json(posts);
    } catch (error) {
      console.error("Error reading all posts:", error);
      return res.status(500).json({ error: "Error reading all posts" });
    }
  }

  // update a post's content given id and content
  async updatePost(req, res) {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "content is required" });
    }

    try {
      const post = await this.model.update({ id, content });
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
      if (id) {
        const post = await this.model.delete({ id });
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json({ message: `Post with id ${id} deleted` });
      } else {
        console.error("No post id given to delete");
        return res.status(400).json({ error: "post id is required" });
      }
    } catch (error) {
      console.error("Error deleting post(s):", error);
      return res.status(500).json({ error: "Error deleting post(s)" });
    }
  }

  // delete all posts
  async deleteAllPosts(req, res) {
    try {
      await this.model.delete();
      console.log("Deleted all posts");
      return res
        .status(200)
        .json({ message: "All posts deleted successfully" });
    } catch (error) {
      console.error("Error deleting all posts:", error);
      return res.status(500).json({ error: "Error deleting all posts" });
    }
  }
}
