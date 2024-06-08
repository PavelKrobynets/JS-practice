import { postData } from "../services/services.js";
import { showModal, hideModal } from "./modal.js";

export function form(modalTimerId) {
  const message = {
      succes: "Form succesfully send!",
      error: "Failde to send form",
      loading: "../icons/spinner.svg",
    },
    forms = document.querySelectorAll("form");

		function sendData(form){
			form.addEventListener('submit',(e) => {
				e.preventDefault();

				const statusMessage = document.createElement('img');
				statusMessage.src = message.loading;
				statusMessage.style.cssText = `
					display: block;
					margin: 0 auto;
				`;
				form.insertAdjacentElement('afrerend', statusMessage);

				let formData = new FormData(form);

				const json = JSON.stringify(Object.fromEntries(formData.entries()))

				postData("http://localhost:3000/requests", json)
				.then((data) =>{
					console.log(data);
					//!!!!!!!
					statusMessage.remove();
				}).catch((error) => {
					console.log(error);
					//!!!!!!!
				}).finally(() => {
					form.reset();
				})
			})
		}

		function showThanksMessage(message){
			const modalDialog = document.querySelector('.modal__dialog');
			modalDialog.classList.add('hide');
			// showModal('.modal', modalTimerId);

			const thanksModal = document.createElement('div');
				thanksModal.classList.add('.modal__dialog', 'show');
			thanksModal.innerHTML = `
			<div class="modal__content">
								<div data-close class="modal__close">&times;</div>
								<div class="modal__title">${message}</div>
			`;
			document.querySelector('.modal').append(thanksModal);
			setTimeout(() => {
				thanksModal.remove();
				modalDialog.classList.add("show");
				modalDialog.classList.remove("hide");
				closeModal('.modal');
			}, 4000);
		}

		forms.forEach((item) => {
			sendData(item);
		})

		
}
