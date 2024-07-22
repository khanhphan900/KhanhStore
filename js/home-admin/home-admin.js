let dataCategories = [];
let dataProducts = [];
let dataCustomers = [];
let dataOrders = [];
let dataUserAdmin = {};
let jsonCart = JSON.parse(localStorage.getItem("cart"));
let idUser = jsonCart ? (jsonCart.id ? jsonCart.id : null) : null;

getAllData();

async function getAllData() {
  try {
    await Promise.all([
      getAll(urlCategory, getDataCategory),
      getAll(urlProduct, getDataProduct),
      getAll(urlCustomer, getDataCustomer),
      getAll(urlOrder, getDataOrder),
      getElementById(urlCustomer, idUser, getDataUser),
    ]);

    // Gọi các hàm xử lý dữ liệu sau khi đã lấy dữ liệu
    processData();
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

function processData() {
  showIconUser();
  showCategories();
  showProducts();
  showOrders();
}

function getDataCategory(data) {
  dataCategories = data;
}
function getDataProduct(data) {
  dataProducts = data;
}
function getDataCustomer(data) {
  dataCustomers = data;
}
function getDataOrder(data) {
  dataOrders = data;
}
function getDataUser(data) {
  dataUserAdmin = data;
}

function showMessage(status, message) {
  const boxMessage = document.getElementById("box-message");
  switch (status) {
    case "success":
      boxMessage.classList.add("success");
      break;
    case "danger":
      boxMessage.classList.add("danger");
      break;
  }
  boxMessage.innerHTML = message;
  boxMessage.classList.add("active");
}
