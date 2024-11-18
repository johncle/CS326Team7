## Description:

This sequence diagram shows how a user interacts with the PlaylistCollectionComponent and PlaylistComponent to display a collection of playlists. The PlaylistCollectionComponent creates individual PlaylistComponent instances for each playlist, which render their details and return them. The final rendered playlist collection is then returned to the user.
## Diagram

```mermaid
sequenceDiagram
    participant User
    participant PlaylistCollectionComponent
    participant PlaylistComponent

    User->>PlaylistCollectionComponent: Instantiate with playlists
    PlaylistCollectionComponent->>PlaylistComponent: Instantiate for each playlist
    PlaylistComponent->>PlaylistComponent: Render playlist details
    PlaylistComponent-->>PlaylistCollectionComponent: Return rendered playlist
    PlaylistCollectionComponent-->>User: Return rendered playlist collection
```
