//#region Cart
const boxCart = document.querySelector(".box-cart");
const dropdownMenu = document.querySelector(".dropdown-menu");
const modalCart = document.querySelector(".modal-cart");

function showCart(box) {
  let modalListProduct = box.querySelector(".modal-list-product");
  let showTotalPrice = box.querySelector(".show-total-product");
  modalListProduct.innerHTML = "";

  let cart = JSON.parse(localStorage.getItem("cart"));
  let total = 0;
  let totalPrice = 0;

  const cartText = document.querySelector(".cart-text");
  if (!cart) {
    cartText.style.display = "none";
    return;
  }
  cartText.style.display = "block";
  const noProduct = box.querySelector(".no-product");

  if (!cart.listProduct.length) {
    noProduct.classList.remove("d-none");
    showTotalPrice.classList.add("d-none");
    return;
  } else {
    noProduct.classList.add("d-none");
    showTotalPrice.classList.remove("d-none");
  }

  cart.listProduct.forEach((product) => {
    dataProducts.forEach((element) => {
      if (parseInt(product.id) === parseInt(element.id)) {
        element.quantity = product.quantity;
        product = element;
        return;
      }
    });
    total += product.quantity;
    totalPrice += product.price * product.quantity;

    const li = document.createElement("li");
    li.classList.add("row");
    li.innerHTML = `
    <div class="col-3 px-4 d-flex align-items-center justify-content-center">
      <img src="${product.img}" alt="">
    </div>
    <div class="col-7 p-0">
      <div class="d-inline">${product.name}</div>
      <div class="text-danger h6 m-0">${exchangeMoney(product.price)}</div>
      <div class="">Số lượng: ${product.quantity}</div>
    </div>
    <div class="col-2 p-0 d-flex align-items-center justify-content-start">
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
    modalListProduct.appendChild(li);
  });
  const textTotalPrice = box.querySelector(".total-price");
  textTotalPrice.innerHTML = exchangeMoney(totalPrice);
  cartText.innerText = total ? total : "";
  if (box.classList.toString() == "modal-cart") {
    setupInfoCustomer(totalPrice);
  }
}

function setupInfoCustomer(totalPrice) {
  const nameCustomer = document.getElementById("name-customer");
  const phoneCustomer = document.getElementById("phone-customer");
  const addressCustomer = document.getElementById("address-customer");
  const voucher = document.getElementById("voucher");
  const voucherType = document.getElementById("voucher-type");
  let discount = 0;
  const logistic = document.getElementById("logistic");
  const transport = document.getElementById("transport-fee");
  let transportFee = 50000;
  const textTotalPrice = document.getElementById("total-pay");
  const pay = document.getElementById("pay");
  // voucher.addEventListener("")

  nameCustomer.value = dataCustomer.name;
  phoneCustomer.value = dataCustomer.phone ? dataCustomer.phone : "";
  addressCustomer.value = dataCustomer.address ? dataCustomer.address : "";
  textTotalPrice.innerHTML = exchangeMoney(totalPrice);
  voucherType.innerHTML = "0 VND";
  transport.innerHTML = "+ 50.000 VND";
  pay.innerHTML = exchangeMoney(totalPrice - discount + transportFee);
  voucher.addEventListener("change", function (e) {
    e.stopPropagation();
    if (this.value == "999") {
      voucherType.innerHTML = "- 100.000 VND";
      discount = 100000;
    } else {
      voucherType.innerHTML = "0 VND";
      discount = 0;
    }
    pay.innerHTML = exchangeMoney(totalPrice - discount - transportFee);
  });
  logistic.addEventListener("change", function (e) {
    e.stopPropagation();
    if (this.value == 0) {
      transport.innerHTML = "+ 50.000 VND";
      transportFee = 50000;
    } else {
      transport.innerHTML = "+ 30.000 VND";
      transportFee = 30000;
    }
    console.log(discount);
    console.log(transportFee);
    pay.innerHTML = exchangeMoney(totalPrice - discount + transportFee);
  });
}

function handleModalCart() {
  showCart(modalCart);
}
function handleProduct(event, productId) {
  event.stopPropagation();

  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    cart = {
      id: null,
      listProduct: [],
    };
  }

  let isExists = false;
  cart.listProduct.forEach((product) => {
    if (product.id == productId) {
      product.quantity += 1;
      isExists = true;
    }
  });
  if (!isExists) {
    cart.listProduct.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

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
  cart.listProduct.forEach((productCart) => {
    if (productCart.id == productId) {
      productCart.quantity += number;
    }
  });
  cart.listProduct = cart.listProduct.filter(
    (product) => product.quantity != 0
  );
  localStorage.setItem("cart", JSON.stringify(cart));

  showCart(modalCart);
  showCart(dropdownMenu);
}
function exchangeMoney(money) {
  let price = parseInt(money).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return price;
}
//#endregion
