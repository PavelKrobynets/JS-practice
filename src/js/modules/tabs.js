export function tabs(tabsContent, tabs, activeClass) {
  const tabItems = document.querySelectorAll(tabsContent),
    tabsHeader = document.querySelectorAll(tabs);

  function hideTabContent() {
    tabItems.forEach((item) => {
      item.classList.remove("show", "fade");
      item.classList.add("hide");
    });

    tabsHeader.forEach((tab) => {
      tab.classList.remove(activeClass.slice(1));
    });
  }
  hideTabContent();

	function showContent(i = 0){
		tabItems[i].classList.remove("hide");
		tabItems[i].classList.add("show", "fade")
		tabsHeader[i].classList.add(activeClass.slice(1))
	}
	showContent();


	tabsHeader.forEach((item, i) => {
		item.addEventListener('click', e => {
			hideTabContent();
			showContent(i);
		})
	})
}
