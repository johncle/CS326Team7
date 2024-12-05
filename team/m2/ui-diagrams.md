# 1. Home Screen - Music Discovery

![Home Screen - Music Discovery](https://github.com/user-attachments/assets/69366d1a-fbb8-47f9-a44b-d787c16bea31)

## Diagram Explanation:

This is the primary landing screen for users after they log in. At the top, there is a navigation bar with links for Home, Playlists, Tags, Communities, and Profile settings. The center of the screen displays a curated feed of songs based on the user's listening history and preferences. The sidebar offers a search bar where users can input tags (like genre, mood, tempo) to search for new songs or playlists.

- **Navigation Bar**: Allows users to switch between core sections such as Playlists, Communities, and their Profile.
- **Main Content Area**: Showcases song recommendations based on the user’s recent activity, including curated playlists and newly released songs.
- **Sidebar**: Provides a search function for filtering music by specific tags, genres, and moods.

## Use Case:

**Scenario**: A user logs in and wants to discover new music that fits their current mood.  
**User Action**: The user browses the recommendation feed in the center, selects a genre tag from the sidebar (e.g., "Chill"), and a new playlist tailored to that mood appears.  
**Goal**: The user is able to find songs that match their current vibe and add them to their personal playlist.

---

# 2. Mood and Event Playlist Generation

![Mood and Event Playlist Generation](https://github.com/user-attachments/assets/a1e19242-5773-4ac0-ad6d-9b3e3d044f07)

## Diagram Explanation:

This screen enables users to create a playlist for specific moods or events. The layout includes a playlist name field at the top, a dropdown menu to select moods (e.g., "Happy," "Study," "Party"), and a section below to drag and drop songs into the playlist.

- **Playlist Creation Form**: Users can name the playlist and select a mood or event to automatically generate songs.
- **Drag & Drop Feature**: Users can easily add songs from their recommended tracks or search results into their playlists.

## Use Case:

**Scenario**: A user wants to create a "Study" playlist.  
**User Action**: The user clicks on the "Create Playlist" button, selects "Study" from the mood dropdown, and the system automatically recommends songs. The user manually adds or removes songs based on preference.  
**Goal**: The user completes the playlist and listens to it while studying.

---

# 3. Community and Social Sharing Screen

![Community and Social Sharing Screen](https://github.com/user-attachments/assets/207404e0-038f-4c88-8ad3-c1ae12018229)

## Diagram Explanation:

This screen displays user communities and friends. Users can join communities based on genres or moods, interact by sharing songs, and view recommendations from friends.

- **Community Section**: Allows users to join groups with similar musical tastes.
- **Friend List and Messaging**: Users can see what their friends are listening to and share recommendations via chat.

## Use Case:

**Scenario**: A user wants to share a song they discovered with their group of friends.  
**User Action**: The user selects the "Friends" tab, sends a link to the song in the group chat, and starts a discussion.  
**Goal**: The user shares music and receives feedback from friends, building a social experience around song discovery.
<img width="888" alt="Screenshot 2024-10-21 at 10 17 56 PM" src="https://github.com/user-attachments/assets/69366d1a-fbb8-47f9-a44b-d787c16bea31">

# 4. Audio Visualiser

![audio Visualisor](https://github.com/user-attachments/assets/20d44151-47c0-4a50-8c7a-cb0e60ae8295)

## Diagram Explanation:

A reactive 3D audio waveform that reacts to the audio selected. It uses a particle system, which changes the location of the particles based on various features of the audio.

- **Song Input Box**: Users can select the song they would like the visualiser to visualize.
- **Visualiser**: The reactive particle system.

## Use Case:

**Scenario**: A user wants to see how their favorite song ‘looks’.  
**User Action**: They enter the name of the song.  
**Goal**: The particle system element analyzes the song and changes based on its features.

# 5. Mixed Keyword and Tag-Based Search Page

![Search Page](https://github.com/user-attachments/assets/7f9e4eff-aae9-4ab5-9497-ee5421e877e2)

## Diagram Explanation:

Describes how the search bar, page, and results should function and be displayed.

- **Search bar**: Allows user to enter a search query.
- **Search page**: Shows playlists for tags
- **Search results page**: Shows results of search query with songs and playlists

## Use Case:

**Scenario**: A user wants to search for songs and playlists based on keywords or tags.  
**User Action**: They enter a search query into the search bar.  
**Goal**: The app returns songs and playlists that the user is looking for.
