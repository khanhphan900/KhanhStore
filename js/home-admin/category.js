let numberCategoryShow = 5;
let linkImgDefault = "/img/logo.png";
let statusMessage = null;
let contentMessage = null;
let typeCategoryData = "Category";
// Firebase
const storage = firebase.storage();
let imgPath = "";

//#region SHOW ALL

function showCategories() {
  let data = dataCategories;
  // GET data status TRUE
  data = data.filter((element) => element.status === true);
  dataCategories = data;

  // SEARCH by searchName
  data = getDataSearch(data, dataSearch.category.text);

  // GET data current page
  let dataCurrentPage = getDataCurrentPage(
    typeCategoryData,
    data,
    numberCategoryShow,
    currentPage
  );

  const tbodyCategory = document.getElementById("tbody-categories");
  tbodyCategory.innerHTML = "";

  const paginationOrder = document.getElementById("pagination-category");
  const pageTabCurrent = paginationOrder.querySelector(".active");

  dataCurrentPage.forEach((item, index) => {
    let pageCurrent = pageTabCurrent ? pageTabCurrent.textContent : 1;
    let stt = (pageCurrent - 1) * numberCategoryShow + index + 1;
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <th scope="row">${stt}</th>
          <td><div class="td-img"><img src="${item.logo}"  alt=""><div></td>
          <td>${item.name}</td>
          <td>${item.address}</td>
          <td>${item.phone}</td>
          <td>
            <i class="fa-solid fa-pen-to-square text-warning h4" data-bs-toggle="modal" data-bs-target="#categoryAddModal" 
              onclick=handleIdEditCategory(${item.id})></i>
            <i class="fa-solid fa-trash text-danger h4" data-bs-toggle="modal"  data-bs-target="#deleteCategory" 
              onclick=handleIdDelCategory(${item.id})></i>
          </td> 
      `;
    tbodyCategory.appendChild(tr);
  });
}

function changePage(nextPage) {
  currentPage = nextPage;
  getAll(urlCategory, showCategories);
}
//#endregion

//#region CREATE/EDIT
function handleIdEditCategory(id) {
  getElementById(urlCategory, id, showCategoryForm);
}

function showCategoryForm(element = null) {
  const titleForm = document.getElementById("categoryAddModalLabel");
  const idCategory = document.getElementById("id-category");
  const logoCategory = document.getElementById("logo-category");
  const imgCategory = document.getElementById("img-category");
  const inputFileCategory = document.getElementById("input-file-category");
  const nameCategory = document.getElementById("name-category");
  const addressCategory = document.getElementById("address-category");
  const phoneCategory = document.getElementById("phone-category");
  const btnSubmit = document.getElementById("btn-submit");

  if (!element) {
    clearForm();
    titleForm.innerHTML = "ADD NEW CATEGORY";
    // setup images
    logoCategory.style.display = "block";
    imgCategory.src = linkImgDefault;
    addRequired(inputFileCategory, true);
    // setup btn
    btnSubmit.innerText = "Save";
  } else {
    idCategory.value = element.id;
    titleForm.innerHTML = "EDIT CATEGORY";
    // setup images
    imgCategory.src = element.logo;
    addRequired(inputFileCategory, false);
    nameCategory.value = element.name;
    addressCategory.value = element.address;
    phoneCategory.value = element.phone;
    // setup btn
    btnSubmit.innerText = "Update";
  }
}

function clearForm() {
  const idCategory = document.getElementById("id-category");
  const nameCategory = document.getElementById("name-category");
  const addressCategory = document.getElementById("address-category");
  const phoneCategory = document.getElementById("phone-category");

  idCategory.value = "";
  nameCategory.value = "";
  addressCategory.value = "";
  phoneCategory.value = "";
}

function addRequired(input, status) {
  if (!status) {
    input.removeAttribute("required");
  } else {
    input.setAttribute("required", "required");
  }
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("img-category").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function uploadImage() {
  const file = document.getElementById("input-file-category").files[0];
  if (file) {
    imgPath = "images/" + file.name;
    const storageRef = storage.ref(imgPath);
    const uploadTask = storageRef.put(file);

    uploadTask.on("state_changed", function () {
      // Thẻ hiển thị hoàn thành upload thành công
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("Upload successful!");
      });
    });
  } else {
    console.log("No file selected");
  }
}

function addCategory() {
  const formCategory = document.getElementById("form-category");
  formCategory.addEventListener("submit", function (e) {
    e.preventDefault();

    // Check validated
    if (!this.checkValidity()) {
      console.log("Lỗi validated");
      return;
    }

    const categoryId = document.getElementById("id-category").value;
    const categoryImg = document.getElementById("img-category").src;
    const categoryName = document.getElementById("name-category").value;
    const categoryAddress = document.getElementById("address-category").value;
    const categoryPhone = document.getElementById("phone-category").value;

    const categoryElement = {
      id: categoryId,
      name: categoryName,
      logo: categoryImg,
      address: categoryAddress,
      phone: categoryPhone,
      status: true,
    };

    // Create or Update
    if (!categoryElement.id) {
      createElement(urlCategory, categoryElement);
    } else {
      updateElement(urlCategory, categoryElement);
    }

    // Save img firebase
    uploadImage();

    // Show all
    getAll(urlCategory, showCategories);
  });
}
//#endregion

//#region DEL-Status
function handleIdDelCategory(id) {
  showFormDelCategory(id);
}

function showFormDelCategory(id) {
  const categoryImgDel = document.getElementById("category-img-del");
  const categoryNameDel = document.getElementById("category-name-del");
  let data = dataCategories.find((item) => item.id == id);
  categoryImgDel.src = data.logo;
  categoryNameDel.innerText = data.name;
}

function handleDelCategory() {
  deleteStatus(urlCategory, idDel);
  // Show all
  getAll(urlCategory, showCategories);
}
//#endregion
