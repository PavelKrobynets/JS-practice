export function showModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("visible");
  modal.style.overflow = "visible";
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

export function hideModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove("visible");
  modal.style.overflow = "hidden";
}

export function modal(triggerSelector, modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector),
    triggers = document.querySelectorAll(triggerSelector);

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      showModal(modalSelector, modalTimerId);
    });
  });

  document.querySelector("[data-close]").addEventListener("click", () => {
    hideModal(modalSelector);
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("visible")) {
      hideModal(modalSelector);
    }
  });
}
