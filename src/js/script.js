"Use strict";

window.addEventListener("DOMContentLoaded", () => {
  // Tabs

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

  //Timer

  const deadline = "2024-05-20";

  function getTimeRemaining(endTime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endTime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / (1000 * 60)) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

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

  // Using classes for cards

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 38;
    }
    changeToUAH() {
      this.price = +this.price * this.transfer;
    }
    showOnPage() {
      this.changeToUAH();
      const element = document.createElement("div");
      if (this.classes[0]) {
        this.classes.forEach((className) => element.classList.add(className));
      } else {
        element.classList.add("menu__item");
      }
      element.innerHTML = `
					<img src=${this.src} alt=${this.alt}>
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>
						`;
      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  // getResource("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).showOnPage();
  //   });
  // });

  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).showOnPage();
    });
  });

  // getResource("http://localhost:3000/menu")
  // .then(data => createCard(data));

  // function createCard(data) {
  // 	data.forEach(({ img, altimg, title, descr, price }) => {
  // 		const element= document.createElement('div');
  // 		price *= 40;
  // 		element.classList.add('menu__item');
  // 		element.innerHTML = `
  // 		<img src=${img} alt=${altimg}>
  // 				<h3 class="menu__item-subtitle">${title}</h3>
  // 				<div class="menu__item-descr">${descr}</div>
  // 				<div class="menu__item-divider"></div>
  // 				<div class="menu__item-price">
  // 					<div class="menu__item-cost">Цена:</div>
  // 					<div class="menu__item-total"><span>${price}</span> грн/день</div>
  // 				</div>
  // 		`;
  // 		document.querySelector('.menu .container').append(element);
  // 	})
  // }

  // Forms

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
          showThanksModal(message.succes);
          statusMessage.remove();
        })
        .catch((error) => {
          showThanksModal(message.error);
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
    openModal();

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
      closeModal();
    }, 4000);
  }

  forms.forEach((item) => {
    bindpostData(item);
  });

  const header = new Headers({ "Access-Control-Allow-Origin": "*" });

  fetch("http://localhost:3000/menu", { header: header })
    .then((response) => response.json())
    .then((users) => console.log(users));

  // Slider

  // const number = document.querySelector("#current"),
  //   arrowPrev = document.querySelector(".offer__slider-prev"),
  //   arrowNext = document.querySelector(".offer__slider-next"),
  //   slides = document.querySelectorAll(".offer__slide");

  // function hideSlide() {
  //   slides.forEach((item) => {
  //     item.classList.remove("show", "fade");
  //     item.classList.add("hide");
  //   });
  // }

  // function showSlide(i = 0) {
  //   slides[i - 1].classList.add("show", "fade");
  //   slides[i - 1].classList.remove("hide");
  // }
  // hideSlide();
  // showSlide(number.textContent);

  // arrowNext.addEventListener("click", () => {
  //   if (number.textContent < slides.length) {
  //     number.textContent++;
  //   } else {
  //     number.textContent = 1;
  //   }
  //   hideSlide();
  //   showSlide(number.textContent);
  //   number.textContent = `0${number.textContent}`
  // });

  // arrowPrev.addEventListener("click", () => {
  //   if (number.textContent > 1) {
  //     number.textContent--;
  //   } else {
  //     number.textContent = slides.length;
  //   }
  //   hideSlide();
  //   showSlide(number.textContent);
  // 	number.textContent = `0${number.textContent}`
  // });

  const slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slider = document.querySelector(".offer__slider"),
    slides = slidesWrapper.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol");
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const indicator = document.createElement("li");
    indicator.classList.add("dot");
    indicator.setAttribute("data-slide-to", i + 1);
    indicators.append(indicator);
  }
  const dot = document.querySelectorAll(".dot");
  dot[0].style.opacity = "1";

  function dotsOpacity(dot) {
    dot.forEach((item) => {
      item.style.opacity = "0.5";
    });
    dot[slideIndex - 1].style.opacity = "1";
  }
  function currentNumb() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }
  function toNumb(string) {
    return +string.replace(/\D/g, "");
  }
  next.addEventListener("click", () => {
    if (offset == toNumb(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += toNumb(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    currentNumb();
    dotsOpacity(dot);
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = toNumb(width) * (slides.length - 1);
    } else {
      offset -= toNumb(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    currentNumb();
    dotsOpacity(dot);
  });
  dot.forEach((item) => {
    item.addEventListener("click", (e) => {
      slideIndex = e.target.getAttribute("data-slide-to");
      offset = toNumb(width) * (slideIndex - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      currentNumb();
      dotsOpacity(dot);
    });
  });

  // Calculator

  const result = document.querySelector(".calculating__result");
  let sex = 'female', height, weight, age, ratio;
  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }

    if (sex == "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
		elements.forEach((element) => {
			element.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {
					ratio = +e.target.getAttribute("data-ratio");
				} else {
					sex = e.target.getAttribute("id"); 
				}
				elements.forEach(element => {
					element.classList.remove(activeClass);
				})
				e.target.classList.add(activeClass)
				calcTotal();
			});
		})
  }
	getStaticInformation("#gender", "calculating__choose-item_active");
	getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");

	function getDynamicInformation(selector){
		const input = document.querySelector(selector);
		input.addEventListener("input", () => {
			switch(input.getAttribute('id')){
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
					case 'age':
						age = +input.value;
						break;
			}
			calcTotal();
		})
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
});
