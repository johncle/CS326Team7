import express from "express";
import UserController from "../controller/UserController.js";

class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // DESCRIPTION
    //   Add a new user
    // REQUEST
    //   POST /users
    //   {
    //     "username": "username",
    //     "id": "userId"
    //   }
    // RESPONSE
    //   201 - Created: The user was created successfully
    //   400 - Bad Request: Missing username or id
    //   500 - Internal Server Error: Server encountered an error
    this.router.post("/users", async (req, res) => {
      await this.userController.addUser(req, res);
    });

    // DESCRIPTION
    //   Get all users
    // REQUEST
    //   GET /users
    // RESPONSE
    //   200 - OK: Returns a list of users
    //   500 - Internal Server Error: Server encountered an error
    this.router.get("/users", async (req, res) => {
      await this.userController.getAllUsers(req, res);
    });

    // DESCRIPTION
    //   Get a specific user by id
    // REQUEST
    //   GET /users/:id
    // RESPONSE
    //   200 - OK: Returns the user data
    //   404 - Not Found: No user found with given id
    //   500 - Internal Server Error: Server encountered an error
    this.router.get("/users/:id", async (req, res) => {
      await this.userController.getUser(req, res);
    });

    // DESCRIPTION
    //   Update a user's username
    // REQUEST
    //   PUT /users/:id
    //   {
    //     "username": "newUsername"
    //   }
    // RESPONSE
    //   200 - OK: The user's username was updated
    //   400 - Bad Request: Missing username
    //   404 - Not Found: No user found with given id
    //   500 - Internal Server Error: Server encountered an error
    this.router.put("/users/:id", async (req, res) => {
      await this.userController.updateUsername(req, res);
    });

    // DESCRIPTION
    //   Delete a specific user by id
    // REQUEST
    //   DELETE /users/:id
    // RESPONSE
    //   200 - OK: The user was deleted
    //   404 - Not Found: No user found with given id
    //   500 - Internal Server Error: Server encountered an error
    this.router.delete("/users/:id", async (req, res) => {
      await this.userController.deleteUser(req, res);
    });

    // DESCRIPTION
    //   Delete all users
    // REQUEST
    //   DELETE /users
    // RESPONSE
    //   200 - OK: All users were deleted
    //   500 - Internal Server Error: Server encountered an error
    this.router.delete("/users", async (req, res) => {
      await this.userController.deleteAllUsers(req, res);
    });

    // DESCRIPTION
    //   User login
    // REQUEST
    //   POST /login
    //   {
    //     "username": "username",
    //     "password": "password"
    //   }
    // RESPONSE
    //   200 - OK: Login successful
    //   401 - Unauthorized: Invalid username or password
    //   500 - Internal Server Error: Server encountered an error
    this.router.post("/login", async (req, res) => {
      await this.userController.login(req, res);
    });

    // DESCRIPTION
    //   Link Spotify account
    // REQUEST
    //   GET /spotify/link
    // RESPONSE
    //   200 - OK: Returns Spotify authorization URL
    //   500 - Internal Server Error: Server encountered an error
    this.router.get("/spotify/link", async (req, res) => {
      await this.userController.linkSpotifyAccount(req, res);
    });

    // DESCRIPTION
    //   Spotify login
    // REQUEST
    //   GET /spotify/login
    // RESPONSE
    //   200 - OK: Redirect to Spotify login
    //   500 - Internal Server Error: Server encountered an error
    this.router.get("/spotify/login", async (req, res) => {
      await this.userController.spotifyLogin(req, res);
    });

    // DESCRIPTION
    //   Update a user's username
    // REQUEST
    //   PUT /users/:id/username
    //   {
    //     "username": "newUsername"
    //   }
    // RESPONSE
    //   200 - OK: The user's username was updated
    //   400 - Bad Request: Missing username
    //   404 - Not Found: No user found with given id
    //   500 - Internal Server Error: Server encountered an error
    this.router.put("/users/:id/username", async (req, res) => {
      await this.userController.updateUsername(req, res);
    });

    // DESCRIPTION
    //   Update a user's password
    // REQUEST
    //   PUT /users/:id/password
    //   {
    //     "password": "newPassword"
    //   }
    // RESPONSE
    //   200 - OK: The user's password was updated
    //   400 - Bad Request: Missing password
    //   404 - Not Found: No user found with given id
    //   500 - Internal Server Error: Server encountered an error
    this.router.put("/users/:id/password", async (req, res) => {
      await this.userController.updatePassword(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRoutes().getRouter();
