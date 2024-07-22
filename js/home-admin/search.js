let searchName = null;
let searchLogistic = null;

let searchProductName = null;

let dataSearch = {
  category: { text: "category", searchName: "" },
  product: { text: "product", searchName: "" },
  order: { text: "order", searchCustomerName: "", searchLogistic: "" },
};

function getDataSearch(data, typeSearch) {
  switch (typeSearch) {
    case "category":
      return searchDataCategory(data);
    case "product":
      return searchDataProduct(data);
    case "order":
      return searchDataOrder(data);
  }
}
//#region Submit Cate
const formSearchCategory = document.getElementById("form-search-category");
formSearchCategory.addEventListener("submit", (e) => {
  e.preventDefault();
  dataSearch.category.searchName = document
    .getElementById("search-content")
    .value.toLowerCase();

  showCategories();
});
//#region Search Cate
function searchDataCategory(data) {
  if (dataSearch.category.searchName) {
    data = data.filter((element) =>
      element.name.toLowerCase().includes(dataSearch.category.searchName)
    );
  }
  return data;
}

//#region Submit Prod
const formSearchProduct = document.getElementById("form-search-product");
formSearchProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  dataSearch.product.searchName = document
    .getElementById("search-product-content")
    .value.toLowerCase();

  showProducts();
});
//#region SEARCH Prod
function searchDataProduct(data) {
  if (dataSearch.product.searchName) {
    data = data.filter((element) =>
      element.name.toLowerCase().includes(dataSearch.product.searchName)
    );
  }
  return data;
}
//#endregion

//#region Submit Order
const formSearchOrder = document.getElementById("form-search-order");
formSearchOrder.addEventListener("submit", (e) => {
  e.preventDefault();
  dataSearch.order.searchCustomerName = document
    .getElementById("search-order-name")
    .value.toLowerCase();
  dataSearch.order.searchLogistic = document.getElementById(
    "search-order-logistic"
  ).value;
  showOrders();
});

//#region  Search Order
function searchDataOrder(data) {
  // search by idCustomer
  if (dataSearch.order.searchCustomerName) {
    let customersSearch = dataCustomers.filter((customer) =>
      customer.name.toLowerCase().includes(dataSearch.order.searchCustomerName)
    );
    data = data.filter((element) => {
      let customer = customersSearch.find(
        (customer) => element.idCustomer == customer.id
      );
      return customer ? element : null;
    });
  }
  // search by logistic
  if (dataSearch.order.searchLogistic) {
    data = data.filter((element) =>
      element.logistic.includes(dataSearch.order.searchLogistic)
    );
  }
  return data;
}
