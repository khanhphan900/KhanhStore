const urlProduct = "http://localhost:3000/products";
const urlCategory = "http://localhost:3000/categories";

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

//#region GET BY ID
async function getElementById(url, id, callback) {
  try {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

// GET PRODUCT BY ID
async function getProductById(url, id, callback) {
  try {
    let data;
    if (id) {
      const response = await fetch(`${url}/${id}`);
      data = await response.json();
    }
    
    callback(data);
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

//#region Create
async function createElement(url, element) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    element.id = data.length + 1;
    const responseNew = await fetch(url, {
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
