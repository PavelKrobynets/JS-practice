export function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  // Tabs

  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParrent = document.querySelector(tabsParentSelector);

  function hidetabContent() {
    tabsContent.forEach((item) => {
      item.classList.remove("show", "fade");
      item.classList.add("hide");
    });

    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show", "fade");
    tabs[i].classList.add(activeClass);
  }

  hidetabContent();
  showTabContent();

  tabsParrent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hidetabContent();
          showTabContent(i);
        }
      });
    }
  });
}

