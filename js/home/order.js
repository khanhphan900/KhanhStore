//#region PAY

const nameCustomer = document.getElementById("name-customer");
const phoneCustomer = document.getElementById("phone-customer");
const addressCustomer = document.getElementById("address-customer");

function handleSubmitModal() {
  // Input Name / Phone / address
  if (!isValid()) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }
  getAll(urlOrder, submitCart);
}

function submitCart(data) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  // Save info customer
  dataCustomer.name = nameCustomer.value;
  dataCustomer.address = addressCustomer.value;
  dataCustomer.phone = phoneCustomer.value;
  
  updateElement(urlCustomer, dataCustomer);
  
  // Create Order
  let order = {};
  order.id = (data.length + 1).toString();
  order.idCustomer = cart.id;
  order.listProduct = cart.listProduct;
  order.date = getCurrentDate();
  order.logistic = "Chờ duyệt";
  order.pay = false;
  
  createElement(urlOrder, order);

  // Update cart customer
  cart.listProduct = [];
  updateElement(urlCart, cart);

  // Save cart and show
  localStorage.setItem("cart", JSON.stringify(cart));

  showCart(modalCart);
  showCart(dropdownMenu);
}
function isValid() {
  let isValid = true;
  if (nameCustomer.value == "") {
    nameCustomer.style.background = "#E5BCBC";
    isValid = false;
  }
  if (phoneCustomer.value == "") {
    phoneCustomer.style.background = "#E5BCBC";
    isValid = false;
  }
  if (addressCustomer.value == "") {
    addressCustomer.style.background = "#E5BCBC";
    isValid = false;
  }
  return isValid;
}

function getCurrentDate() {
  const today = new Date();

  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  const formattedDate = day + "/" + month + "/" + year;

  return formattedDate;
}

//#endregion
