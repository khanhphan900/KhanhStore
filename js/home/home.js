//#region CarouselAdvert
let dataProducts = [];
let dataCustomer = {};
let jsonCart = JSON.parse(localStorage.getItem("cart"));
let idCustomer = jsonCart ? (jsonCart.id ? jsonCart.id : null) : null;
getAll(urlProduct, getAllProducts);

function getAllProducts(data) {
  dataProducts = data;
  showByInfoCarousel(data);
  showCart(dropdownMenu);
  showCart(modalCart);
}

if (idCustomer) {
  getElementById(urlCustomer, idCustomer, getDataCustomer);
}

function getDataCustomer(data) {
  dataCustomer = data;
  console.log(dataCustomer);
  showIconCustomer();
}

getAll(urlAdvertisement, showCarouselAdvert);


