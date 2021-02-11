// Script.js

window.addEventListener("DOMContentLoaded", () => {
  let store = {
    items: [],
  };
  let storedItemsSerial = localStorage.getItem("store.items");
  if (storedItemsSerial) {
    store.items = JSON.parse(storedItemsSerial);
    addShopItems(store.items)
  } else {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        let serialized = JSON.stringify(data);
        localStorage.setItem("store.items", serialized);
        store.items = data;
        addShopItems(store.items)
      });
  }
});


function addShopItems(items) {

  let itemsElements = []
  items.forEach((item) => {
    let e = document.createElement("product-item");
    e.setAttribute("image-src", item.image);
    e.setAttribute("title", item.title);
    e.setAttribute("price", "$" + item.price);
    e.setAttribute("product-id", "$" + item.price);
    itemsElements.push(e);
  });

  itemsElements.forEach((e) => {
    document.getElementById("product-list").appendChild(e)
  });
  
}
