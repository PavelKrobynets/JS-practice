"Use strict";
import { tabs } from "./modules/tabs.js";
import { slider } from "./modules/slider.js";

window.addEventListener("DOMContentLoaded", () => {
  tabs(".tabcontent", ".tabheader__item", ".tabheader__item_active");
	slider({
	arrowPrev: ".offer__slider-prev",
	arrowNext: ".offer__slider-next",
	currentSlide: "#current",
	slides:".offer__slide"
	});
});
