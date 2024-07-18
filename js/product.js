console.log(localStorage.getItem("product"));
let product = JSON.parse(localStorage.getItem("product"));

const typeProduct = document.getElementById("type-product");
const categoryProduct = document.getElementById("category-product");
const imgProduct = document.getElementById("img-product");
const nameProduct = document.getElementById("name-product");
const priceProduct = document.getElementById("price-product");

typeProduct.innerHTML = product.type;
categoryProduct.innerHTML = product.category;
imgProduct.src = product.img;
nameProduct.innerText = product.name;

let price = parseInt(product.price).toLocaleString("it-IT", {
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
