import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class PlaylistComponent extends BaseComponent {
  constructor(playlist) {
    super();
    this.playlist = playlist;
    this.loadCSS("PlaylistComponent");
  }

  render() {
    const container = document.createElement('div');
    container.className = 'playlist-container';

    const title = document.createElement('h2');
    title.textContent = this.playlist.name;
    container.appendChild(title);

    const songList = document.createElement('ul');
    this.playlist.songs.forEach(song => {
      const songItem = document.createElement('li');
      songItem.textContent = song.title;
      songItem.addEventListener('click', () => {
        // Handle song click event (e.g., play song)
        console.log(`Playing song: ${song.title}`);
      });
      songList.appendChild(songItem);
    });
    container.appendChild(songList);

    return container;
  }
}