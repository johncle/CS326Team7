import "dotenv/config";
import express from "express";
import SpotifyController from "../controller/SpotifyController.js";

class SpotifyRoutes {
  constructor() {
    this.router = express.Router();
    this.spotifyController = new SpotifyController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Store code verifier for spotify in the session
    this.router.post("/spotify/store-code-verifier", (req, res) => {
      req.session.codeVerifier = req.body.codeVerifier;
      res.sendStatus(200);
    });

    // DESCRIPTION
    //   Handle Spotify callback to exchange authorization code for access and refresh tokens
    // REQUEST
    //   POST /spotify/callback
    //   Query:
    //     {
    //       "code": "authorizationCode",
    //     }
    // RESPONSE
    //   200 - OK: Tokens were successfully exchanged
    //     {
    //       "access_token": "string",
    //       "refresh_token": "string",
    //       "expires_in": "number"
    //     }
    //   400 - Bad Request: Missing authorization code or code verifier
    //   500 - Internal Server Error: Unexpected error during token exchange
    this.router.get("/spotify/callback", async (req, res) => {
      await this.spotifyController.getAccessToken(req, res);
    });

    // DESCRIPTION
    //   Fetch Spotify user profile by id, needs access token
    //   see https://developer.spotify.com/documentation/web-api/reference/get-users-profile
    // REQUEST
    //   GET /spotify/user/:id
    //   Params:
    //       "id": string
    //   Headers:
    //     Authorization: Bearer <access_token>
    // RESPONSE
    //   200 - OK: Successfully retrieved user profile
    //     {
    //       "id": "string",
    //       "display_name": "string",
    //       "images": [ { "url": "string" } ],
    //       ...
    //     }
    //   401 - Unauthorized: Missing or invalid authorization token
    //   400 - Bad Request: Failed to fetch user profile from Spotify
    //   500 - Internal Server Error: Unexpected error during profile retrieval
    this.router.get("/spotify/user/:id", async (req, res) => {
      await this.spotifyController.getUserProfile(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new SpotifyRoutes().getRouter();
