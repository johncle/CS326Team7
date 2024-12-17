import express from "express";
import UserController from "../controller/UserController.js";

// Class to define user routes
class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  // Method to initialize all routes
  initializeRoutes() {
    // Route to add a new user
    this.router.post("/users", async (req, res) => {
      await this.userController.addUser(req, res);
    });

    // Route to get all users
    this.router.get("/users", async (req, res) => {
      await this.userController.getAllUsers(req, res);
    });

    // Route to get a specific user by id
    this.router.get("/users/:id", async (req, res) => {
      await this.userController.getUser(req, res);
    });

    // Route to update a user's username
    this.router.put("/users/:id", async (req, res) => {
      await this.userController.updateUsername(req, res);
    });

    // Route to delete a specific user by id
    this.router.delete("/users/:id", async (req, res) => {
      await this.userController.deleteUser(req, res);
    });

    // Route to delete all users
    this.router.delete("/users", async (req, res) => {
      await this.userController.deleteAllUsers(req, res);
    });
  }

  // Method to get the router
  getRouter() {
    return this.router;
  }
}

export default new UserRoutes().getRouter();