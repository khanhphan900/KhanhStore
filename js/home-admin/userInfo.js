//#region show Icon

const username = document.querySelector(".username");
function showIconUser() {
  let user = dataUserAdmin;
  const imgUser = document.getElementById("img-user");
  if (user) {
    username.innerText = user.name;
    imgUser.src = user.img;
  } else {
    username.innerText = "";
  }
}

//#region logout
const logout = document.querySelector(".logout");
const infoUser = document.querySelector(".info-user");
logout.addEventListener("click", (e) => {
  e.stopPropagation();
  let cartLocal = JSON.parse(localStorage.getItem("cart"));
  // Save Cart user
  updateElement(urlCart, cartLocal);
  console.log("1");
  // remove User local
  localStorage.removeItem("cart");
  // Xóa hiển thị
  username.innerText = "";
  infoUser.style.display = "none";
  
  window.location.href = "login.html";
});
