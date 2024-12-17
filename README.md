# How to run Sonar

## Setting up Spotify API

Our app uses spotify's API, which requires us to create an app on Spotify. You can get a spotify API client ID and client secret by following their tutorial: https://developer.spotify.com/documentation/web-api, specifically steps 1 and 2 of "Getting Started". You can ignore step 3.

We use an .env file to store API keys which contains the following values:

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
API_KEY=sonar1
```

Create an .env file as above, pasting in your spotify client id and secret into those values, and set API_KEY to `sonar1`.

## Running locally

1. Clone our repository with `git clone https://github.com/johncle/CS326Team7/`
2. Cd into the git repo and paste in the .env file at the root
3. Open `frontend/` in one terminal and `backend/` in another
4. On frontend, run `npm i && npm run dev`
5. On backend, run `npm i && npm start`

Now you can go to localhost:5173 on your browser to run our app!

# Sonar

## Problem Description

Music is something that is universally enjoyed, but sometimes listening to the same songs repeatedly can get boring. When people want to discover new music, finding songs they actually like isn't always easy. They may not know where to look, or when they do, they might be unhappy with the recommendations they get. With so much music out there, finding new tracks that fit their tastes can feel frustrating and time-consuming.

## Proposed Solution

Our web application, **Sonar**, aims to provide an engaging way for users to discover new music that aligns with their tastes and preferences. By utilizing recommendation algorithms and personalized features, Sonar simplifies the process of finding enjoyable songs while fostering communities where users can share their experiences with others.

Key features include:

- **Music Discovery**: Sonar's personalized recommendation algorithm curates songs tailored to a user's favorite genres, listening habits, and song preferences.
- **Mood and Event Playlists**: Users can generate playlists for specific moods or events such as chill, study, or rage.
- **Tag Search**: Users can search for songs based on specific tags such as genre, mood, tempo, instrumentation, etc.
- **Communities**: Users can add friends, join communities, and share songs within these groups.

By combining personalized recommendations, curated playlists, and social sharing features, Sonar will enhance the way users discover and engage with music, making music discovery more enjoyable and community-driven.

## Why This Matters

Music is not only a key source of personal enjoyment, but also an important way people connect with others. Whether it's bonding over shared tastes or discovering new artists together, music plays a big role in social interactions. However, finding new bangers can often be a slow and frustrating process, especially when existing playlists might not provide users with what they want. By allowing users to filter music based on tags, discovering and sharing new songs becomes easier and more enjoyable, helping people connect with others through shared playlists and recommendations.

## How It Works

### General App Structure

The app is structured as an event-driven single page application where the only html file in use is a barebones `index.html`, which sources `main.js`. This instantiates the App Controller in `AppControllerComponent.js` and creates a blank div for it. The App Controller is the main core of the app and handles nearly all of the functionality for loading components and handling events.

### Components

Each components should have its own folder with the `componentName.js` and `componentName.css`. All components should extend `BaseComponent`, which requires you to implement the `render()` method. This should create an HTML DOM element, add innerHTML and any JS functionality to it such as event listeners, and return the HTML element.

To use it, import the component into the App Controller and render it by adding it's `render()` output to the App Controller's `viewContainer` using `viewContainer.appendChild(componentName.render())`

### Event Handling

Event handling is structured using the observer or publisher/subscriber pattern. It works by having a singleton EventHub that stores events in an internal object.

- "Singleton" means there is only one central instance of this EventHub for the entire app, so please don't create new ones
- Instead, you can get the EventHub instance anywhere in the app with `EventHub.getInstance()`

You can have a component subscribe (listen) to an event with `EventHub.subscribe(event, listener)` where `event` is a string and `listener` is a callback function describing what to do with incoming data. When any class publishes data to that event with `EventHub.publish(event, data)` where `data` is anything you want, all listeners to that event call their functions with that data.

## Credits

The sonar icon is taken from https://www.vecteezy.com/vector-art/15351244-sonar-vector-icon
