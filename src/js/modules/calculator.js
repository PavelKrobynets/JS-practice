export function calculator() {
  const result = document.querySelector(".calculating__result");
  let sex, height, weight, age, ratio;

  function getActivElements(selector, activeClass) {
    if (localStorage.getItem("sex")) {
      sex = localStorage.getItem("sex");
    } else {
      sex = "female";
    }
    if (localStorage.getItem("ratio")) {
      ratio = localStorage.getItem("ratio");
    } else {
      ratio = 1.375;
    }

    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.classList.remove(activeClass);
      if (element.getAttribute("id") === localStorage.getItem("sex")) {
        element.classList.add(activeClass);
      }
      if (
        element.getAttribute("data-ratio") === localStorage.getItem("ratio")
      ) {
        element.classList.add(activeClass);
      }
    });
  }
  getActivElements("#gender div", "calculating__choose-item_active");
  getActivElements(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

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

  function staticInfo(selector, activeClass) {
    const staticTabs = document.querySelectorAll(selector);

    staticTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", ratio);
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", sex);
        }
        staticTabs.forEach((tab) => {
          tab.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  staticInfo("#gender div", "calculating__choose-item_active");
  staticInfo(".calculating__choose_big div", "calculating__choose-item_active");

  function dynamicInfo(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  dynamicInfo("#height");
  dynamicInfo("#weight");
  dynamicInfo("#age");
}
