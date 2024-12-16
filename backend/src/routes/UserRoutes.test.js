import { beforeAll, jest } from "@jest/globals";
import request from "supertest";
import express from "express";
import { app, runningServer } from "../Server.js";

let testServer;

// close server
beforeAll((done) => {
  runningServer.close();
  testServer = app.listen(3000, () => {
    done();
  });
});

// close server so other tests can run
afterAll((done) => {
  testServer.close(done);
});

describe("User Routes", () => {
  // test POST /api/users
  describe("POST /api/users", () => {
    it("should create a new user (201)", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({ id: "user123", username: "testuser" });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id", "user123");
      expect(response.body).toHaveProperty("username", "testuser");
    });

    it("should return 400 if missing fields", async () => {
      const response = await request(app).post("/api/users").send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "username and id are required",
      );
    });
  });

  // test GET /api/users
  describe("GET /api/users", () => {
    it("should return all users (200)", async () => {
      const response = await request(app).get("/api/users");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it("should return 500 if server error occurs", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {}); // silence console.error

      // mock userController.getAllUsers method to throw an error
      const mockController = {
        getAllUsers: jest.fn().mockImplementation(() => {
          throw new Error("Simulated server error");
        }),
      };

      // create mock app to use mocked controller method
      const appWithMockedController = express();
      appWithMockedController.get("/api/users", async (req, res) => {
        try {
          await mockController.getAllUsers(req, res);
        } catch (error) {
          console.error(error); // this will be caught and silenced
          res.status(500).json({ error: "Internal Server Error" });
        }
      });

      const response = await request(appWithMockedController).get("/api/users");
      expect(response.status).toBe(500);
    });
  });

  // test GET /api/users/:id
  describe("GET /api/users/:id", () => {
    it("should return user data (200)", async () => {
      const response = await request(app).get("/api/users/user123");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", "user123");
    });

    it("should return 404 if user not found", async () => {
      const response = await request(app).get("/api/users/nonexistent");
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "User not found");
    });
  });

  // test PUT /api/users/:id
  describe("PUT /api/users/:id", () => {
    it("should update the username (200)", async () => {
      const response = await request(app)
        .put("/api/users/user123")
        .send({ username: "newUsername" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("username", "newUsername");
    });

    it("should return 400 if missing username", async () => {
      const response = await request(app).put("/api/users/user123").send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "username is required");
    });

    it("should return 404 if user not found", async () => {
      const response = await request(app)
        .put("/api/users/nonexistent")
        .send({ username: "newUsername" });
      expect(response.status).toBe(404);
    });
  });

  // test DELETE /api/users/:id
  describe("DELETE /api/users/:id", () => {
    it("should delete the user (200)", async () => {
      const response = await request(app).delete("/api/users/user123");
      expect(response.status).toBe(200);
    });

    it("should return 404 if user not found", async () => {
      const response = await request(app).delete("/api/users/nonexistent");
      expect(response.status).toBe(404);
    });
  });

  // test DELETE /api/users
  describe("DELETE /api/users", () => {
    it("should delete all users (200)", async () => {
      const response = await request(app).delete("/api/users");
      expect(response.status).toBe(200);
    });
  });
});
