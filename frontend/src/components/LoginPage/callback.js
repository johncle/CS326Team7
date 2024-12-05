const clientId = "2227bc6062df471b9d0dfc84b488ee3d";
const redirectUri = "http://localhost:5173/callback";

async function handleSpotifyCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");

  try {
    // Exchange the authorization code for an access token
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier,
      }),
    });

    const data = await response.json();

    console.log("Access Token:", data.access_token);
    console.log("Refresh Token:", data.refresh_token);

    // Save the access token to localStorage (or your preferred storage)
    localStorage.setItem("spotify_access_token", data.access_token);

    // Fetch user information (optional, good for display)
    const userData = await fetchSpotifyUserInfo(data.access_token);
    console.log("Spotify User Data:", userData);

    // Redirect to home page and load its content
    const hub = EventHub.getInstance();
    hub.publish(Events.SwitchPage, "home");
  } catch (error) {
    console.error("Error during Spotify callback handling:", error);
  }
}

async function fetchSpotifyUserInfo(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
}

// Call the handler when the page loads
handleSpotifyCallback();