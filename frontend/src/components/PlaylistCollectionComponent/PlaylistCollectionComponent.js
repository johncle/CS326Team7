// frontend/src/components/PlaylistCollectionComponent/PlaylistCollectionComponent.js
import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { PlaylistComponent } from "../PlaylistComponent/PlaylistComponent.js";

export class PlaylistCollectionComponent extends BaseComponent {
  constructor(playlists) {
    super();
    this.playlists = playlists;
    this.loadCSS("PlaylistCollectionComponent");
  }

  render() {
    const container = document.createElement("div");
    container.className = "playlist-collection-container";

    this.playlists.forEach((playlist) => {
      const playlistComponent = new PlaylistComponent(playlist);
      container.appendChild(playlistComponent.render());
    });

    return container;
  }
}
