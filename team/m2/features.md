# Core Features

## Music Discovery Algorithm

**Description:** This feature will analyze the user’s listening preferences by identifying favorite tags such as genre, mood, and instrumentation.
The algorithm will learn the user’s preferences and recommend songs that match their favorite tags, enhancing the personalization of recommendations. The Music Discovery Algorithm helps solve the problem of finding new music by using a tag-based system that learns and evolves with the user’s preferences, making the discovery process more intuitive and tailored.

**Point Value:** 5 points

**Assigned to:** Jeffery Deng

## Tag-Based Search (Filter In/Out)

**Description:** Users will be able to search for songs by filtering in or out specific tags. For example, a user might search for “upbeat jazz” or exclude “sad” songs from their results. This gives users granular control over the types of songs they want to discover or avoid.
Tag-based search allows users to fine-tune their discovery experience, making it easier to find songs that match specific criteria while filtering out unwanted tags.

**Point Value:** 5 points

**Assigned to:** Pavel Tverdokhlebov

## Mood and Event Playlists (AI DJ)

**Description:** This feature allows users to create playlists for specific moods or events, like “workout,” “relaxing,” or “celebration.” By utilizing tags like “upbeat” or “calm,” and integrating sentiment analysis, the system curates playlists that match the user’s mood or activity. The AI DJ can suggest songs based on the user’s current emotional state and previous preferences. This feature simplifies the playlist creation process by automatically selecting songs based on user moods or events, saving time and enhancing the user’s listening experience.

**Point Value:** 5 points

**Assigned to:** John Le

## Music Remixer

**Description:** This feature enables users to remix songs directly within the app. They can adjust tempo, add beats, and create personalized versions of their favorite tracks. This adds an element of creativity and interaction to the platform, allowing users to not just discover music but engage with it actively. The Music Remixer promotes user engagement by providing creative tools, allowing users to personalize and remix tracks according to their preferences.

**Point Value:** 5 points

**Assigned to:** Connor Cargill

## Community and Song Sharing

**Description:** Users can add friends, create or join communities, and share music with others. This feature allows users to collaborate on playlists, recommend songs, and discover new music together within their community. This feature fosters a social environment, enhancing the music discovery process by enabling users to share and explore music collectively.

**Point Value:** 5 points

**Assigned to:** Jimmy Nguyen

## Chat Feature

**Description:** This feature would enable users to chat with friends and community members directly within the app. They could discuss and recommend music in real-time, fostering deeper social interaction around music discovery. The chat feature would enhance the platform’s social functionality, allowing users to engage in real-time discussions about their favorite tracks and playlists.

**Point Value:** 5 points

**Assigned to:** Ahad Yildiz

## Reactive Audio Visualizer

**Description:** This feature will generate real-time visual effects that react to the music the user is playing. The visualizer will display dynamic animations and visual patterns that change based on the beat, tempo, and intensity of the song. Users will have the option to customize the visualizations or choose from pre-designed themes. The Reactive Audio Visualizer enhances the listening experience by adding a visual dimension to music. It provides a more immersive and engaging way for users to enjoy their favorite songs.

**Point Value:** 5 points

**Assigned to:** Sidharth Jain

[//]: # "---------------------------------------------------------------------"

# Pages

## App Controller

**Description:** The app is structured as an event-driven single page application where pages (views) are loaded and unloaded dynamically.

**Point Value:** 5 points

**Assigned to:** John Le

**Depends on:** Navbar, Home Page, Tags Page, Communities Page, Search Page, Login Page, Music Page

## Home Page

**Description:** The home page is the first thing a user sees (after logging in). It serves to let the user discover new music in the form of songs and playlists that are curated for the user, as well as trending songs/albums. It also shows playlists created by the user for easy access.

**Point Value:** 4 points

**Assigned to:** John Le

**Depends on:** Playlist Collection

## Tags Page

**Description:** The tags page shows playlists based on certain tags that can cover moods, genres, tempos, or events. For example, there could be playlists for chill, RnB, uptempo, and party.

**Point Value:** 4 points

**Assigned to:** Connor Cargill


## Communities Page

**Description:** The communities page allows users to create and join communities, and chat with others.

**Point Value:** 4 points

**Assigned to:** Jimmy Nguyen

## Login Page

**Description:** The login page is where users connect their Spotify account to Sonar, allowing them to access the website and search for songs.

**Point Value:** 4 points

**Assigned to:**

## Search Page

**Description:** The search page allows users to use advanced search for songs either by title or by tags, which can filter in or out specific tags. After submitting, it shows song/playlist results.

**Point Value:** 4 points

**Assigned to:** Pavel Tverdokhlebov

## Music Page

**Description:** Page that clicking on a playlist leads to, showing a list of individual song(s).

**Point Value:** 4 points

**Assigned to:**

[//]: # "---------------------------------------------------------------------"

# Components

## Navbar

**Description:** Navigation bar on left side to change between different views: Home, Tags, Communities, Profile, Log out. Potentially Search.

**Point Value:** 2 points

**Assigned to:** John Le

**Depends on:** Navbar Button

## Playlist

**Description:** Box button for presenting a song/playlist/album

**Point Value:** 2 points

**Assigned to:** Jeffrey Deng / Connor?

## Playlist Collection

**Description:** Scrollable (horizontally) list of playlist for grouping related playlists together by tag/category

**Point Value:** 3 points

**Assigned to:** Jeffrey / Connor?

**Depends on:** Playlist

## Search bar

**Description:** The search bar allows users to run a simple search for a song title or tags. Submitting the search redirects to the search page with the search query entered.

**Point Value:** 4 points

**Assigned to:** Pavel?

[//]: # "---------------------------------------------------------------------"

# Subcomponents

## Navbar Button

**Description:** A button on the navbar that when clicked, sends an event SwitchPage(pageName) that AppController listens to for changing the page.

**Point Value:** 1 point

**Assigned to:** John Le

[//]: # "---------------------------------------------------------------------"

# Feature template:

## Profile Page

**Description:** Display a user's activity Overview that can be:
Recently Played Tracks, list of songs the user has recently listened to, with album art and timestamps, and/or
Top Tracks and Artists,  The user's favorite tracks and artists over a time period (e.g., past month or all-time).

**Point Value:** 3 points

**Assigned to:** Connor?

**Depends on:** _(Optional)_ Feature B, Feature C
