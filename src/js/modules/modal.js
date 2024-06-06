export function modal() {
  // Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function openModal() {
    // modal.classList.add("visible");
    // modal.classList.remove("hidden");
    modal.classList.add("visible");
    document.body.style.overflow = "hidden";
    // clearInterval(modalTimerId);
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    // modal.classList.add("hidden");
    // modal.classList.remove("visible");
    modal.classList.remove("visible");
    document.body.style.overflow = "visible";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modal.classList.contains("visible")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll());
    }
  }

  window.addEventListener("scroll", showModalByScroll());
}
