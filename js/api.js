const urlProduct = "http://localhost:3000/products";
const urlCategory = "http://localhost:3000/categories";
const urlAdvertisement = "http://localhost:3000/advertisements";
const urlCustomer = "http://localhost:3000/customers";
const urlCart = "http://localhost:3000/carts";
const urlOrder = "http://localhost:3000/orders";

let isInitialized = false;

//#region GET ALL
async function getAll(url, callback) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error("Lỗi:", error);
  }
}
//#region GET ALL
async function getAll2(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

//#region GET BY ID
async function getElementById(url, id, callback) {
  try {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    callback(data);
  } catch (error) {
    callback(null);
    console.error("Lỗi:", error);
  }
}

//#region GET BY EMAIL
async function getByEmail(url, email) {
  try {
    const response = await fetch(url);
    data = await response.json();
    return data.find((element) => element.email == email);
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

// DELETE BY ID
async function deleteById(url, id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

//#region ADD
async function addElement(url, element) {
  try {
    const method = element.id ? "PUT" : "POST";
    url = `${url}${element.id ? `/${element.id}` : ""}`;
    if (!element.id) {
      const response = await fetch(url);
      const data = await response.json();
      element.id = data.length + 1;
    }
    const responseNew = await fetch(url, {
      method: method,
      body: JSON.stringify(element),
    });
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

//#region CREATE
async function createElement(url, element) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(element),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

//#region UPDATE
async function updateElement(url, element) {
  try {
    const response = await fetch(`${url}/${element.id}`, {
      method: "PUT",
      body: JSON.stringify(element),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

//#region DEL STATUS
async function deleteStatus(url, id) {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    data.status = false;
    updateElement(url, data);
  } catch (error) {
    console.error("Lỗi:", error);
  }
}
