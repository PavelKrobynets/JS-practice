"Use strict";
import { calculator } from "./modules/calculator.js";
import { cards } from "./modules/cards.js";
import { form } from "./modules/form.js";
import * as modal from "./modules/modal.js";
import { slider } from "./modules/slider.js";
import { tabs } from "./modules/tabs.js";
import { timer } from "./modules/timer.js";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(
    () => modal.openModal(".modal", modalTimerId),
    5000
  );

  calculator();
  cards();
  form("form", modalTimerId);
  modal.modal("[data-modal]", ".modal", modalTimerId);
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  timer(".timer", "2024-10-09");
});
