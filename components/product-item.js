// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();

    this.elements = {};

    // Create a shadow root
    this.attachShadow({ mode: "open" }); // sets and returns 'this.shadowRoot'

    // Create (nested) span elements
    const wrapper = document.createElement("li");
    wrapper.setAttribute("class", "product");
    this.elements.wrapper = wrapper;

    this.elements.img = wrapper.appendChild(document.createElement("img"));

    this.elements.title = document.createElement("p");
    this.elements.title.setAttribute("class", "title");
    wrapper.appendChild(this.elements.title);

    this.elements.price = wrapper.appendChild(document.createElement("p"));
    this.elements.price.setAttribute("class", "price");

    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "./styles/styles.css");
    this.elements.linkElem = linkElem;

    // attach the created elements to the shadow DOM
    this.shadowRoot.append(linkElem, wrapper);
  }

  connectedCallback() {
    // add attribute content
    this.elements.img.src = this.getAttribute("image-src");
    this.elements.img.alt = this.getAttribute("title");

    this.elements.price.innerText = this.getAttribute("price");
    this.elements.title.innerText = this.getAttribute("title");

    this.elements.cartBtn = this.elements.wrapper.appendChild(
      document.createElement("button")
    );
    this.elements.cartBtn.innerText = "Add to Cart";

    // add and remove cart functions
    const IN_CART = "1";
    const NOT_IN_CART = "0";
    const productId = this.getAttribute("product-id");

    let addToCart = () => {
      let countElement = document.getElementById("cart-count");
      countElement.innerText = parseInt(countElement.innerText) + 1;
      this.elements.cartBtn.innerText = "Remove from Cart";
      this.elements.cartBtn.onclick = () => {
        removeFromCart();
        alert("Removed from cart!");
      };
      localStorage.setItem("store.items." + productId, IN_CART);
    };

    let removeFromCart = () => {
      let countElement = document.getElementById("cart-count");
      countElement.innerText = parseInt(countElement.innerText) - 1;
      this.elements.cartBtn.innerText = "Add to Cart";
      this.elements.cartBtn.onclick = () => {
        addToCart();
        alert("Added to cart!");
      };
      localStorage.setItem("store.items." + productId, NOT_IN_CART);
      
    };

    // attach onclick functions accordingly
    this.elements.cartBtn.onclick = () => {
      addToCart();
      alert("Added to cart!");
    };

    if (localStorage.getItem("store.items." + productId) === IN_CART) {
      addToCart();
    }
  }
}

customElements.define("product-item", ProductItem);
