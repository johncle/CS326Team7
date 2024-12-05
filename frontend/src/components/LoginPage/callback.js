// Updated function: handleSpotifyCallback token request logic
async function handleSpotifyCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");

  // Updated token exchange request (from tutorial)
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
    const data = await response.json();

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
