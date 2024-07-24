//#region Login
let cart = JSON.parse(localStorage.getItem("cart"));
const username = document.querySelector(".username");
const imgUser = document.getElementById("img-user");

function showIconCustomer() {
  if (!cart) {
    return;
  }
  if (cart.id) {
    username.innerText = dataCustomer.name;
    imgUser.src = dataCustomer.img;
    showIconLogin();
  } else {
    username.innerText = "";
  }
}

function showIconLogin() {
  const iconUser = document.querySelector(".box-img-user");
  const loginUser = document.querySelector(".fa-arrow-right-to-bracket");
  loginUser.classList.toggle("d-none");
  iconUser.classList.toggle("d-none");
}
//#endregion

//#region Logout
const logout = document.querySelector(".logout");
const infoUser = document.querySelector(".info-user");
let isCart = false;
logout.addEventListener("click", (e) => {
  e.stopPropagation();
  let cart = JSON.parse(localStorage.getItem("cart"));
  // Save Cart user
  updateElement(urlCart, cart);

  // remove User local
  localStorage.removeItem("cart");
  // Xóa hiển thị
  cart = null;
  username.innerText = "";
  infoUser.style.display = "none";

  // Đổi icon user > login
  showIconLogin();
  // Xóa Cart
  showCart(dropdownMenu);
});
//#endregion
