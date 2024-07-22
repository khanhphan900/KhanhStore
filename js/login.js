const imgDefault =
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?ga=GA1.1.1399812610.1719048527&semt=sph";

//#region Register
const homeDelUser = document.getElementById("del-user");
let dataUser = null;

getAll(urlCustomer, getDataUser);
function getDataUser(data) {
  dataUser = data;
  registerForm();
}

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
        id: (dataUser.length + 1).toString(),
        email: email,
        password: password,
        img: imgDefault,
        role: "member",
        name: username,
      };
      let cart = {
        id: user.id,
        listProduct: [],
      };
      createElement(urlCustomer, user);
      createElement(urlCart, cart);
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
let customer = null;
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

      getByEmail(urlCustomer, email)
        .then((data) => {
          if (data) {
            user = data;
            if (user.password != pass) {
              text.innerText = "Incorrect password";
              return;
            }

            text.innerText = "";
            // Save customer
            delete user.password;
            customer = user;
            getAll(urlCart, setupCart);
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

function setupCart(data) {
  let cartLocal = JSON.parse(localStorage.getItem("cart"));
  let cartUser = null;
  data.forEach((cart) => {
    if (parseInt(cart.id) == parseInt(user.id)) {
      cartUser = cart;
    }
  });
  if (!cartUser) {
    cartUser = {
      id: user.id,
      listProduct: [],
    };
  }
  if (cartLocal) {
    cartLocal.listProduct.forEach((productLocal) => {
      let isExists = false;
      let index = null;
      if (cartUser.listProduct.length)
        cartUser.listProduct.forEach((product, indexP) => {
          if (parseInt(product.id) == parseInt(productLocal.id)) {
            isExists = true;
            index = indexP;
            return;
          }
        });
      isExists
        ? (cartUser.listProduct[index].quantity += 1)
        : cartUser.listProduct.push(productLocal);
    });
  }
  // Save local
  localStorage.setItem("cart", JSON.stringify(cartUser));
  // Chuyển trang
  if (user.role === "member") {
    window.location.href = "home.html";
  } else {
    window.location.href = "home-admin.html";
  }
}
if (homeDelUser) {
  homeDelUser.addEventListener("click", (e) => {
    localStorage.removeItem("user");
    alert("Remove user");
    window.location.href = "register.html";
  });
}
