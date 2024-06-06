"Use strict";
import * as calculator from "./modules/calculator.js";
import * as cards from "./modules/cards.js";
import * as form from "./modules/form.js";
import * as modal from "./modules/modal.js";
import * as slider from "./modules/slider.js";
import * as tabs from "./modules/tabs.js";
import * as timer from "./modules/timer.js"

window.addEventListener("DOMContentLoaded", () => {

  calculator.calculator();
  cards.cards();
  form.form();
  modal.modal();
  slider.slider();
  tabs.tabs();
  timer.timer();
});
