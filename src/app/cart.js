import Storage from './utils/localStorage';

// cart items number in nav bar
const cartItemsNumber = document.querySelectorAll('.cart-items-number');
// total in shopping cart
const cartTotal = document.querySelector('.cart-total');
// cart items container
const cartItemsContainer = document.querySelector('#cart-items');

// our products will live in this array once we add them
let cart = [];

export default class Cart {
  static setUpApp() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    // At this point our cart array is updated
    // from local storage
  }

  static populateCart(cartFromLocalStorage) {
    cartFromLocalStorage.forEach((item) => {
      this.addCartItem(item);
    });
  }

  // passing in product id and product view DOM element
  static getCartButtons(productID, productViewContent) {
    // select add to cart button from DOM
    // eslint-disable-next-line operator-linebreak
    const addToCartButton =
      productViewContent.lastElementChild.lastElementChild.firstElementChild;

    // check if product id is already in our cart array
    const inCart = cart.find((item) => item.id === productID);

    // to prevent adding multiple items to cart
    if (inCart) {
      // Set inner text for button to "In Cart"
      addToCartButton.innerHTML = '<span>/</span> In Cart';
      // and disable the button
      addToCartButton.disabled = true;
    }

    // add product to cart event
    addToCartButton.addEventListener('click', (e) => {
      e.target.innerHTML = '<span>/</span> In Cart';
      e.target.disabled = true;

      // spread operator copies all properties from specific object onto new cartItem object
      const cartItem = { ...Storage.getProduct(productID), amount: 1 };

      // add cartItem to cart array
      cart = [...cart, cartItem];

      // Save cart in local storage
      Storage.saveCart(cart);

      // set cart values to DOM
      this.setCartValues(cart);

      // add product to cart
      this.addCartItem(cartItem);
    });
  }

  // cart values to DOM
  static setCartValues(updatedCart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    // total each item from cart
    updatedCart.forEach((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });

    // display cart total to DOM
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));

    // display cart item numbers to DOM
    cartItemsNumber.forEach((item) => {
      const itemNum = item;
      itemNum.innerText = itemsTotal;
    });
  }

  // add product to shopping cart
  // pass in product object as item
  static addCartItem(item) {
    // one cart item with dynamically added properties
    const cartItemDOM = `
      <li class="cart-item flex justify-between items-center mb-8">
          <div class="text-left flex justify-between items-center">
            <div>
              <img class="object-cover object-center w-20 h-20 cursor-pointer" src="${item.image}" alt="product" />
            </div>
            <div class="ml-12">
              <h2 class="text-3xl">${item.title}</h2>
              <p class="text-2xl">$${item.price}</p>
              <span data-id="${item.id}" class="remove-item cursor-pointer hover:text-red-500 transition duration-300">remove</span>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <i class="fas fa-chevron-up cursor-pointer hover:text-red-500 transition duration-300"></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fas fa-chevron-down cursor-pointer hover:text-red-500 transition duration-300"></i>
          </div>
      </li>
    `;

    // cart product item to cart items container
    cartItemsContainer.innerHTML += cartItemDOM;
  }
}
