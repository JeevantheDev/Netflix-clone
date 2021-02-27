export class VideoButton {
  backButton: HTMLSelectElement;
  videoContainer: HTMLSelectElement;
  video: HTMLVideoElement;
  controlsContainer: HTMLSelectElement;
  playPauseButton: HTMLSelectElement;
  volumeButton: HTMLSelectElement;
  fullScreenButton: HTMLSelectElement;
  playButton: HTMLSelectElement;
  pauseButton: HTMLSelectElement;
  fullVolumeButton: HTMLSelectElement;
  mutedButton: HTMLSelectElement;
  maximizeButton: HTMLSelectElement;
  minimizeButton: HTMLSelectElement;
  progressBar: HTMLSelectElement;
  watchedBar: HTMLSelectElement;
  timeLeft: HTMLSelectElement;
  videoState: string | null | undefined;
  constructor(state?: string) {
    this.backButton = document.querySelector(".back") as HTMLSelectElement;
    this.videoContainer = document.querySelector(
      ".video-container"
    ) as HTMLSelectElement;
    this.video = document.querySelector(
      ".video-container video"
    ) as HTMLVideoElement;
    this.controlsContainer = document.querySelector(
      ".video-container .controls-container"
    ) as HTMLSelectElement;
    this.playPauseButton = document.querySelector(
      ".video-container .controls button.play-pause"
    ) as HTMLSelectElement;
    this.volumeButton = document.querySelector(
      ".video-container .controls button.volume"
    ) as HTMLSelectElement;
    this.fullScreenButton = document.querySelector(
      ".video-container .controls button.full-screen"
    ) as HTMLSelectElement;
    this.playButton = this.playPauseButton.querySelector(
      ".playing"
    ) as HTMLSelectElement;
    this.pauseButton = this.playPauseButton.querySelector(
      ".paused"
    ) as HTMLSelectElement;
    this.fullVolumeButton = this.volumeButton.querySelector(
      ".full-volume"
    ) as HTMLSelectElement;
    this.mutedButton = this.volumeButton.querySelector(
      ".muted"
    ) as HTMLSelectElement;
    this.maximizeButton = this.fullScreenButton.querySelector(
      ".maximize"
    ) as HTMLSelectElement;
    this.minimizeButton = this.fullScreenButton.querySelector(
      ".minimize"
    ) as HTMLSelectElement;
    this.progressBar = document.querySelector(
      ".video-container .progress-controls .progress-bar"
    ) as HTMLSelectElement;
    this.watchedBar = document.querySelector(
      ".video-container .progress-controls .progress-bar .watched-bar"
    ) as HTMLSelectElement;
    this.timeLeft = document.querySelector(
      ".video-container .progress-controls .time-remaining"
    ) as HTMLSelectElement;
    this.videoState = state;
  }

  toggleBack() {
    location.reload();
  }

  playPause() {
    if (this.videoState === "play") {
      this.video.play();
      this.playButton.style.display = "none";
      this.pauseButton.style.display = "";

      this.video.addEventListener("timeupdate", () => {
        this.watchedBar.style.width =
          (this.video.currentTime / this.video.duration) * 100 + "%";
        // TODO: calculate hours as well...
        const totalSecondsRemaining =
          (this.video.duration % 60) - this.video.currentTime;
        const totalMinutesRemaining =
          this.video.duration / 60 - this.video.currentTime;
        // THANK YOU: BEGANOVICH
        const time = new Date();
        time.setSeconds(totalSecondsRemaining);
        time.setMinutes(totalMinutesRemaining);
        let hours = null;

        if (totalSecondsRemaining >= 3600) {
          hours = time.getHours().toString().padStart(1, "0");
        }
        // console.log(time.getMinutes().toString().padStart("2", "0"));

        let minutes = (this.video.duration / 60, 10)
          .toString()
          .padStart(2, "0");
        let seconds = time.getSeconds().toString().padStart(2, "0");

        this.timeLeft.textContent = `${
          hours ? hours : "00"
        }:${minutes}:${seconds}`;
      });
    } else {
      this.video.pause();
      this.playButton.style.display = "";
      this.pauseButton.style.display = "none";
    }
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
    if (this.video.muted) {
      this.fullVolumeButton.style.display = "none";
      this.mutedButton.style.display = "";
    } else {
      this.fullVolumeButton.style.display = "";
      this.mutedButton.style.display = "none";
    }
  }
  toggleFullScreen() {
    if (!document.fullscreenElement) {
      this.videoContainer.requestFullscreen();
      document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
          this.maximizeButton.style.display = "";
          this.minimizeButton.style.display = "none";
        } else {
          this.maximizeButton.style.display = "none";
          this.minimizeButton.style.display = "";
        }
      });
    } else {
      document.exitFullscreen();
    }
  }
  rewindButton() {
    this.video.currentTime -= 10;
  }
  fastForwardButton() {
    this.video.currentTime += 10;
  }
}
