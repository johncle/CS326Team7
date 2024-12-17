import { User } from "../model/index.js";
import SpotifyController from "./SpotifyController.js";

export default class UserController {
  constructor() {
    this.model = User;
    this.spotifyController = new SpotifyController();
  }

  // Add a new user to the database
  async addUser(req, res) {
    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).json({ error: "username and password are required" });
    }

    const { username, password, email } = req.body;
    try {
      const user = await this.model.create({
        username,
        password,
        email,
      });
      console.log(`Created user ${username}`);
      return res.status(201).json(user); // Return the created user
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(400)
          .json({ error: `User with username '${username}' already exists` });
      } else {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Error creating user" });
      }
    }
  }

  // Get a specific user by ID
  async getUser(req, res) {
    const { id } = req.params;

    try {
      if (id) {
        const user = await this.model.read(id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ error: "user id is required" });
      }
    } catch (error) {
      console.error("Error reading user(s):", error);
      return res.status(500).json({ error: "Error reading user(s)" });
    }
  }

  // Get all users from the database
  async getAllUsers(req, res) {
    try {
      const users = await this.model.read();
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error reading all users:", error);
      return res.status(500).json({ error: "Error reading all users" });
    }
  }

  // Update a user's username given their ID and new username
  async updateUsername(req, res) {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "username is required" });
    }

    try {
      const user = await this.model.update({ id, username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(400)
          .json({ error: `User with username '${username}' already exists` });
      } else {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Error updating user" });
      }
    }
  }

  // Update a user's password given their ID and new password
  async updatePassword(req, res) {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "password is required" });
    }

    try {
      const user = await this.model.update({ id, password });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Error updating user" });
    }
  }

  // Delete a user given their ID
  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      if (id) {
        const user = await this.model.delete({ id });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: `User with id ${id} deleted` });
      } else {
        console.error("No user id given to delete");
        return res.status(400).json({ error: "user id is required" });
      }
    } catch (error) {
      console.error("Error deleting user(s):", error);
      return res.status(500).json({ error: "Error deleting user(s)" });
    }
  }

  // Delete all users from the database
  async deleteAllUsers(req, res) {
    try {
      await this.model.delete();
      console.log("Deleted all users");
      return res
        .status(200)
        .json({ message: "All users deleted successfully" });
    } catch (error) {
      console.error("Error deleting all users:", error);
      return res.status(500).json({ error: "Error deleting all users" });
    }
  }

  // User login
  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required" });
    }

    try {
      const user = await this.model.User.findOne({ where: { username } });

      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).json({ error: "Error logging in user" });
    }
  }

  // Link Spotify account
  async linkSpotifyAccount(req, res) {
    await this.spotifyController.linkSpotifyAccount(req, res);
  }

  // Spotify login
  async spotifyLogin(req, res) {
    await this.spotifyController.spotifyLogin(req, res);
  }
}
