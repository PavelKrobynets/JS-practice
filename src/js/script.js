"Use strict";

window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParrent = document.querySelector(".tabheader__items");

  function hidetabContent() {
    tabsContent.forEach((item) => {
      item.classList.remove("show", "fade");
      item.classList.add("hide");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show", "fade");
    tabs[i].classList.add("tabheader__item_active");
  }

  hidetabContent();
  showTabContent();

  tabsParrent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hidetabContent();
          showTabContent(i);
        }
      });
    }
  });

  const timerId = setTimeout(logger, 2000);
  clearInterval(timerId); // остановка таймера
  function logger() {
    console.log("Some text");
  }

  document.querySelector(".btn_white").addEventListener("click", () => {
    setTimeout(logger, 5000);
  });

  // let id = setTimeout(function log() {
  //   console.log("hello");
  //   id = setTimeout(log, 500);
  // }, 500);
});
