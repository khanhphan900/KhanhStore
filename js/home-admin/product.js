const numberProductShow = 5;
let typeProductData = "Product";
let maxLengthText = 20;

//#region SHOW ALL

function showProducts() {
  let data = dataProducts;
  // GET data status TRUE
  data = data.filter((element) => element.status === true);

  // SEARCH by searchName
  data = getDataSearch(data, dataSearch.product.text);

  // GET data current page
  let dataCurrentPage = getDataCurrentPage(
    typeProductData,
    data,
    numberProductShow,
    currentPage
  );

  const tbodyProduct = document.getElementById("tbody-product");
  tbodyProduct.innerHTML = "";
  const paginationOrder = document.getElementById("pagination-product");
  const pageTabCurrent = paginationOrder.querySelector(".active");

  dataCurrentPage.forEach((item, index) => {
    let price = parseInt(item.price).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    const tr = document.createElement("tr");
    let pageCurrent = pageTabCurrent ? pageTabCurrent.textContent : 1;
    let stt = (pageCurrent - 1) * numberProductShow + index + 1;

    tr.innerHTML = `
          <th scope="row">${stt}</th>
          <td><div class="td-img"><img src="${item.img}" alt=""></div></td>
          <td class="tooltip-product-name">
            <div class="substring-text">${item.name}</div>
            <div class="tooltip-full-name">${item.name}</div>
          </td>
          <td>${item.quantity}</td>
          <td>${price}</td>
          <td>${item.category}</td>
          <td>
            <i class="fa-solid fa-pen-to-square text-warning h4" data-bs-toggle="modal" data-bs-target="#productAddModal" 
              onclick=handleIdProduct('${item.id}')></i>
            <i class="fa-solid fa-trash text-danger h4" data-bs-toggle="modal" data-bs-target="#deleteProduct" 
              onclick=handleIdDelProduct('${item.id}')></i>
          </td> 
      `;
    tbodyProduct.appendChild(tr);
  });
}

//#region Show Form
function handleIdProduct(id) {
  let dataProduct = null;
  if (id) {
    dataProduct = dataProducts.find(
      (item) => item.id.toString() === id.toString()
    );
  }
  showFormProduct(dataProduct);
}

function showFormProduct(element = null) {
  const titleForm = document.getElementById("productAddModalLabel");
  const idProduct = document.getElementById("id-product");
  const logoProduct = document.getElementById("logo-product");
  const imgProduct = document.getElementById("img-product");
  const inputFileProduct = document.getElementById("input-file-product");
  const nameProduct = document.getElementById("name-product");
  const quantityProduct = document.getElementById("quantity-product");
  const priceProduct = document.getElementById("price-product");
  const typeProduct = document.getElementById("type-product");
  const btnSubmit = document.getElementById("btn-submit-product");

  if (!element) {
    clearFormProduct();
    titleForm.innerHTML = "ADD NEW PRODUCT";
    logoProduct.style.display = "block";
    imgProduct.src = linkImgDefault;
    addRequired(inputFileProduct, true);
    setupSelectCategory(element, dataCategories);
    btnSubmit.innerText = "Save";
  } else {
    idProduct.value = element.id;
    titleForm.innerHTML = "EDIT PRODUCT";
    imgProduct.src = element.img;
    addRequired(inputFileProduct, false);
    nameProduct.value = element.name;
    quantityProduct.value = element.quantity;
    priceProduct.value = element.price;
    typeProduct.value = element.type;
    setupSelectCategory(element, dataCategories);
    addRequired(inputFileProduct, false);
    btnSubmit.innerText = "Update";
  }
}

function setupSelectCategory(element = null) {
  if (element) {
    element = element.status ? element : null;
  }
  const selectCategoryProduct = document.getElementById(
    "select-category-product"
  );
  selectCategoryProduct.innerHTML = "";
  // Option first
  const optionCreate = document.createElement("option");
  optionCreate.value = "";
  optionCreate.text = "Select type category";
  selectCategoryProduct.appendChild(optionCreate);
  if (!element) {
    optionCreate.selected = true;
    optionCreate.disabled = true;
  }

  // Option then
  dataCategories.map((category) => {
    const option = document.createElement("option");
    option.value = category.name;
    option.text = category.name;
    option.selected = element ? element.category == category.name : false;
    selectCategoryProduct.appendChild(option);
  });
}

function clearFormProduct() {
  const idProduct = document.getElementById("id-product");
  const nameProduct = document.getElementById("name-product");
  const quantityProduct = document.getElementById("quantity-product");
  const priceProduct = document.getElementById("price-product");
  const typeProduct = document.getElementById("type-product");

  idProduct.value = "";
  nameProduct.value = "";
  quantityProduct.value = "";
  priceProduct.value = "";
  typeProduct.value = "";
}
//#region ADD
function addProduct() {
  const formProduct = document.getElementById("form-product");
  formProduct.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Check validated
    if (!this.checkValidity()) {
      console.log("Lỗi validated");
      return;
    }

    const idProduct = document.getElementById("id-product").value;
    const imgProduct = document.getElementById("img-product").src;
    const productName = document.getElementById("name-product").value;
    const productQuantity = document.getElementById("quantity-product").value;
    const productPrice = document.getElementById("price-product").value;
    const productType = document.getElementById("type-product").value;

    const productCategory = document.getElementById(
      "select-category-product"
    ).value;
    console.log(productPrice);

    // Save img firebase
    let imgUrl = await uploadImage("product");
    imgUrl = imgUrl ? imgUrl : imgProduct;

    const productElement = {
      id: idProduct,
      name: productName,
      img: imgUrl,
      quantity: productQuantity,
      price: productPrice,
      type: productType,
      category: productCategory,
      status: true,
    };

    // Create or Update
    if (!productElement.id) {
      productElement.id = uuid.v4();
      createElement(urlProduct, productElement);
    } else {
      updateElement(urlProduct, productElement);
    }
  });
}

//#region DEL-Status
let idDelProduct = "";
function handleIdDelProduct(id) {
  idDelProduct = id;
  showFormDel(idDelProduct);
}

function showFormDel(id) {
  const productImgDel = document.getElementById("product-img-del");
  const productNameDel = document.getElementById("product-name-del");
  let data = dataProducts.find(
    (product) => product.id.toString() === id.toString()
  );
  console.log(data);
  productImgDel.src = data.img;
  productNameDel.innerText = data.name;
}

function handleDelProduct() {
  deleteStatus(urlProduct, idDelProduct);
  idDelProduct = "";
}
//#endregion
