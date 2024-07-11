let numberProductDisplay = 5;
let messageSearchProduct = null;
//#region displayProducts
getAll(urlProduct, displayProducts, 1);

function setupPaginationProduct(data) {
  const pagination = document.getElementById("pagination-products");
  let numPages;
  data.length <= 5
    ? (numPages = 0)
    : (numPages = Math.ceil(data.length / numberProductDisplay));

  pagination.innerHTML = "";

  for (let i = 0; i < numPages; i++) {
    const li = document.createElement("li");
    li.classList.add("li-pagination");
    li.innerHTML = `<button class="btn btn-primary mx-2" href="#" onclick="goPageProducts(${
      i + 1
    })">${i + 1}</button>`;
    pagination.appendChild(li);
  }
}

function goPageProducts(page) {
  getAll(urlProduct, displayProducts, page, messageSearchProduct);
}

function displayProducts(elements, page) {
  setupPaginationProduct(elements);

  const tbodyProduct = document.getElementById("tbody-product");
  tbodyProduct.innerHTML = "";

  const start = (page - 1) * numberProductDisplay;
  const end = start + numberProductDisplay;
  const elementsNew = elements.slice(start, end);

  elementsNew.forEach((item) => {
    if (!item.exists) {
      return;
    }

    let price = parseInt(item.price).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <th scope="row">${item.id}</th>
          <td><img src="${item.img}" alt=""></td>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${price}</td>
          <td>${item.category}</td>
          <td>
              <button class="btn btn-warning"  data-bs-toggle="modal" data-bs-target="#productAddModal" onclick=handleIdEditProduct(${item.id})>Edit</button> 
              <button class="btn btn-danger" data-bs-toggle="modal"  data-bs-target="#deleteProduct" onclick=handleIdDelProduct(${item.id})>Delete</button>
          </td> 
      `;
    tbodyProduct.appendChild(tr);
  });
}
//#endregion

//#region ADD / UPDATE
function setupFormProduct(element = null, dataCategory) {
  console.log(dataCategory);
  const productForm = document.getElementById("product-form");
  productForm.innerHTML = "";
  productForm.innerHTML = `
   <input type="hidden" id="id-product" value="${element ? element.id : ""}">

    <div class="modal-header">
      <h5 class="col-11 ps-5 modal-title text-success text-center" id="productAddModalLabel">${
        !element ? "ADD" : "EDIT"
      } NEW product</h5>
        <button type="button" class="col-1 btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="mb-3">
        ${
          !element
            ? `<input id="img-product" type="file" class="form-control" aria-label="file example" required>
              <div class="invalid-feedback">Example invalid form file feedback</div>`
            : `<img id="img-product" src="${element.img}" class="w-25 h-25" alt="">`
        }     
      </div>
      <div class="position-relative">
        <label for="name-product" class="form-label">Name</label>
        <input type="text" class="form-control" id="name-product" ${
          !element
            ? `placeholder="Enter product name"`
            : `value="${element.name}"`
        } required>
        <div class="valid-tooltip">
          Looks good! 
        </div>
      </div>
      <div class="position-relative">
        <label for="quantity-product" class="form-label">Quantity</label>
        <input type="text" class="form-control" id="quantity-product" ${
          !element
            ? `placeholder="Enter quantity"`
            : `value = "${element.quantity}"`
        } required>
        <div class="valid-tooltip">
          Looks good!
        </div>
      </div>
      <div class="position-relative">
        <label for="price-product" class="form-label">Price</label>
        <input type="text" class="form-control" id="price-product" ${
          !element ? `placeholder="Enter price"` : `value = ${element.price}`
        } required>
        <div class="valid-tooltip">
          Looks good!
        </div>
      </div>
      <div class="position-relative">
        <label for="category-product" class="form-label">Category</label>
        <select id="select-category-product" class="form-select" aria-label="Default select example">
          ${
            element
              ? ""
              : "<option selected disabled >Chọn loại sản phẩm</option>"
          }
          ${dataCategory
            .map(
              (category) =>
                `<option  value="${category.name}" ${
                  category.name == (element ? element.category : "")
                    ? "selected"
                    : ""
                }>${category.name}</option>`
            )
            .join("")}  
        </select>
        <div class="valid-tooltip">
          Looks good!
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button class="btn btn-primary" type="submit">${
        !element ? "Save" : "Update"
      } changes</button>
    </div>
 `;
}

function showFormProduct(id) {
  getProductById(urlProduct, id, setupFormProduct);
}

const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const productId = document.getElementById("id-product").value;
  const productImg = !productId
    ? document.getElementById("img-product").value
    : document.getElementById("img-product").src;
  const productName = document.getElementById("name-product").value;
  const productQuantity = document.getElementById("quantity-product").value;
  const productPrice = document.getElementById("price-product").value;
  const productCategory = document.getElementById("category-product").value;

  const productItem = {
    id: productId,
    img: productImg,
    name: productName,
    quantity: productQuantity,
    price: productPrice,
    category: productCategory,
    exists: true,
  };
  addItem(urlProduct, productItem);
  getAll(urlProduct, displayProducts);
});

//#endregion
