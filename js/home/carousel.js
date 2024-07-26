//#region QC

let advertisementData = [];
let indexCurrentCarousel1 = 0;
function showCarouselAdvert() {
  let data = dataAdverts;
  const carousel1Imgs = document.getElementById("carousel-1-imgs");
  const dataCarousel1 = data.splice(0, 6);
  carousel1Imgs.innerHTML = "";
  const divHidden = document.createElement("div");
  divHidden.classList.add("carousel-1-box");

  dataCarousel1.forEach((element) => {
    const img = document.createElement("img");
    img.classList.add("carousel-1-img");
    img.src = element.img;

    const divBox = document.createElement("div");
    divBox.classList.add("carousel-1-item");
    divBox.appendChild(img);

    divHidden.appendChild(divBox);
  });
  carousel1Imgs.appendChild(divHidden);

  moveAutoCarouselAdvert();
}

let moveAuto1;
function moveAutoCarouselAdvert() {
  const carousel1Box = document.getElementsByClassName("carousel-1-box");
  clearInterval(moveAuto1);
  if (carousel1Box) {
    moveAuto1 = setInterval(function () {
      indexCurrentCarousel1 =
        indexCurrentCarousel1 >= 2 ? 0 : indexCurrentCarousel1 + 1;
      addTransform1(indexCurrentCarousel1);
    }, 5000);
  }
}

const carousel1Btn = document.querySelectorAll(".carousel-1-btn");
carousel1Btn.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (this.id === "carousel-1-next") {
      indexCurrentCarousel1 =
        indexCurrentCarousel1 >= 4 ? 0 : indexCurrentCarousel1 + 1;
    } else {
      indexCurrentCarousel1 =
        indexCurrentCarousel1 <= 0 ? 4 : indexCurrentCarousel1 - 1;
    }
    addTransform1(indexCurrentCarousel1);
    moveAutoCarouselAdvert();
  });
});

function addTransform1(index) {
  const carousel1Box = document.querySelector(".carousel-1-box"); //4
  let percent = (-100 / 2) * index;
  carousel1Box.style.transform = `translateX(${percent}%)`;
  carousel1Box.style.transition = "transform 0.5s linear";
}

//#endregion

//#region Carousel
let infoCarousel = [
  {
    type: "mobile",
    index: 1,
    cardInScreen: 4,
    totalProduct: 10,
    auto: true,
  },
  {
    type: "product",
    index: 1,
    cardInScreen: 4,
    totalProduct: 10,
    auto: false,
  },
  {
    type: "laptop",
    index: 1,
    cardInScreen: 4,
    totalProduct: 10,
    auto: true,
  },
];

function showByInfoCarousel() {
  let data = dataProducts;
  infoCarousel.forEach((element) => {
    // Show Item Carousel
    const box = document.querySelector(`.box-${element.type}`);
    if (!box) {
      return;
    }
    box.innerHTML = "";
    let itemData = data;
    if (element.type !== "product") {
      itemData = data.filter((item) => item.type === element.type);
    }
    showProduct(itemData, box);

    // Setup view Mobile / Laptop
    let boxCards = document.querySelectorAll(".carousel .box-card");
    if (window.matchMedia("(min-width: 769px)").matches) {
      // Mobile
      element.cardInScreen = 4;
      boxCards.forEach((boxCard) => {
        boxCard.style.maxWidth = `calc(100% / ${element.cardInScreen})`;
      });
    } else {
      // Laptop and larger devices
      element.cardInScreen = 2;
      boxCards.forEach((boxCard) => {
        boxCard.style.maxWidth = `calc(100% / ${element.cardInScreen})`;
      });
    }

    // Check Run Auto Carousel
    let offset = itemData.length - element.cardInScreen;
    if (element.auto) {
      setInterval(function () {
        element.index = element.index >= offset ? 0 : element.index + 1;
        addTransformCarousel(element, box);
      }, 5000);
    }

    // Click Carousel
    const carouselBtn = document.querySelectorAll(".carousel-btn");
    carouselBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.toString().includes(element.type)) {
          if (btn.classList.toString().includes("right")) {
            element.index = element.index >= offset ? 0 : element.index + 1;
          } else {
            element.index = element.index <= 0 ? offset : element.index - 1;
          }
          addTransformCarousel(element, box);
        }
      });
    });
  });
}

function addTransformCarousel(element, box) {
  let percent = (-100 / element.cardInScreen) * element.index;
  box.style.transform = `translateX(${percent}%)`;
  box.style.transition = "transform 0.5s linear";
}

function showProduct(data, box) {
  data.forEach((element) => {
    let price = parseInt(element.price).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    const card = document.createElement("div");
    card.classList.add("card", "py-2");
    card.onclick = function () {
      localStorage.setItem("product", JSON.stringify(element));
      window.location.href = "product.html";
    };
    card.innerHTML = `
    <div class="img-card">
    <img src="${element.img}" class="card-img-top" alt="...">
    </div>
      <div class="card-body pb-0">
        <div class="card-title text-center">${element.name}</div>
        <div class="card-content">
          <p class="card-text text-center">${price}</p>
          <div class="text-center"><button class="btn btn-primary"
            onclick='handleProduct(event, ${element.id})'
          >Buy now</button></div>
        </div>
      </div>
      `;
    const div = document.createElement("div");
    div.classList.add("box-card");
    div.appendChild(card);
    box.appendChild(div);
  });
}
//#endregion

//#region Show more
const textShow1 = document.querySelector(".text-show-product");
const wrapperProduct = document.querySelector(".wrapper-product");
let numShow = 1;
textShow1.addEventListener("click", () => {
  if (numShow >= dataProducts.length/8-1) {
    textShow1.classList.add("d-none");
  }
  numShow++;
  wrapperProduct.style.height = `calc(680px * ${numShow})`;
});
