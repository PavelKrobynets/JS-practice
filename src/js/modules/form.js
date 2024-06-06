import * as modal from "./modal.js";

export function form() {
  // Form

  const forms = document.querySelectorAll("form"),
    message = {
      loading: "icons/005 spinner.svg",
      succes: "Thank you! We'll conect you soon",
      error: "Oops... Something went wrong",
    };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    return await res.json();
  };

  function bindpostData(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
      form.insertAdjacentElement("afterend", statusMessage);

      let formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          modal.modal.showThanksModal(message.succes);
          statusMessage.remove();
        })
        .catch((error) => {
          modal.modal.showThanksModal(message.error);
          console.log(error);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    modal.modal.openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.classList.add("show");
    thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      modal.modal.closeModal();
    }, 4000);
  }

  forms.forEach((item) => {
    bindpostData(item);
  });

  const header = new Headers({ "Access-Control-Allow-Origin": "*" });

  fetch("http://localhost:3000/menu", { header: header })
    .then((response) => response.json())
    .then((users) => console.log(users));
}
