export function slider({ arrowPrev, arrowNext, currentSlide, slides }) {
  const prev = document.querySelector(arrowPrev),
    next = document.querySelector(arrowNext),
    current = document.querySelector(currentSlide),
    allSlides = document.querySelectorAll(slides);

  function hideSlide() {
    allSlides.forEach((slide) => {
      slide.classList.remove("show", "fade"), slide.classList.add("hide");
    });
  }
  hideSlide();

  function showSlide(i = 0) {
    allSlides[i - 1].classList.remove("hide");
    allSlides[i - 1].classList.add("show", "fade");
  }
  showSlide(current.textContent);

  next.addEventListener("click", () => {
    if (current.textContent < allSlides.length && current.textContent < 10) {
      current.textContent++;
      current.textContent = `0${current.textContent}`;
    } else if (current.textContent >= 10) {
      current.textContent++;
    } else {
      current.textContent = 1;
      current.textContent = `0${current.textContent}`;
    }
		hideSlide();
    showSlide(current.textContent);
  });

  prev.addEventListener("click", () => {
    if (current.textContent > 1) {
      current.textContent--;
      current.textContent = `0${current.textContent}`;
    } else {
      current.textContent = allSlides.length;
      current.textContent = `0${current.textContent}`;
    }
		hideSlide();
    showSlide(current.textContent);
  });
}
