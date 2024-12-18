import express from "express";
import PostController from "../controller/PostController.js";

// Class to define post routes
class PostRoutes {
  constructor() {
    this.router = express.Router();
    this.postController = new PostController();
    this.initializeRoutes();
  }

  // Method to initialize all routes
  initializeRoutes() {
    // DESCRIPTION
    //   Add a new post
    // REQUEST
    //   POST /posts
    //   {
    //     "title": "Post title",
    //     "content": "Post content",
    //     "songLink": "Spotify song link"
    //   }
    // RESPONSE
    //   201 - Created: The post was created successfully
    //   400 - Bad Request: Missing required fields
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
    //   Update a post's details
    // REQUEST
    //   PUT /posts/:id
    //   {
    //     "title": "New post title",
    //     "content": "New post content",
    //     "songLink": "New Spotify song link"
    //   }
    // RESPONSE
    //   200 - OK: The post was updated
    //   400 - Bad Request: Missing required fields
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

  // Method to get the router
  getRouter() {
    return this.router;
  }
}

export default new PostRoutes().getRouter();