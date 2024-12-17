import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

async function handleSpotifyCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
    console.error("Authorization code not found in URL.");
    return;
  }

  const codeVerifier = localStorage.getItem("code_verifier");
  if (!codeVerifier) {
    console.error("Code verifier not found in localStorage.");
    return;
  }

  // Token exchange request
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", payload);

    if (!response.ok) {
      throw new Error(`Token request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.access_token) {
      throw new Error("Access token not received in response.");
    }

    console.log("Access Token:", data.access_token);
    console.log("Refresh Token:", data.refresh_token);

    localStorage.setItem("spotify_access_token", data.access_token);

    const userData = await fetchSpotifyUserInfo(data.access_token);
    console.log("Spotify User Data:", userData);

    const hub = EventHub.getInstance();
    hub.publish(Events.SwitchPage, "home");
  } catch (error) {
    console.error("Error during Spotify callback handling:", error);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  handleSpotifyCallback();
});