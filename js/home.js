//#region CarouselAdvert
let advertisementData = [];
let indexCurrentCarousel1 = 0;
let dataProducts = [];

getAll(urlProduct, getData);

function getData(data) {
  dataProducts = data;
  showByInfoCarousel(data);
}
function showData() {
  console.log(dataProducts);
}
getAll(urlAdvertisement, showCarouselAdvert);
//#region QC
function showCarouselAdvert(data) {
  const carousel1Imgs = document.getElementById("carousel-1-imgs");
  const dataCarousel1 = data.splice(0, 6);
  carousel1Imgs.innerHTML = "";
  const divHidden = document.createElement("div");
  divHidden.classList.add("carousel-1-box");

  dataCarousel1.forEach((element) => {
    const img = document.createElement("img");
    img.classList.add("carousel-1-img");
    img.src = element.img;

    const divBox = document.createElement("div");
    divBox.classList.add("carousel-1-item");
    divBox.appendChild(img);

    divHidden.appendChild(divBox);
  });
  carousel1Imgs.appendChild(divHidden);

  moveAutoCarouselAdvert();
}

let moveAuto1;
function moveAutoCarouselAdvert() {
  const carousel1Box = document.getElementsByClassName("carousel-1-box");
  clearInterval(moveAuto1);
  if (carousel1Box) {
    moveAuto1 = setInterval(function () {
      indexCurrentCarousel1 =
        indexCurrentCarousel1 >= 2 ? 0 : indexCurrentCarousel1 + 1;
      addTransform1(indexCurrentCarousel1);
    }, 5000);
  }
}

const carousel1Btn = document.querySelectorAll(".carousel-1-btn");
carousel1Btn.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (this.id === "carousel-1-next") {
      indexCurrentCarousel1 =
        indexCurrentCarousel1 >= 2 ? 0 : indexCurrentCarousel1 + 1;
    } else {
      indexCurrentCarousel1 =
        indexCurrentCarousel1 <= 0 ? 2 : indexCurrentCarousel1 - 1;
    }
    addTransform1(indexCurrentCarousel1);
    moveAutoCarouselAdvert();
  });
});

function addTransform1(index) {
  const carousel1Box = document.querySelector(".carousel-1-box"); //4
  let percent = (-100 / 2) * index;
  carousel1Box.style.transform = `translateX(${percent}%)`;
  carousel1Box.style.transition = "transform 0.5s linear";
}

//#endregion

//#region Carousel
let infoCarousel = [
  {
    type: "mobile",
    index: 1,
    cardInScreen: 4,
    auto: true,
  },
  {
    type: "product",
    index: 1,
    cardInScreen: 4,
    auto: false,
  },
  {
    type: "laptop",
    index: 1,
    cardInScreen: 4,
    auto: true,
  },
];

function showByInfoCarousel(data) {
  infoCarousel.forEach((element) => {
    // Show Item Carousel
    const box = document.querySelector(`.box-${element.type}`);
    if (!box) {
      return;
    }
    box.innerHTML = "";
    let itemData = data;
    if (element.type !== "product") {
      itemData = data.filter((item) => item.type === element.type);
    }
    showProduct(itemData, box);

    // Setup view Mobile / Laptop
    let boxCards = document.querySelectorAll(".carousel .box-card");
    if (window.matchMedia("(min-width: 769px)").matches) {
      // Mobile
      element.cardInScreen = 4;
      boxCards.forEach((boxCard) => {
        boxCard.style.maxWidth = `calc(100% / ${element.cardInScreen})`;
      });
    } else {
      // Laptop and larger devices
      element.cardInScreen = 2;
      boxCards.forEach((boxCard) => {
        boxCard.style.maxWidth = `calc(100% / ${element.cardInScreen})`;
      });
    }

    // Check Run Auto Carousel
    let offset = itemData.length - element.cardInScreen;
    if (element.auto) {
      setInterval(function () {
        element.index = element.index >= offset ? 0 : element.index + 1;
        addTransformCarousel(element, box);
      }, 5000);
    }

    // Click Carousel
    const carouselBtn = document.querySelectorAll(".carousel-btn");
    carouselBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.toString().includes(element.type)) {
          if (btn.classList.toString().includes("right")) {
            element.index = element.index >= offset ? 0 : element.index + 1;
          } else {
            element.index = element.index <= 0 ? offset : element.index - 1;
          }
          addTransformCarousel(element, box);
        }
      });
    });
  });
}

function addTransformCarousel(element, box) {
  let percent = (-100 / element.cardInScreen) * element.index;
  box.style.transform = `translateX(${percent}%)`;
  box.style.transition = "transform 0.5s linear";
}

function showProduct(data, box) {
  data.forEach((element) => {
    let price = parseInt(element.price).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    const card = document.createElement("div");
    card.classList.add("card", "py-2");
    card.onclick = function () {
      localStorage.setItem("product", JSON.stringify(element));
      window.location.href = "product.html";
    };
    card.innerHTML = `
    <img src="${element.img}" class="card-img-top" alt="...">
    <div class="card-body pb-0">
      <div class="card-title text-center">${element.name}</div>
      <div class="card-content">
        <p class="card-text text-center">${price}</p>
        <div class="text-center"><button class="btn btn-primary" data-product='${JSON.stringify(
          element
        )}' onclick='handleProduct(event, this)'>Buy now</button></div>
      </div>
    </div>
    `;
    const div = document.createElement("div");
    div.classList.add("box-card");
    div.appendChild(card);
    box.appendChild(div);
  });
}
//#endregion

//#region Cart
const boxCart = document.querySelector(".box-cart");
const dropdownMenu = document.querySelector(".dropdown-menu");
const modalCart = document.querySelector(".modal-cart");

showCart(dropdownMenu);

function showCart(box) {
  box.innerHTML = "";

  let cart = JSON.parse(localStorage.getItem("cart"));
  let user = JSON.parse(localStorage.getItem("user"));
  let total = 0;
  const cartText = document.querySelector(".cart-text");
  let totalPrice = 0;
  if (!cart && !user) {
    cartText.style.display = "none";
    return;
  }
  if (user) {
    cart = user.cart;
  }

  cartText.style.display = "block";
  box.style.paddingTop = "10px";
  cart.forEach((product) => {
    total += product.sl;
    totalPrice += product.price * product.sl;

    const li = document.createElement("li");
    li.classList.add("row");
    li.innerHTML = `
    <div class="col-3 d-flex align-items-center justify-content-center">
      <img src="${product.img}" alt="">
    </div>
    <div class="col-7 p-0">
      <div class="d-inline">${product.name}</div>
      <div class="text-danger h6 m-0">${exchangeMoney(product.price)}</div>
      <div class="">Số lượng: ${product.sl}</div>
    </div>
    <div class="col-2 d-flex align-items-center justify-content-center">
      <div>
        <i class="fa-solid fa-circle-plus text-success" data-id=${
          product.id
        } onclick="handlePlus(event, this)"></i>
        <i class="fa-solid fa-circle-minus text-danger" data-id=${
          product.id
        } onclick="handleMinus(event, this)"></i>
      </div>
    </div>
    `;
    box.appendChild(li);
  });

  const li = document.createElement("li");
  li.classList.add("d-flex", "justify-content-between", "align-items-center");
  if (!cart.length) {
    li.innerHTML = `
    <div class="text-danger text-center">Chưa có sản phẩm trong giỏ!</div>
  `;
    box.appendChild(li);
    return;
  }
  li.innerHTML = `
    <div class="text-black">Tống số tiền: </div>
    <div class="text-danger">${exchangeMoney(totalPrice)}</div>
  `;
  box.appendChild(li);
  cartText.innerText = total ? total : "";
}

function handleModalCart() {
  showCart(modalCart);
}
function handleProduct(event, button) {
  event.stopPropagation();
  const product = JSON.parse(button.getAttribute("data-product"));
  product.sl = 1;
  let cart = JSON.parse(localStorage.getItem("cart"));
  let user = JSON.parse(localStorage.getItem("user"));
  if (!cart && !user) {
    cart = [];
  }
  if (user) {
    cart = user.cart;
  }
  console.log(cart);
  let flag = true;
  cart.forEach((productCart) => {
    if (productCart.id == product.id) {
      productCart.sl += 1;
      flag = false;
    }
  });
  if (flag) {
    cart.push(product);
  }
  if (user) {
    user.cart = cart;
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  showCart(dropdownMenu);
}
function handlePlus(event, plus) {
  event.stopPropagation();
  let chooseNumber = 1;
  setupProduct(chooseNumber, plus);
}
function handleMinus(event, plus) {
  event.stopPropagation();
  let chooseNumber = -1;
  setupProduct(chooseNumber, plus);
}
function setupProduct(number, plus) {
  const productId = JSON.parse(plus.getAttribute("data-id"));
  let cart = JSON.parse(localStorage.getItem("cart"));
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    cart = user.cart;
  }
  cart.forEach((productCart) => {
    if (productCart.id == productId) {
      productCart.sl += number;
    }
  });
  cart = cart.filter((product) => product.sl != 0);

  if (!cart.length) {
    if (user) {
      user.cart = [];
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("cart");
    }
  } else {
    if (user) {
      user.cart = cart;
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  showCart(dropdownMenu);
  showCart(modalCart);
}
function exchangeMoney(money) {
  let price = parseInt(money).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return price;
}

function handleSubmitModal() {
  localStorage.removeItem("cart");
  alert("Thanh toán thành công");
  showCart(modalCart);
  showCart(dropdownMenu);
}
//#endregion

//#region InfoUser

// login

let user = JSON.parse(localStorage.getItem("user"));
const username = document.querySelector(".username");
const imgUser = document.getElementById("img-user");
if (user) {
  username.innerText = user.name;
  imgUser.src = user.img;
  showIconLogin();
} else {
  username.innerText = "";
}

function showIconLogin() {
  const iconUser = document.querySelector(".box-img-user");
  const loginUser = document.querySelector(".fa-arrow-right-to-bracket");
  loginUser.classList.toggle("d-none");
  iconUser.classList.toggle("d-none");
}

// logout
const logout = document.querySelector(".logout");
const infoUser = document.querySelector(".info-user");
logout.addEventListener("click", (e) => {
  e.stopPropagation();
  let userLocal = JSON.parse(localStorage.getItem("user"));
  // Save Cart user
  getByEmail(urlUser, userLocal.email)
    .then((data) => {
      if (data) {
        data.cart = userLocal.cart;
        updateElement(urlUser, data);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // remove User local
  localStorage.removeItem("user");
  // Xóa hiển thị
  user = null;
  username.innerText = "";
  infoUser.style.display = "none";

  // Đổi icon user > login
  showIconLogin();
  // Xóa Cart
  showCart(dropdownMenu);
});
//#endregion
