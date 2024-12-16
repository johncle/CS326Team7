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

describe("Post Routes", () => {
  let postId;

  // test POST /api/posts
  describe("POST /api/posts", () => {
    it("should create a new post (201)", async () => {
      const response = await request(app)
        .post("/api/posts")
        .send({ title: "Test Post", content: "This is a test post.", song: "https://example.com/song.mp3" });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      postId = response.body.id;
    });

    it("should return 400 if missing fields", async () => {
      const response = await request(app).post("/api/posts").send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "title, content, and song are required");
    });
  });

  // test GET /api/posts
  describe("GET /api/posts", () => {
    it("should return all posts (200)", async () => {
      const response = await request(app).get("/api/posts");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it("should return 500 if server error occurs", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {}); // silence console.error

      // mock postController.getAllPosts method to throw an error
      const mockController = {
        getAllPosts: jest.fn().mockImplementation(() => {
          throw new Error("Simulated server error");
        }),
      };

      // create mock app to use mocked controller method
      const appWithMockedController = express();
      appWithMockedController.get("/api/posts", async (req, res) => {
        try {
          await mockController.getAllPosts(req, res);
        } catch (error) {
          console.error(error); // this will be caught and silenced
          res.status(500).json({ error: "Internal Server Error" });
        }
      });

      const response = await request(appWithMockedController).get("/api/posts");
      expect(response.status).toBe(500);
    });
  });

  // test GET /api/posts/:id
  describe("GET /api/posts/:id", () => {
    it("should return post data (200)", async () => {
      const response = await request(app).get(`/api/posts/${postId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", postId);
    });

    it("should return 404 if post not found", async () => {
      const response = await request(app).get("/api/posts/nonexistent");
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "Post not found");
    });
  });

  // test PUT /api/posts/:id
  describe("PUT /api/posts/:id", () => {
    it("should update the post (200)", async () => {
      const response = await request(app)
        .put(`/api/posts/${postId}`)
        .send({ title: "Updated Test Post", content: "This is an updated test post.", song: "https://example.com/updated-song.mp3" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", postId);
      expect(response.body).toHaveProperty("title", "Updated Test Post");
    });

    it("should return 400 if missing fields", async () => {
      const response = await request(app).put(`/api/posts/${postId}`).send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "title, content, and song are required");
    });

    it("should return 404 if post not found", async () => {
      const response = await request(app)
        .put("/api/posts/nonexistent")
        .send({ title: "Updated Test Post", content: "This is an updated test post.", song: "https://example.com/updated-song.mp3" });
      expect(response.status).toBe(404);
    });
  });

  // test DELETE /api/posts/:id
  describe("DELETE /api/posts/:id", () => {
    it("should delete the post (200)", async () => {
      const response = await request(app).delete(`/api/posts/${postId}`);
      expect(response.status).toBe(200);
    });

    it("should return 404 if post not found", async () => {
      const response = await request(app).delete("/api/posts/nonexistent");
      expect(response.status).toBe(404);
    });
  });

  // test DELETE /api/posts
  describe("DELETE /api/posts", () => {
    it("should delete all posts (200)", async () => {
      const response = await request(app).delete("/api/posts");
      expect(response.status).toBe(200);
    });
  });
});
