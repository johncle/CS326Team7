export class MusicPlayerComponent {
  constructor() {
    this.audio = new Audio();
  }

  render() {
    const container = document.createElement('div');
    container.className = 'music-player';

    const playButton = document.createElement('button');
    playButton.innerText = 'Play';
    playButton.addEventListener('click', () => this.play());

    const pauseButton = document.createElement('button');
    pauseButton.innerText = 'Pause';
    pauseButton.addEventListener('click', () => this.pause());

    container.appendChild(playButton);
    container.appendChild(pauseButton);

    return container;
  }
//cant use spotify API for music playing
  play() {
    this.audio.src = 'path/to/your/music/file.mp3';
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }
}