export const videoPlayerInit = () => {
  // Получаем объекты со страницы ============================================

  const videoPlayer = document.querySelector(".video-player"),
    videoButtonPlay = document.querySelector(".video-button__play"),
    videoButtonStop = document.querySelector(".video-button__stop"),
    videoProgress = document.querySelector(".video-progress"),
    videoTimeTotal = document.querySelector(".video-time__total"),
    videoVimePassed = document.querySelector(".video-time__passed"),
    videoVolume = document.querySelector(".video-volume"),
    videoIconMute = document.querySelector(".video-icon__mute");

  // Создаем функции ========================================================

  const togleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove("fa-pause");
      videoButtonPlay.classList.add("fa-play");
    } else {
      videoButtonPlay.classList.add("fa-pause");
      videoButtonPlay.classList.remove("fa-play");
    }
  };

  const playVideo = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  const stopVideo = () => {
    videoPlayer.pause();
    videoPlayer.curentTime = 0;
  };

  const addZero = (n) => (n < 10 ? "0" + n : n);

  const timeUpdate = () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secodsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secodsTotal = Math.floor(duration % 60);

    videoVimePassed.textContent = `
		${addZero(minutePassed)}:
		${addZero(secodsPassed)}`;

    videoTimeTotal.textContent = `
		${addZero(minuteTotal)}:
   	${addZero(secodsTotal)}`;
  };

  const changeTime = () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.curentTime = (value * duration) / 100;
  };

  const changeVolume = () => {
    videoPlayer.volume = videoVolume.value / 100;
  };

  const muteVolume = () => {
    if (
      videoPlayer.volume === videoVolume.value / 100 ||
      videoPlayer.volume === 1
    ) {
      videoPlayer.volume = 0;
    } else if (videoPlayer.volume === 0) {
      videoPlayer.volume = videoVolume.value / 100;
    }
  };

  // Навешиваем обработчики ===================================================

  videoPlayer.addEventListener("click", playVideo);

  videoButtonPlay.addEventListener("click", playVideo);
  videoButtonStop.addEventListener("click", stopVideo);

  videoPlayer.addEventListener("play", togleIcon);
  videoPlayer.addEventListener("pause", togleIcon);
  videoPlayer.addEventListener("timeupdate", timeUpdate);

  videoProgress.addEventListener("change", changeTime);
  videoVolume.addEventListener("input", changeVolume);
  videoIconMute.addEventListener("click", muteVolume);
};
