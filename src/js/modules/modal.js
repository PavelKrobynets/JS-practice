export function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	// modal.classList.add("visible");
	// modal.classList.remove("hidden");
	modal.classList.add("visible");
	document.body.style.overflow = "hidden";
	console.log(modalTimerId);
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

export function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	// modal.classList.add("hidden");
	// modal.classList.remove("visible");
	modal.classList.remove("visible");
	document.body.style.overflow = "visible";
}


export function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal

  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);


  modalTrigger.forEach((btn) => {
    btn.addEventListener("click",() => openModal(modalSelector, modalTimerId));
  });


  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modal.classList.contains("visible")) {
      closeModal(modalSelector);
    }
  });


  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll());
    }
  }

  window.addEventListener("scroll", showModalByScroll());
}
