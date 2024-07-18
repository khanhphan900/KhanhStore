let currentPage = 1;

function getDataCurrentPage(typeData, data, numberElementInPage, currentPage) {
  let totalPages;
  data.length <= numberElementInPage
    ? (totalPages = 0)
    : (totalPages = Math.ceil(data.length / numberElementInPage));

  displayPagination(typeData, totalPages);

  const start = (currentPage - 1) * numberElementInPage;
  const end = start + numberElementInPage;

  return data.slice(start, end);
}

function displayPagination(typeData, totalPages) {
  const pagination = document.getElementById(
    `pagination-${typeData.toLowerCase()}`
  );
  pagination.innerHTML = "";

  // Previous
  const liPre = document.createElement("li");
  liPre.classList.add("page-item");
  if (currentPage === 1) {
    liPre.classList.add("disabled");
  }
  liPre.innerHTML = `<a class="page-link" href="#" onclick=handle${typeData}Page(${
    currentPage - 1
  })>Previous</a>`;
  pagination.appendChild(liPre);

  // Pages
  for (let i = 0; i < totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (currentPage === i + 1) {
      li.classList.add("active");
    }
    li.innerHTML = `<a class="page-link" href="#" onclick=handle${typeData}Page(${
      i + 1
    })>${i + 1}</a>`;
    pagination.appendChild(li);
  }

  // Next
  const liNext = document.createElement("li");
  liNext.classList.add("page-item");
  if (currentPage === totalPages) {
    liNext.classList.add("disabled");
  }
  liNext.innerHTML = `<a class="page-link" href="#" onclick=handle${typeData}Page(${
    currentPage + 1
  })>Next</a>`;
  pagination.appendChild(liNext);
}

function handleCategoryPage(nextPage) {
  currentPage = nextPage;
  getAll(urlCategory, showCategories);
}

function handleProductPage(nextPage) {
  currentPage = nextPage;
  getAll(urlProduct, showProducts);
}

function handleOrderPage(nextPage) {
  currentPage = nextPage;
  getAll(urlUser, showOrders)
}
