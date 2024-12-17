const API_URL = "http://localhost:3000/api/";

export const getAllSongs = async () => {
  const response = await fetch(`${API_URL}songs`);
  if (!response.ok) {
    throw new Error(`Failed to fetch songs: ${response.status}`);
  }
  return response.json();
};

export const getSongFile = (songId) => {
  return `${API_URL}songs/${songId}/file`;
};
