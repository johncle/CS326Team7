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
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRoutes().getRouter();
