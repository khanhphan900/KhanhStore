document.addEventListener("DOMContentLoaded", function () {
  //#region Movement bar

  const nav = document.querySelector("nav");
  const faBars = document.querySelector(".icon");
  const faAngleLeft = document.querySelector(".fa-angles-left");
  const navSpans = document.querySelectorAll("nav span");
  const navUl = document.querySelector(".nav-lists");

  faBars.addEventListener("click", () => {
    navUl.classList.toggle("nav-lists");
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


   navList.forEach((element,index) => element.addEventListener("click", (e) => {
          navList.forEach(element => element.classList.remove("active"));
          boxes.forEach(element => element.classList.remove("active"));

          element.classList.add("active");
          boxes[index].classList.add("active");
          localStorage.setItem("index",index);
   }))
   showBox();

  //#endregion

  //#region Out web admin
  const iconOutWeb = document.getElementById("out-web");
  iconOutWeb.addEventListener("click", () => {
    window.location.href = "login.html";
  });
  //#endregion
});

function showMessage(status, message) {
  const boxMessage = document.getElementById("box-message");
  switch (status) {
    case "success":
      boxMessage.classList.add("success");
      break;
    case "danger":
      boxMessage.classList.add("danger");
      break;
  }
  boxMessage.innerHTML = message;
  boxMessage.classList.add("active");
}
