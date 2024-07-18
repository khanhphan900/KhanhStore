const imgDefault =
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?ga=GA1.1.1399812610.1719048527&semt=sph";

//#region Register
const homeDelUser = document.getElementById("del-user");

registerForm();
function registerForm() {
  const registerForm = document.getElementById("register");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const email = document.getElementById("email").value;
      const password = document.getElementById("pass-reg").value;
      const prePassword = document.getElementById("pass-reg-check").value;
      let isValid = checkValid(password, prePassword);
      if (!isValid) {
        return;
      }
      let username = email.split("@")[0];
      let user = {
        email: email,
        password: password,
        img: imgDefault,
        position: "member",
        name: username,
        cart: [],
      };

      createElement(urlUser, user);
      window.location.href = "login.html";
    });
  }
}

function checkValid(pass, prePass) {
  const textDanger = document.querySelector(".small");
  if (pass !== prePass) {
    textDanger.innerHTML = "Password no mapping!";
    return false;
  }
  textDanger.innerHTML = "";
  return true;
}

//#endregion

//#region Login
loginForm();
function loginForm() {
  const loginForm = document.getElementById("login");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email-login").value;
      const pass = document.getElementById("pass-login").value;

      // getByEmail(urlUser, email, checkLogin);
      const text = document.querySelector(".small");

      getByEmail(urlUser, email)
        .then((data) => {
          if (data) {
            user = data;
            if (user.password != pass) {
              text.innerText = "Incorrect password";
              return;
            }
            delete user.password;
            text.innerText = "";
            let cart = JSON.parse(localStorage.getItem("cart"));
            if (cart && cart.length) {
              cart.forEach((item) => {
                let isExists = false;
                let index = null;
                user.cart.forEach((itemUser, indexUser) => {
                  if (itemUser.id == item.id) {
                    isExists = true;
                    index = indexUser;
                  }
                });
                isExists ? (user.cart[index].sl += 1) : user.cart.push(item);
              });
            }
            localStorage.removeItem("cart");
            localStorage.setItem("user", JSON.stringify(user));
            if (user.position === "member") {
              window.location.href = "home.html";
            } else {
              window.location.href = "home-admin.html";
            }
          } else {
            console.log("User not found");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }
}

if (homeDelUser) {
  homeDelUser.addEventListener("click", (e) => {
    localStorage.removeItem("user");
    alert("Remove user");
    window.location.href = "register.html";
  });
}

//#endregion
