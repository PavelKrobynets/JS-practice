export function slider() {
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
}

