//#region CarouselAdvert
let dataProducts = [];
let dataCustomer = {};
let jsonCart = JSON.parse(localStorage.getItem("cart"));
let idCustomer = jsonCart ? (jsonCart.id ? jsonCart.id : null) : null;
getAll(urlProduct, getAllProducts);

function getAllProducts(data) {
  dataProducts = data;
  showCart(dropdownMenu);
  showCart(modalCart);
}

if (idCustomer) {
  getElementById(urlCustomer, idCustomer, getDataCustomer);
}

function getDataCustomer(data) {
  dataCustomer = data;
  showIconCustomer();
}

let dataProductLocal = JSON.parse(localStorage.getItem("product"));

const typeProduct = document.getElementById("type-product");
const categoryProduct = document.getElementById("category-product");
const imgProduct = document.getElementById("img-product");
const nameProduct = document.getElementById("name-product");
const priceProduct = document.getElementById("price-product");

typeProduct.innerHTML = dataProductLocal.type;
categoryProduct.innerHTML = dataProductLocal.category;
imgProduct.src = dataProductLocal.img;
nameProduct.innerText = dataProductLocal.name;

let price = parseInt(dataProductLocal.price).toLocaleString("it-IT", {
  style: "currency",
  currency: "VND",
});
priceProduct.innerText = price;
countdown();
function countdown() {
  const hour = document.getElementById("hour");
  const minute = document.getElementById("minute");
  const second = document.getElementById("second");

  setInterval(() => {
    let date = new Date();
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    seconds = 60 - seconds;
    minutes = 60 - minutes;
    hours = 24 - hours;
    second.innerHTML = seconds < 10 ? "0" + seconds : seconds;
    minute.innerHTML = minutes < 10 ? "0" + minutes : minutes;
    hour.innerHTML = hours < 10 ? "0" + hours : hours;
  }, 1000);
}

//#region Add Cart
function handleAddCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));  
  if (!cart) {
    cart = {
      id: null,
      listProduct: [],
    };
  }
  let isExists = false;
  cart.listProduct.forEach((productCart) => {
    if (productCart.id == dataProductLocal.id) {
      productCart.quantity += 1;
      isExists = true;
    }
  });
  if (!isExists) {
    cart.listProduct.push({ id: dataProductLocal.id, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  showCart(dropdownMenu);
}