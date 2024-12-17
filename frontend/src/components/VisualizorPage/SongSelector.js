import { getAllSongs, getSongFile } from "../../services/SongService.js";

export default class SongSelector {
  constructor(onSongSelect) {
    this.onSongSelect = onSongSelect; // Callback when a song is selected
    this.container = document.createElement("div");
    this.container.className = "song-selector";
    this.container.innerHTML = `
      <h3>Select a Song</h3>
      <ul id="song-list" class='song-list'></ul>
    `;
  }

  async render() {
    const songList = this.container.querySelector("#song-list");

    try {
      const songs = await getAllSongs(); // Fetch songs from backend
      songs.forEach((song) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${song.title} by ${song.artistName}`;
        listItem.className = "song-item";
        listItem.style.cursor = "pointer";
        listItem.onclick = () => {
          const fileUrl = getSongFile(song.id); // Construct file URL
          this.onSongSelect(fileUrl); // Notify the parent about the selected song
        };
        songList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error fetching songs:", error);
      songList.innerHTML = "<li class='error'>Error fetching songs</li>";
    }

    return this.container;
  }
}
