"Use strict";

window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParrent = document.querySelector(".tabheader__items");

  function hidetabContent() {
    tabsContent.forEach((item) => {
      item.classList.remove("show");
      item.classList.add("hide");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i) {
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show");
    tabs[i].classList.add("tabheader__item_active");
  }

  hidetabContent();
  showTabContent(0);

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
});
