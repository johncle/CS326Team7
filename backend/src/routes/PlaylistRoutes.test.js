import { jest } from "@jest/globals";
import request from "supertest";
import { Playlist } from "../model/index.js";
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

describe("Playlist API Tests", () => {
  describe("GET /api/playlists", () => {
    test("should return empty array when no playlists exist", async () => {
      await Playlist.delete();
      const response = await request(app).get("/api/playlists");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("POST /api/playlists", () => {
    test("should create a new playlist", async () => {
      const playlistData = {
        id: "test123",
        title: "Test Playlist",
        ownerId: "user123",
        coverUrl: "http://example.com/image.jpg",
        snapshotId: "snapshot123",
      };

      const response = await request(app).post("/api/playlists").send(playlistData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(playlistData);
    });

    test("should return 400 if required fields are missing", async () => {
      const response = await request(app).post("/api/playlists").send({
        id: "test456",
        title: "Test Playlist 2",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "id, title, owner id, and snapshot id are required",
      );
    });
  });

  describe("GET /api/playlists/:id", () => {
    test("should return a playlist by ID", async () => {
      const response = await request(app).get("/api/playlists/test123");
      expect(response.status).toBe(200);
      expect(response.body.id).toBe("test123");
    });

    test("should return 404 if playlist not found", async () => {
      const response = await request(app).get("/api/playlists/unknown123");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Playlist not found.");
    });
  });

  describe("PUT /api/playlists/:id", () => {
    test("should update an existing playlist", async () => {
      const updatedData = {
        title: "Updated Playlist Title",
        ownerId: "user123", // owner should not change
        coverUrl: "http://example.com/newimage.jpg",
        snapshotId: "snapshot456",
      };

      const response = await request(app)
        .put("/api/playlists/test123")
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Updated Playlist Title");
    });

    test("should return 404 if playlist not found", async () => {
      const response = await request(app).put("/api/playlists/unknown123").send({
        title: "Nonexistent Playlist",
      });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Playlist not found.");
    });
  });

  describe("DELETE /api/playlists/:id", () => {
    test("should delete a playlist by ID", async () => {
      const response = await request(app).delete("/api/playlists/test123");
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Playlist with id test123 deleted.");
    });

    test("should return 404 if playlist not found", async () => {
      const response = await request(app).delete("/api/playlists/unknown123");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Playlist not found.");
    });
  });

  describe("DELETE /api/playlists", () => {
    test("should delete all playlists", async () => {
      // Create another playlist
      await request(app).post("/api/playlists").send({
        id: "test789",
        title: "Another Playlist",
        ownerId: "user789",
        coverUrl: "http://example.com/image.jpg",
        snapshotId: "snapshot789",
      });

      const response = await request(app).delete("/api/playlists");
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("All playlists deleted.");

      const getResponse = await request(app).get("/api/playlists");
      expect(getResponse.body).toEqual([]);
    });
  });
});
