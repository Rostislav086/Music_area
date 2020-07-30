export const radioPlayerInit = () => {
  // Получаем элементы ======================================================

  const radio = document.querySelector(".radio"),
    radioCoverImg = document.querySelector(".radio-cover__img"),
    radioHeader = document.querySelector(".radio-header"),
    radioNavigation = document.querySelector(".radio-navigation"),
    radioItem = document.querySelectorAll(".radio-item"),
    radioStop = document.querySelector(".radio-stop"),
    radioHeaderBig = document.querySelector(".radio-header__big"),
    radioVolume = document.querySelector(".radio-volume"),
    radioIconMute = document.querySelector(".radio-icon__mute");

  const audio = new Audio();
  audio.type = "audio/aac";

  radioStop.disabled = true;

  // Функции ==================================================================

  const selecItem = (elem) => {
    radioItem.forEach((item) => item.classList.remove("select"));
    elem.classList.add("select");
  };

  const selectRadio = (event) => {
    const target = event.target;
    const parentTarget = target.closest(".radio-item");
    const title = parentTarget.querySelector(".radio-name").textContent;
    const img = parentTarget.querySelector(".radio-img").src;

    radioHeaderBig.textContent = title;
    radioCoverImg.src = img;

    selecItem(parentTarget);
    radioStop.disabled = false;
    audio.src = target.dataset.radioStantion;
    audio.play();
    changeImgRadioPlay();
  };

  const changeImgRadioPlay = () => {
    if (audio.paused) {
      radio.classList.remove("play");
      radioStop.classList.add("fa-play");
      radioStop.classList.remove("fa-stop");
    } else {
      radioStop.classList.remove("fa-play");
      radioStop.classList.add("fa-stop");
      radio.classList.add("play");
    }
  };

  const stopRadio = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeImgRadioPlay();
  };

  const changeVolume = () => {
    audio.volume = radioVolume.value / 100;
    console.log("audio.volume: ", audio.volume);
  };

  const muteVolume = () => {
    if (audio.volume !== 0) {
      audio.volume = 0;
      console.log("audio.volume: ", audio.volume);
    } else if (audio.volume === 0) {
      audio.volume = radioVolume.value / 100;
      console.log("audio.volume: ", audio.volume);
    }
  };

  //   Обработчики событий ======================================================

  radioNavigation.addEventListener("change", selectRadio);
  radioStop.addEventListener("click", stopRadio);

  radioVolume.addEventListener("change", changeVolume);
  radioIconMute.addEventListener("click", muteVolume);
};
