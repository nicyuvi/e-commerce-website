/* eslint-disable comma-dangle */
import Storage from './utils/localStorage';

import { toggleCartSidebar } from './navBar';

// cart items number in nav bar
const cartItemsNumber = document.querySelectorAll('.cart-items-number');
// total in shopping cart
const cartTotal = document.querySelector('.cart-total');
// cart items container
const cartItemsContainer = document.querySelector('#cart-items');
// clear cart button
const clearCartBtn = document.querySelector('#clear-cart');

// our products will live in this array once we add them
let cart = [];
// poplate with cart items buttons
let buttonsDOM = [];

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
  static getCartButtons(
    productID,
    productViewContent,
    saleAttribute,
    salePrice
  ) {
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
      const cartItem = {
        ...Storage.getProduct(productID),
        amount: 1,
        saleAttribute,
        salePrice,
      };

      // add cartItem to cart array
      cart = [...cart, cartItem];

      // Save cart in local storage
      Storage.saveCart(cart);

      // set cart values to DOM
      this.setCartValues(cart);

      // add product to cart
      this.addCartItem(cartItem);

      // Assign add to cart button to buttonsDOM
      // Later used to find which buttons to enable on cart clear
      buttonsDOM = [...buttonsDOM, e.target];
    });
  }

  // cart values to DOM
  static setCartValues(updatedCart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    // total each item from cart
    updatedCart.forEach((item) => {
      if (item.saleAttribute === 'true') {
        // destructure salePrice property
        const { salePrice } = item;
        // coerce salePrice from string to number
        // slice $ from salePrice string
        const salePriceNum = Number(salePrice.split('').slice(1).join(''));
        // add price and amount to totals
        tempTotal += salePriceNum * item.amount;
        itemsTotal += item.amount;
      } else {
        // and price and amount to totals
        tempTotal += item.price * item.amount;
        itemsTotal += item.amount;
      }
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
    if (item.saleAttribute === 'true') {
      // one cart item with added sale price
      const saleCartItemDOM = `
      <li class="cart-item flex justify-between items-center mb-8">
      <div class="text-left flex justify-between items-center">
      <div>
              <img class="object-cover object-center w-20 h-20 cursor-pointer" src="${item.image}" alt="product" />
              </div>
            <div class="ml-12">
            <h2 class="text-3xl">${item.title}</h2>
            <p class="text-2xl">${item.salePrice}</p>
              <span data-id="${item.id}" class="remove-item cursor-pointer hover:text-red-500 transition duration-300">remove</span>
              </div>
          </div>
          <div class="flex flex-col items-center justify-center">
          <i data-id='${item.id}' class="fas fa-chevron-up cursor-pointer hover:text-red-500 transition duration-300"></i>
            <p class="item-amount">${item.amount}</p>
            <i data-id='${item.id}' class="fas fa-chevron-down cursor-pointer hover:text-red-500 transition duration-300"></i>
            </div>
      </li>
    `;
      // cart product item to cart items container
      cartItemsContainer.innerHTML += saleCartItemDOM;
    } else {
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
          <i data-id='${item.id}' class="fas fa-chevron-up cursor-pointer hover:text-red-500 transition duration-300"></i>
            <p class="item-amount">${item.amount}</p>
            <i data-id='${item.id}' class="fas fa-chevron-down cursor-pointer hover:text-red-500 transition duration-300"></i>
            </div>
      </li>
    `;

      // cart product item to cart items container
      cartItemsContainer.innerHTML += cartItemDOM;
    }
  }

  // Cart functionality
  static cartLogic() {
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    });

    // update cart item quantity and remove cart items
    cartItemsContainer.addEventListener('click', (e) => {
      // event bubling for remove item
      if (e.target.classList.contains('remove-item')) {
        const removeItem = e.target;
        const removeItemId = e.target.dataset.id;

        cartItemsContainer.removeChild(
          // eslint-disable-next-line comma-dangle
          removeItem.parentElement.parentElement.parentElement
        );

        // removes item from cart array and local storage
        // reenables add to cart btn on this product
        this.removeItem(removeItemId);
      } else if (e.target.classList.contains('fa-chevron-up')) {
        // increase quantity
        const increaseAmount = e.target;
        const productID = increaseAmount.dataset.id;
        // find cart item
        const cartItem = cart.find((item) => item.id === productID);

        // increase cart item's amount property
        cartItem.amount += 1;

        // update amount on DOM
        increaseAmount.nextElementSibling.innerText = cartItem.amount;

        // update cart totals
        this.setCartValues(cart);

        // update amount property in local storage
        Storage.saveCart(cart);
      } else if (e.target.classList.contains('fa-chevron-down')) {
        // increase quantity
        const decreaseAmount = e.target;
        const productID = decreaseAmount.dataset.id;
        // find cart item
        const cartItem = cart.find((item) => item.id === productID);

        // decrease cart item's amount property unless it's at 1
        if (cartItem.amount !== 1) {
          cartItem.amount -= 1;

          // update amount on DOM
          decreaseAmount.previousElementSibling.innerText = cartItem.amount;

          // update cart totals
          this.setCartValues(cart);

          // update amount property in local storage
          Storage.saveCart(cart);
        }
      }
    });
  }

  // removes cart items from DOM
  static clearCart() {
    // map through cart and return unique id
    const cartItems = cart.map((item) => item.id);

    // loop through array of ids and remove from array
    cartItems.forEach((id) => this.removeItem(id));

    // check if cart items in DOM
    while (cartItemsContainer.children.length > 0) {
      // remove all cart items from DOM
      cartItemsContainer.removeChild(cartItemsContainer.children[0]);
    }
    // close cart sidebar
    toggleCartSidebar();
  }

  // remove items from cart array and local storage
  static removeItem(id) {
    // cart items don't pass filter test
    // cart items don't get added to new cart array
    // removes all items from current cart array
    cart = cart.filter((item) => item.id !== id);

    // update cart and local storage to new empty cart
    this.setCartValues(cart);
    Storage.saveCart(cart);

    // regain access to 'add to cart buttons'
    const previouslyDisabledBtn = this.getSingleButton(id);
    previouslyDisabledBtn.disabled = false;
    previouslyDisabledBtn.innerHTML = '<span>/</span> Add to Cart';
  }

  // get button from DOM based on product id from cart
  static getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }
}
