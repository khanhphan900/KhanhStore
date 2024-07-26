document.addEventListener("DOMContentLoaded", function () {
  //#region Movement bar

  const nav = document.querySelector("nav");
  const faBars = document.querySelector(".icon");
  const faAngleLeft = document.querySelector(".fa-angles-left");
  const navSpans = document.querySelectorAll("nav span");
  const navUl = document.querySelector(".nav-lists");

  faBars.addEventListener("click", () => {
    navUl.classList.toggle("hello");
    navSpans.forEach((element) => element.classList.toggle("hidden"));
  });
  //#endregion

  //#region Nav select li
  const navList = document.querySelectorAll(".nav-li");
  const boxes = document.querySelectorAll(".box");

  function showBox() {
    let index = localStorage.getItem("index");
    navList[index].classList.add("active");
    boxes[index].classList.add("active");
  }

  navList.forEach((element, index) =>
    element.addEventListener("click", (e) => {
      navList.forEach((element) => element.classList.remove("active"));
      boxes.forEach((element) => element.classList.remove("active"));

      element.classList.add("active");
      boxes[index].classList.add("active");
      localStorage.setItem("index", index);
    })
  );
  showBox();

  //#endregion
});
