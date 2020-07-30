"use strict";

import { radioPlayerInit } from "./radioPlayer.js";
import { videoPlayerInit } from "./videoPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";

videoPlayerInit();
radioPlayerInit();

// получаем элементы со страницы ==============================================
const playerBtn = document.querySelectorAll(".player-btn"),
  playerBlock = document.querySelectorAll(".player-block"),
  temp = document.querySelector(".temp");

// Определяем функции =========================================================
const deactivationPlayer = () => {
  temp.style.display = "none";
  playerBtn.forEach((item) => item.classList.remove("active"));
  playerBlock.forEach((item) => item.classList.remove("active"));
};
// Обработчики событий ========================================================

// Вызов функций ==============================================================

playerBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    deactivationPlayer();
    btn.classList.add("active");
    playerBlock[index].classList.add("active");
  });
});
