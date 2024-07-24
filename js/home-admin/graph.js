let tableLabels = [];
let totalBills = [];
let bills = [];
let firstDayOfYear = "01/01/2024";
let categoryBills = [];
let categoryLabels = [];
let categoryTotalBills = [];

function showDataGraph() {
  // get Data Order this year
  let dataGraphOrder = dataOrders.map((item) => ({ ...item }));
  let dataGraphOrderThisYear = dataGraphOrder.filter(
    (productOrder) => parseDate(productOrder.date) >= parseDate(firstDayOfYear)
  );
  dataGraphOrderThisYear.sort((a, b) => parseDate(a.date) - parseDate(b.date));

  let totalPrice = 0;
  dataGraphOrderThisYear.forEach((order, index) => {
    if (index < dataGraphOrderThisYear.length - 1) {
      let monthIndexCurrent = order.date.split("/")[1];
      let monthIndexNext = dataGraphOrderThisYear[index + 1].date.split("/")[1];
      if (monthIndexCurrent != monthIndexNext) {
        let bill = {
          month: monthIndexCurrent,
          total: totalPrice,
        };
        bills.push(bill);
        totalPrice = 0;
      }
    }

    order.listProduct.forEach((productOrder) => {
      dataProducts.forEach((product) => {
        if (product.id == productOrder.id) {
          totalPrice += productOrder.quantity * product.price;
          productOrder.category = product.category;
          productOrder.price = product.price;
          return;
        }
      });
    });

    if (index == dataGraphOrderThisYear.length - 1) {
      let bill = {
        month: order.date.split("/")[1],
        total: totalPrice,
      };
      bills.push(bill);
    }
  });

  //   Get Category this year
  dataCategories.forEach((category, index) => {
    let totalPriceCategory = 0;
    dataGraphOrderThisYear.forEach((order) => {
      order.listProduct.forEach((productOrder) => {
        if (category.name == productOrder.category) {
          totalPriceCategory += productOrder.quantity * productOrder.price;
        }
      });
    });
    let categoryBill = {
      category: category.name,
      total: totalPriceCategory,
    };
    categoryBills.push(categoryBill);
  });

  categoryBills.sort((a, b) => b.total - a.total);

  showGraph();
}
function showGraph() {
  bills.forEach((bill) => {
    tableLabels.push("T" + bill.month);
    totalBills.push(bill.total);
  });
  categoryBills.forEach((bill) => {
    categoryLabels.push(bill.category), categoryTotalBills.push(bill.total);
  });
  const ctx = document.createElement("canvas");
  const ctx2 = document.createElement("canvas");
  document.querySelector(".bar-chart").appendChild(ctx);
  document.querySelector(".pro-chart").appendChild(ctx2);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: tableLabels,
      datasets: [
        {
          label: "REVENUE TOTAL",
          data: totalBills,
          backgroundColor: "violet",
          borderColor: "violet",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: categoryLabels,
      datasets: [
        {
          label: "REVENUE TOTAL",
          data: categoryTotalBills,
          backgroundColor: "blue",
          borderColor: "blue",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
  const piece = document.createElement("canvas");
  document.querySelector(".pie-chart").appendChild(piece);

  new Chart(piece, {
    type: "pie", // Use 'pie' for creating a pie chart
    data: {
      labels: tableLabels,
      datasets: [
        {
          label: "TOTAL REVENUE",
          data: totalBills,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 0, 0, 0.6)",
            "rgba(0, 255, 0, 0.6)",
            "rgba(0, 0, 255, 0.6)",
            "rgba(128, 0, 128, 0.6)",
            "rgba(0, 128, 128, 0.6)",
            "rgba(128, 128, 0, 0.6)",
            "rgba(255, 165, 0, 0.6)",
            "rgba(0, 255, 255, 0.6)",
            "rgba(255, 0, 255, 0.6)",
            "rgba(128, 0, 0, 0.6)",
            "rgba(0, 128, 0, 0.6)",
            "rgba(0, 0, 128, 0.6)",
            // You can add more colors here if needed
          ],
          borderColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 0, 0, 0.6)",
            "rgba(0, 255, 0, 0.6)",
            "rgba(0, 0, 255, 0.6)",
            "rgba(128, 0, 128, 0.6)",
            "rgba(0, 128, 128, 0.6)",
            "rgba(128, 128, 0, 0.6)",
            "rgba(255, 165, 0, 0.6)",
            "rgba(0, 255, 255, 0.6)",
            "rgba(255, 0, 255, 0.6)",
            "rgba(128, 0, 0, 0.6)",
            "rgba(0, 128, 0, 0.6)",
            "rgba(0, 0, 128, 0.6)",
            // You can add more colors here if needed
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}
