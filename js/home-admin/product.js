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
              onclick=handleIdProduct(${item.id})></i>
            <i class="fa-solid fa-trash text-danger h4" data-bs-toggle="modal" data-bs-target="#deleteProduct" 
              onclick=handleIdDelProduct(${item.id})></i>
          </td> 
      `;
    tbodyProduct.appendChild(tr);
  });
}

//#endregion

// //#region CREATE/EDIT
// function handleIdProduct(id) {
//   getProductById(urlProduct, id, showFormProduct);
// }

// function showFormProduct(element = null) {
//   const titleForm = document.getElementById("productAddModalLabel");
//   const idProduct = document.getElementById("id-product");
//   const logoProduct = document.getElementById("logo-product");
//   const imgProduct = document.getElementById("img-product");
//   const inputFileProduct = document.getElementById("input-file-product");
//   const nameProduct = document.getElementById("name-product");
//   const quantityProduct = document.getElementById("quantity-product");
//   const priceProduct = document.getElementById("price-product");
//   const btnSubmit = document.getElementById("btn-submit-product");

//   if (!element) {
//     clearFormProduct();
//     titleForm.innerHTML = "ADD NEW PRODUCT";
//     logoProduct.style.display = "block";
//     imgProduct.src = linkImgDefault;
//     addRequired(inputFileProduct, true);
//     nameProduct.placeholder = "Enter Product name";
//     quantityProduct.placeholder = "Enter address";
//     priceProduct.placeholder = "Enter phone number";
//     setupSelectCategory(element, dataCategories);
//     btnSubmit.innerText = "Save";
//   } else {
//     idProduct.value = element.id;
//     titleForm.innerHTML = "EDIT PRODUCT";
//     imgProduct.src = element.img;
//     addRequired(inputFileProduct, false);
//     nameProduct.value = element.name;
//     quantityProduct.value = element.quantity;
//     priceProduct.value = element.price;
//     setupSelectCategory(element, dataCategories);
//     btnSubmit.innerText = "Update";
//   }
// }

// function setupSelectCategory(element = null) {
//   if (element) {
//     element = element.status ? element : null;
//   }
//   const selectCategoryProduct = document.getElementById(
//     "select-category-product"
//   );
//   console.log(selectCategoryProduct);
//   if (!element) {
//     const optionCreate = document.createElement("option");
//     optionCreate.selected = true;
//     optionCreate.disabled = true;
//     optionCreate.text = "Select type category";
//     selectCategoryProduct.appendChild(optionCreate);
//   }
//   dataCategories.map((category) => {
//     const option = document.createElement("option");
//     option.value = category.name;
//     option.text = category.name;
//     option.selected = element ? element.category == category.name : false;
//     selectCategoryProduct.appendChild(option);
//   });
// }

// function clearFormProduct() {
//   const idProduct = document.getElementById("id-product");
//   const nameProduct = document.getElementById("name-product");
//   const quantityProduct = document.getElementById("quantity-product");
//   const priceProduct = document.getElementById("price-product");
//   // const categoryProduct = document.getElementById("category-product");

//   idProduct.value = "";
//   nameProduct.value = "";
//   quantityProduct.value = "";
//   priceProduct.value = "";
//   // categoryProduct.value = "";
// }

// function addProduct() {
//   const formProduct = document.getElementById("form-Product");
//   formProduct.addEventListener("submit", function (e) {
//     e.preventDefault();

//     // Check validated
//     if (!this.checkValidity()) {
//       console.log("Lỗi validated");
//       return;
//     }

//     const idProduct = document.getElementById("id-product").value;
//     const imgProduct = document.getElementById("img-product").src;
//     const ProductName = document.getElementById("name-Product").value;
//     const ProductAddress = document.getElementById("address-Product").value;
//     const ProductPhone = document.getElementById("phone-Product").value;

//     const ProductElement = {
//       id: ProductId,
//       name: ProductName,
//       logo: ProductImg,
//       address: ProductAddress,
//       phone: ProductPhone,
//       status: true,
//     };

//     // Create or Update
//     if (!ProductElement.id) {
//       createElement(urlProduct, ProductElement);
//     } else {
//       updateElement(urlProduct, ProductElement);
//     }

//     // Save img firebase
//     uploadImage();

//     // Show all
//     getAll(urlProduct, showProducts);
//   });
// }
// //#endregion

// //#region DEL-Status
// let idDelProduct = "";
// function handleIdDelProduct(id) {
//   idDelProduct = "";
//   idDelProduct = id;
//   console.log(id);
//   getElementById(urlProduct, idDelProduct, showFormDel);
// }

// function showFormDel(data) {
//   const ProductImgDel = document.getElementById("Product-img-del");
//   const ProductNameDel = document.getElementById("Product-name-del");
//   console.log(data.logo);
//   ProductImgDel.src = data.logo;
//   ProductNameDel.innerText = data.name;
// }

// function handleDelProduct() {
//   deleteStatus(urlProduct, idDelProduct);
//   // Show all
//   getAll(urlProduct, showProducts);
// }
// //#endregion
