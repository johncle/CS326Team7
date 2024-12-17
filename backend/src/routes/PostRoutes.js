import express from "express";
import PostController from "../controller/PostController.js";

class PostRoutes {
  constructor() {
    this.router = express.Router();
    this.postController = new PostController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // DESCRIPTION
    //   Add a new post
    // REQUEST
    //   POST /posts
    //   {
    //     "title": "Post Title",
    //     "content": "Post Content",
    //     "songQuery": "Spotify Song Query"
    //   }
    // RESPONSE
    //   201 - Created: The post was created successfully
    //   400 - Bad Request: Missing title, content, or songQuery
    //   500 - Internal Server Error: Server encountered an error
    this.router.post("/posts", async (req, res) => {
      await this.postController.addPost(req, res);
    });

    // DESCRIPTION
    //   Get all posts
    // REQUEST
    //   GET /posts
    // RESPONSE
    //   200 - OK: Returns a list of posts
    //   500 - Internal Server Error: Server encountered an error
    this.router.get("/posts", async (req, res) => {
      await this.postController.getAllPosts(req, res);
    });

    // DESCRIPTION
    //   Get a specific post by id
    // REQUEST
    //   GET /posts/:id
    // RESPONSE
    //   200 - OK: Returns the post data
    //   404 - Not Found: No post found with given id
    //   500 - Internal Server Error: Server encountered an error
    this.router.get("/posts/:id", async (req, res) => {
      await this.postController.getPost(req, res);
    });

    // DESCRIPTION
    //   Update a post
    // REQUEST
    //   PUT /posts/:id
    //   {
    //     "title": "New Title",
    //     "content": "New Content",
    //     "songQuery": "New Spotify Song Query"
    //   }
    // RESPONSE
    //   200 - OK: The post was updated
    //   400 - Bad Request: Missing title, content, or songQuery
    //   404 - Not Found: No post found with given id
    //   500 - Internal Server Error: Server encountered an error
    this.router.put("/posts/:id", async (req, res) => {
      await this.postController.updatePost(req, res);
    });

    // DESCRIPTION
    //   Delete a specific post by id
    // REQUEST
    //   DELETE /posts/:id
    // RESPONSE
    //   200 - OK: The post was deleted
    //   404 - Not Found: No post found with given id
    //   500 - Internal Server Error: Server encountered an error
    this.router.delete("/posts/:id", async (req, res) => {
      await this.postController.deletePost(req, res);
    });

    // DESCRIPTION
    //   Delete all posts
    // REQUEST
    //   DELETE /posts
    // RESPONSE
    //   200 - OK: All posts were deleted
    //   500 - Internal Server Error: Server encountered an error
    this.router.delete("/posts", async (req, res) => {
      await this.postController.deleteAllPosts(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new PostRoutes().getRouter();
