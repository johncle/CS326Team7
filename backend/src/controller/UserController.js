import { User } from "../model/index.js";

export default class UserController {
  constructor() {
    this.model = User;
  }

  // add new user
  async addUser(req, res) {
    if (!req.body || !req.body.username || !req.body.id) {
      return res.status(400).json({ error: "username and id are required" });
    }

    const { username, id, ownedPlaylists, followedPlaylists } = req.body;
    try {
      const user = await this.model.create({
        id,
        username,
        ownedPlaylists: ownedPlaylists ?? [],
        followedPlaylists: followedPlaylists ?? [],
      });
      console.log(`created user ${username} with id ${id}`);
      return res.status(201).json(user); // return created user
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(400)
          .json({ error: `User with id '${id}' already exists` });
      } else {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Error creating user" });
      }
    }
  }

  // get all users
  async getAllUsers(req, res) {
    try {
      const users = await this.model.read();
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error reading all users:", error);
      return res.status(500).json({ error: "Error reading all users" });
    }
  }
}
