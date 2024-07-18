let typeOrderData = "Order";
let numberOrderShow = 8;
let statusOrder = ["fa-check", "fa-xmark"];
let logisticOrder = ["Chờ duyệt", "Đã duyệt", "Shipper", "Nhận hàng"];

getAll(urlUser, showOrders);

function showOrders(data) {
  data = data.filter((user) => user.cart.length != 0);
  // SEARCH by searchName
  data = searchData(data, searchName);
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

  dataCurrentPage.forEach((user, index) => {
    const tr = document.createElement("tr");
    const status = statusOrder[Math.floor(Math.random() * statusOrder.length)];
    const logistic =
      logisticOrder[Math.floor(Math.random() * logisticOrder.length)];
    let totalProduct = 0;
    let totalPrice = 0;
    user.cart.forEach((item) => {
      totalProduct += item.sl;
      totalPrice += item.sl * item.price;
    });

    totalPrice = parseInt(totalPrice).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    tr.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${user.name}</td>
            <td class="tooltip-product-name">
            <div  class="substring-text" style="max-width: 150px">${
              user.address
            }</div>
            <div class="tooltip-full-name">${user.address}</div>
            </td>
            <td>${user.phone}</td>
            <td>${totalProduct}</td>
            <td>${totalPrice}</td>
            <td class="${
              logistic.includes("Shipper")
                ? "text-warning"
                : logistic.includes("Nhận")
                ? "text-success"
                : "text-danger"
            } h6">${logistic}</td> 
            <td class="${
              status.includes("check") ? "text-success" : "text-danger"
            } h6"><i class="fa-solid ${status}"></i></td> 
            <td><i class="fa-solid fa-circle-info"></i></td> 
        `;
    tbodyCategory.appendChild(tr);
  });
}

function searchData(data, searchName) {
  if (!searchName) {
    return data;
  }
  return data.filter((element) =>
    element.name.toLowerCase().includes(searchName.toLowerCase())
  );
}
console.log(Math.ceil(Math.random(4)));
console.log(Math.random(4));
