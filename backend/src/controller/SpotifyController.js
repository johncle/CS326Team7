import "dotenv/config";

// controller for handling spotify API requests
export default class SpotifyController {
  constructor() {
    this.CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    this.CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    this.REDIRECT_URI = "http://localhost:3000/api/spotify/callback";
    this.spotifyApiBaseUrl = "https://api.spotify.com/v1";
  }

  /**
   * code modified from frontend/src/components/LoginPage/callback.js
   * takes in code and code verifier generated from client
   * returns: { access_token, refresh_token, expires_in } (from spotify response)
   */
  async getAccessToken(req, res) {
    const code = req.body;
    if (!code) {
      return res.status(400).json({ error: "Authorization code is required" });
    }

    // pass code verifier from frontend
    const codeVerifier = req.body.code_verifier;
    if (!codeVerifier) {
      return res.status(400).json({ error: "Code verifier is required" });
    }

    // Token exchange request
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: this.CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: this.REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    };

    try {
      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        payload,
      );

      if (!response.ok) {
        return res
          .status(response.status)
          .json({ error: "Token request failed" });
      }

      const data = await response.json();
      if (!data.access_token) {
        return res
          .status(400)
          .json({ error: "Access token not received in response." });
      }

      // send tokens to client
      return res.status(200).json({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
      });
    } catch (error) {
      console.error("Error in getAccessToken method:", error);
      return res
        .status(500)
        .json({ error: "Error during Spotify callback handling" });
    }
  }
}
