import { jest } from "@jest/globals";
import request from "supertest";
import { Song } from "../model/index.js";
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

describe("Song Routes", () => {
  let songId;

  it("should add a new song", async () => {
    const newSong = {
      id: "songId123",
      title: "song name",
      artistName: "artist name",
      albumName: "album name",
      albumId: "albumId123",
      coverUrl:
        "https://i.scdn.co/image/ab67616d0000b273124e9249fada4ff3c3a0739c",
      durationMs: 808080,
    };

    const response = await request(app).post("/api/songs").send(newSong);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", newSong.id);
    expect(response.body).toHaveProperty("title", newSong.title);
    songId = response.body.id; // store song id for further tests
  });

  it("should get all songs", async () => {
    const response = await request(app).get("/api/songs");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // should return an array
    expect(response.body.length).toBeGreaterThan(0); // at least one song should exist
  });

  it("should get a specific song by id", async () => {
    const response = await request(app).get(`/api/songs/${songId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", songId);
  });

  it("should update a song's details", async () => {
    const updatedSong = {
      title: "St. Chroma (Remix)",
      artistName: "Tyler, The Creator (Remix)",
      albumName: "CHROMAKOPIA (Remix)",
      albumId: "0U28P0QVB1QRxpqp5IHOlH",
      coverUrl: "https://newcoverurl.com",
      durationMs: 200000,
    };

    const response = await request(app)
      .put(`/api/songs/${songId}`)
      .send(updatedSong);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", updatedSong.title);
    expect(response.body).toHaveProperty("artistName", updatedSong.artistName);
    expect(response.body).toHaveProperty("albumName", updatedSong.albumName);
    expect(response.body).toHaveProperty("coverUrl", updatedSong.coverUrl);
  });

  it("should delete a specific song", async () => {
    const response = await request(app).delete(`/api/songs/${songId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      `Song with id ${songId} deleted`,
    );
  });

  it("should delete all songs", async () => {
    const response = await request(app).delete("/api/songs");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "All songs deleted successfully",
    );
  });
});
