"Use strict";
import { tabs } from "./modules/tabs.js";
import { slider } from "./modules/slider.js";
import * as modal from "./modules/modal.js";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => {modal.showModal('.modal', modalTimerId)}, 15000);

  tabs(".tabcontent", ".tabheader__item", ".tabheader__item_active");
  slider({
    arrowPrev: ".offer__slider-prev",
    arrowNext: ".offer__slider-next",
    currentSlide: "#current",
    slides: ".offer__slide",
  });
  modal.modal("[data-modal]", ".modal", modalTimerId);
});
