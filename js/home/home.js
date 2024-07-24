//#region CarouselAdvert
let dataProducts = [];
let dataCustomers = [];
let dataAdverts = [];
let dataOrders = [];
let dataCustomer = {};
let jsonCart = JSON.parse(localStorage.getItem("cart"));
let idCustomer = jsonCart ? (jsonCart.id ? jsonCart.id : 0) : 0;
getAllData();
async function getAllData() {
  try {
    await Promise.all([
      getElementById(urlCustomer, idCustomer, getDataCustomer),
      getAll(urlProduct, getAllDataProduct),
      getAll(urlAdvertisement, getAllDataAdvert),
      getAll(urlOrder, getAllDataOrder),
    ]);
    processData();
  } catch (error) {
    console.log(error);
  }
}
function processData() {
  showIconCustomer();
  showCarouselAdvert();
  showByInfoCarousel();
  showCart(dropdownMenu);
  showCart(modalCart);
}
function getDataCustomer(data) {
  dataCustomer = data;
}

function getAllDataProduct(data) {
  dataProducts = data;
}

function getAllDataAdvert(data) {
  dataAdverts = data;
}

function getAllDataOrder(data) {
  dataOrders = data;
}
