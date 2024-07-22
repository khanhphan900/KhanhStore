//#region InfoUser

// login

function showIconUser() {
  let user = dataUserAdmin;
  const username = document.querySelector(".username");
  const imgUser = document.getElementById("img-user");
  if (user) {
    username.innerText = user.name;
    imgUser.src = user.img;
  } else {
    username.innerText = "";
  }
}

// logout
const logout = document.querySelector(".logout");
const infoUser = document.querySelector(".info-user");
logout.addEventListener("click", (e) => {
  e.stopPropagation();
  let cartLocal = JSON.parse(localStorage.getItem("cart"));
  // Save Cart user
  updateElement(urlCart, cartLocal);

  // remove User local
  localStorage.removeItem("cart");
  // Xóa hiển thị
  username.innerText = "";
  infoUser.style.display = "none";

  // Đổi icon user > login
  showIconLogin();
  // Xóa Cart
  showCart(dropdownMenu);

  // remove User local
  localStorage.removeItem("cart");
  window.location.href = "login.html";
});
//#endregion
