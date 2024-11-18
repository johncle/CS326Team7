// User Class
export class User {
  constructor(user_id, name, email, profile_picture, preferences = [], friends = [], chats = [], liked_songs = []) {
      this.user_id = user_id;
      this.name = name;
      this.email = email;
      this.profile_picture = profile_picture;
      this.preferences = preferences;
      this.friends = friends;
      this.chats = chats;
      this.liked_songs = liked_songs;
  }

  // Getters
  getUserID() {
      return this.user_id;
  }

  getName() {
      return this.name;
  }

  getEmail() {
      return this.email;
  }

  getProfilePicture() {
      return this.profile_picture;
  }

  getPreferences() {
      return this.preferences;
  }

  getFriends() {
      return this.friends;
  }

  getChats() {
      return this.chats;
  }

  getLikedSongs() {
      return this.liked_songs;
  }

  // Setters
  setName(newName) {
      this.name = newName;
  }

  setEmail(newEmail) {
      this.email = newEmail;
  }

  setProfilePicture(newPictureURL) {
      this.profile_picture = newPictureURL;
  }

  setPreferences(newPreferences) {
      this.preferences = newPreferences;
  }

  addFriend(friend) {
      this.friends.push(friend);
  }

  removeFriend(friendId) {
      this.friends = this.friends.filter(friend => friend.user_id !== friendId);
  }

  addChat(chat) {
      this.chats.push(chat);
  }

  addLikedSong(song) {
      this.liked_songs.push(song);
  }

  removeLikedSong(songId) {
      this.liked_songs = this.liked_songs.filter(song => song.song_id !== songId);
  }
}

// Chat Class
export class Chat {
  constructor(is_group, participants = [], message = "", picture = "") {
      this.is_group = is_group;
      this.participants = participants;
      this.message = message;
      this.picture = picture;
  }

  // Getters
  getParticipants() {
      return this.participants;
  }

  getMessages() {
      return this.message;
  }

  getPicture() {
      return this.picture;
  }

  // Setters
  setMessage(newMessage) {
      this.message = newMessage;
  }

  addParticipant(user) {
      this.participants.push(user);
  }

  removeParticipant(userId) {
      this.participants = this.participants.filter(participant => participant.user_id !== userId);
  }
}

// Song Class
export class Song {
  constructor(song_id, title, artist, album_name, album, picture, duration, song_url, likes, tags = []) {
      this.song_id = song_id;
      this.title = title;
      this.artist = artist;
      this.album_name = album_name;
      this.album = album; // Expecting Playlist object here
      this.picture = picture;
      this.duration = duration;
      this.song_url = song_url;
      this.likes = likes;
      this.tags = tags;
  }

  // Getters
  getSongID() {
      return this.song_id;
  }

  getTitle() {
      return this.title;
  }

  getArtist() {
      return this.artist;
  }

  getAlbum() {
      return this.album;
  }

  getPicture() {
      return this.picture;
  }

  getDuration() {
      return this.duration;
  }

  getSongURL() {
      return this.song_url;
  }

  getLikes() {
      return this.likes;
  }

  getTags() {
      return this.tags;
  }

  // Setters
  setTitle(newTitle) {
      this.title = newTitle;
  }

  setArtist(newArtist) {
      this.artist = newArtist;
  }

  setAlbum(newAlbum) {
      this.album = newAlbum;
  }

  setPicture(newPicture) {
      this.picture = newPicture;
  }

  setDuration(newDuration) {
      this.duration = newDuration;
  }

  setSongURL(newSongURL) {
      this.song_url = newSongURL;
  }

  setLikes(newLikes) {
      this.likes = newLikes;
  }

  setTags(newTags) {
      this.tags = newTags;
  }

  // Interactions
  addTag(tag) {
      if (!this.tags.includes(tag)) {
          this.tags.push(tag);
      }
  }

  removeTag(tag) {
      this.tags = this.tags.filter(existingTag => existingTag !== tag);
  }
}

// Playlist Class
export class Playlist {
  constructor(playlist_id, creator, songs = [], name, picture, description) {
      this.playlist_id = playlist_id;
      this.creator = creator; // Expecting User object
      this.songs = songs; // Expecting array of Song objects
      this.name = name;
      this.picture = picture;
      this.description = description;
  }

  // Getters
  getPlaylistID() {
      return this.playlist_id;
  }

  getCreator() {
      return this.creator;
  }

  getSongs() {
      return this.songs;
  }

  getName() {
      return this.name;
  }

  getPicture() {
      return this.picture;
  }

  getDescription() {
      return this.description;
  }

  // Setters
  setName(newName) {
      this.name = newName;
  }

  setPicture(newPicture) {
      this.picture = newPicture;
  }

  setDescription(newDescription) {
      this.description = newDescription;
  }

  // Interactions
  addSong(song) {
      this.songs.push(song);
  }

  removeSong(songId) {
      this.songs = this.songs.filter(song => song.song_id !== songId);
  }
}

// ListeningSession Class
export class ListeningSession {
  constructor(session_id, playlist, host, participants = [], start_time, end_time) {
      this.session_id = session_id;
      this.playlist = playlist; // Expecting Playlist object
      this.host = host; // Expecting User object
      this.participants = participants; // Expecting array of User objects
      this.start_time = start_time;
      this.end_time = end_time;
  }

  // Getters
  getSessionID() {
      return this.session_id;
  }

  getPlaylist() {
      return this.playlist;
  }

  getHost() {
      return this.host;
  }

  getParticipants() {
      return this.participants;
  }

  getStartTime() {
      return this.start_time;
  }

  getEndTime() {
      return this.end_time;
  }

  // Setters
  setEndTime(newEndTime) {
      this.end_time = newEndTime;
  }

  // Interactions
  addParticipant(user) {
      if (!this.participants.find(participant => participant.user_id === user.user_id)) {
          this.participants.push(user);
      }
  }

  removeParticipant(userId) {
      this.participants = this.participants.filter(participant => participant.user_id !== userId);
  }
}
