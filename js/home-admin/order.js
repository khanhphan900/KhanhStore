let typeOrderData = "Order";
let numberOrderShow = 8;
let payOrders = [
  {
    status: 1,
    icon: "fa-check",
    text: "Đã thanh toán",
    color: "text-success",
  },
  {
    status: 0,
    icon: "fa-xmark",
    text: "Chưa thanh toán",
    color: "text-danger",
  },
];
let logisticOrders = [
  { name: "Chờ duyệt", color: "text-danger" },
  { name: "Shipper", color: "text-warning" },
  { name: "Nhận hàng", color: "text-success" },
];

//#region  SHOW
function showOrders() {
  data = dataOrders;
  console.log(dataOrders);
  let dataProductsTemplate = dataProducts;
  // Sort Date
  data = sortOrderDate(data);

  // Show total Chờ duyệt
  showNumberBell(data);

  // SEARCH by searchName
  data = getDataSearch(data, dataSearch.order.text);
  let dataCurrentPage = data;
  //   GET data current page
  dataCurrentPage = getDataCurrentPage(
    typeOrderData,
    data,
    numberOrderShow,
    currentPage
  );

  const tbodyCategory = document.getElementById("tbody-order");
  tbodyCategory.innerHTML = "";
  const paginationOrder = document.getElementById("pagination-order");
  const pageTabCurrent = paginationOrder.querySelector(".active");

  // Order
  dataCurrentPage.forEach((order, index) => {
    const tr = document.createElement("tr");
    let totalProduct = 0;
    let totalPrice = 0;
    let customerOrder = {};

    // Find Customer in Order
    dataCustomers.forEach((customer) => {
      if (parseInt(customer.id) == parseInt(order.idCustomer)) {
        customerOrder = customer;
        return;
      }
    });

    // Find Total Product in Order
    order.listProduct.forEach((productOrder) => {
      totalProduct += productOrder.quantity;

      dataProductsTemplate.forEach((p) => {
        if (p.id == productOrder.id) {
          totalPrice += productOrder.quantity * p.price;
          return;
        }
      });
    });

    let pageCurrent = pageTabCurrent ? pageTabCurrent.textContent : 1;
    let stt = (pageCurrent - 1) * numberOrderShow + index + 1;
    tr.innerHTML = `
            <th scope="row">${stt}</th>
            <td>${customerOrder.name}</td>
            <td class="tooltip-product-name">
            <div  class="substring-text" style="max-width: 150px">${
              customerOrder.address
            }</div>
            <div class="tooltip-full-name">${customerOrder.address}</div>
            </td>
            <td>${customerOrder.phone}</td>
            <td>${order.date}</td>
            <td>${changeFormatMoney(totalPrice)}</td>
            <td class="${
              order.logistic.includes("Shipper")
                ? "text-warning"
                : order.logistic.includes("Nhận")
                ? "text-success"
                : "text-danger"
            } h6">${order.logistic}</td> 
            <td class="${
              order.pay ? "text-success" : "text-danger"
            } h6"><i class="fa-solid ${
      order.pay ? "fa-check" : "fa-xmark"
    }"></i></td> 
            <td><i class="fa-solid fa-circle-info h5 m-0 icon-detail"  data-bs-toggle="modal" data-bs-target="#orderModal"
            onclick="handleIdOrder(event, ${order.id})"
            ></i></td> 
        `;
    tbodyCategory.appendChild(tr);
  });
}

function showNumberBell(data) {
  const textBell = document.querySelector(".text-bell");
  let numberBell = 0;
  textBell.classList.add("d-none");
  data.forEach((order) => {
    if (order.logistic == "Chờ duyệt") {
      numberBell += 1;
    }
  });

  if (numberBell) {
    textBell.classList.remove("d-none");
    textBell.innerHTML = numberBell;
  }
}

function searchData(data, searchName) {
  if (!searchName) {
    return data;
  }
  return data.filter((element) =>
    element.name.toLowerCase().includes(searchName.toLowerCase())
  );
}

function changeFormatMoney(price) {
  return parseInt(price).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

function sortOrderDate(data) {
  return data.sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

function parseDate(dateString) {
  let [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
}

//#region Modal
function handleIdOrder(event, idOrder) {
  event.stopPropagation();
  showModalOrder(idOrder);
}
let dataOrder;
function showModalOrder(idOrder) {
  const tbodyListProduct = document.querySelector(".list-product-order");
  tbodyListProduct.innerHTML = "";
  let totalProduct = 0;
  let totalPrice = 0;
  let dataProductsTemplate = dataProducts;
  // Get Order by idOrder
  dataOrder = dataOrders.find((element) => element.id == idOrder);

  // Get Customer by dataOrder.idCustomer
  const dataCustomerOrder = dataCustomers.find(
    (element) => element.id == dataOrder.idCustomer
  );
  // Get list Product Order
  const listProductOrder = [];
  dataOrder.listProduct.forEach((productOrder) => {
    let infoProduct = dataProductsTemplate.find(
      (product) => product.id == productOrder.id
    );
    let clonedProduct = Object.assign({}, infoProduct);
    clonedProduct.quantity = productOrder.quantity;
    listProductOrder.push(clonedProduct);
  });
  let dataOrderNew = dataOrder;
  dataOrderNew.listProduct = listProductOrder;

  // Show Product
  dataOrderNew.listProduct.forEach((product) => {
    totalProduct += product.quantity;
    totalPrice += product.price * product.quantity;

    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>
      <img src="${product.img}" alt="">
    </td>
    <td>
      <div class="d-inline">${product.name}</div>
      <div class="text-danger h6 m-0">${changeFormatMoney(product.price)}</div>
    </td>
    <td>
      <div class="h-100 d-flex justify-content-center align-items-center">${
        product.quantity
      }<span>
    </div>
    `;
    tbodyListProduct.appendChild(tr);
  });

  // Show Customer
  const nameOrder = document.getElementById("name-order");
  const phoneOrder = document.getElementById("phone-order");
  const addressOrder = document.getElementById("address-order");
  const totalOrder = document.getElementById("total-order");
  const totalPriceOrder = document.getElementById("total-price-order");

  nameOrder.innerHTML = dataCustomerOrder.name;
  phoneOrder.innerHTML = dataCustomerOrder.phone;
  addressOrder.innerHTML = dataCustomerOrder.address;
  totalOrder.innerHTML = totalProduct;
  totalPriceOrder.innerHTML = changeFormatMoney(totalPrice);

  logisticOrder.innerHTML = "";
  logisticOrder.className = "form-control";
  logisticOrders.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.name;
    option.innerHTML = element.name;
    option.classList.add(element.color);
    if (element.name === dataOrder.logistic) {
      option.selected = true;
      logisticOrder.classList.add(element.color);
    }
    logisticOrder.appendChild(option);
  });

  payOrder.innerHTML = "";
  payOrder.className = "form-control";
  payOrders.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.status;
    option.innerHTML = element.text;
    option.classList.add(element.color);
    if (element.status === dataOrder.pay) {
      option.selected = true;
      payOrder.classList.add(element.color);
    }
    payOrder.appendChild(option);
  });
}

const payOrder = document.getElementById("pay-order");
payOrder.addEventListener("change", () => {
  payOrder.className = "form-control";
  payOrders.forEach((element) => {
    if (element.status == payOrder.value) {
      payOrder.classList.add(element.color);
    }
  });
});

const logisticOrder = document.getElementById("logistic-order");
logisticOrder.addEventListener("change", () => {
  logisticOrder.className = "form-control";
  logisticOrders.forEach((element) => {
    if (element.name === logisticOrder.value) {
      logisticOrder.classList.add(element.color);
    }
  });
});

//#region Submit
const btnSubmitOrder = document.getElementById("btn-submit-order");
btnSubmitOrder.addEventListener("click", () => {
  console.log(dataProducts);
  if (!checkLogisticOrder(logisticOrder.value, payOrder.value)) {
    alert("Vui lòng không hack trang web này");
    return;
  }
  let dataOrderUpdate = {
    id: dataOrder.id,
    listProduct: [],
    idCustomer: dataOrder.idCustomer,
    date: dataOrder.date,
    logistic: logisticOrder.value,
    pay: parseInt(payOrder.value),
  };
  dataOrder.listProduct.forEach((element) => {
    let product = {
      id: element.id.toString(),
      quantity: element.quantity,
    };
    dataOrderUpdate.listProduct.push(product);
  });
  if (dataOrderUpdate.logistic == "Shipper") {
    updateProductOrder(-1);
  }
  if (dataOrderUpdate.logistic == "Chờ duyệt") {
    updateProductOrder(1);
  }

  // Update order
  updateElement(urlOrder, dataOrderUpdate);
});
function checkLogisticOrder(valueLogisticOrder, valuePayOrder) {
  logisticOrders.forEach((element) => {
    if (element.name !== valueLogisticOrder) {
      return false;
    }
  });
  payOrders.forEach((element) => {
    if (element.status !== valuePayOrder) {
      return false;
    }
  });
  return true;
}

function updateProductOrder(numberOrder) {
  let dataProductsTemplate = dataProducts;
  dataOrder.listProduct.forEach((productOrder) => {
    dataProductsTemplate.forEach((product) => {
      if (product.id == productOrder.id) {
        product.quantity += productOrder.quantity * numberOrder;
        updateElement(urlProduct, product);
        return;
      }
    });
  });
}
