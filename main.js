//console.log("Connection control")
const categoryList = document.querySelector("#category-list");
//console.log(categories)
const productList = document.getElementById("products");
//console.log(productList)
const openButton = document.querySelector("#open-button");
//console.log(openButton)
const closeButton = document.querySelector("#close-button");
//console.log(closeButton)
const modal = document.getElementById("modal");
//console.log(modal)
const modalList = document.querySelector(".modal-list");
//console.log(modalList)
const totalPrice = document.getElementById("total-price");
//console.log(totalPrice)

function fetchCategories() {
  //console.log("Function worked")
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) =>
      data.slice(0, 5).map((categoryy) => {
        const { category, image } = categoryy;
        //console.log(name);
        //console.log(image);
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        categoryDiv.innerHTML = `
        <img
            src=${image}
            alt=""
          />
          <span>${category}</span>`;
        categoryList.appendChild(categoryDiv);
      })
    )
    .catch((error) => console.log(error));
}

fetchCategories();

function fetchProducts() {
  //console.log("Function worked")
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) =>
      data.map((product) => {
        //console.log(product)
        const { title, price, category, image, id } = product;
        //create div
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img
              src="${image}"
              alt=""
            />
            <p>${title}</p>
            <p>${category}</p>
            <div class="product-action">
              <p>${price}€</p>
              <button onclick="addToBasket({id:${id},title:'${title}',price:${price},image:'${image}',amount:1})">Add to cart</button>
            </div>
      
      
      `;
        productList.appendChild(productDiv);
        //console.log(productDiv);
      })
    )
    .catch((error) => console.log("apihatası", error));
}

fetchProducts();

let basket = [];
let total = 0;

function addToBasket(product) {
  //console.log("sepete ekleme")
  //console.log(product);

  const idsiAyniEleman = basket.find(
    (sepettekiEleman) => sepettekiEleman.id === product.id
  );
  //console.log(idsiAyniEleman);
  if (idsiAyniEleman) {
    idsiAyniEleman.amount++;
  } else {
    basket.push(product);
  }
  //console.log(basket);
}

function showBasketItems() {
  //console.log("sepeti listeleme")
  basket.map((basketProduct) => {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");

    //console.log(basketProduct)
    const { image, title, price, amount, id } = basketProduct;
    listItem.innerHTML = `
    <img src="${image}" alt="">
    <h4>${title}</h4>
    <h4 class="price">${price} €;</h4>
    <p>Miktar : ${amount}</p>
    <button class="delete-button" onclick="deleteItem({id:${id},price:${price},amount:${amount}})">Sil</button>
    `;
    modalList.appendChild(listItem);
    //console.log(listItem);
    total += price * amount;
  });
}

openButton.addEventListener("click", () => {
  //console.log("sepete tıklandı")
  showBasketItems();
  modal.classList.add("active");
  totalPrice.innerText = total;
});

closeButton.addEventListener("click", () => {
  //console.log("sepet kapatıldı")
  modal.classList.remove("active");
  modalList.innerHTML=""
  total=0
});

modal.addEventListener("click", (event) => {
  //console.log(event.target)
  if (event.target.classList.contains("modal-wrapper")) {
    modal.classList.remove("active");
  }
});

function deleteItem(willDeleteItem) {
  //console.log(willDeleteItem)
  //console.log("silmeden önce",basket)
  basket = basket.filter((eleman) => eleman.id !== willDeleteItem.id);
  //console.log("sildikten sonra",basket)
  total -= willDeleteItem.price * willDeleteItem.amount
  totalPrice.innerText = total
}

modalList.addEventListener("click", (tiklamaOlayiBilgileri) => {
  //console.log(tiklamaOlayiBilgileri.target.parentElement)
  if (tiklamaOlayiBilgileri.target.classList.contains("delete-button")) {
    tiklamaOlayiBilgileri.target.parentElement.remove();
  }
  if (basket.length === 0) {
    modal.classList.remove("active");
  }
});
