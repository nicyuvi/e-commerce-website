import Storage from './utils/localStorage';
// our products will live in this array once we add them
let cart = [];

export default class Cart {
  static getCartButtons(productID, productViewContent) {
    // eslint-disable-next-line operator-linebreak
    const button =
      productViewContent.lastElementChild.lastElementChild.firstElementChild;

    // check if product id is already in our cart array
    const inCart = cart.find((item) => item.id === productID);

    // to prevent adding multiple items to cart
    if (inCart) {
      // Set inner text for button to "In Cart"
      button.innerHTML = '<span>/</span> In Cart';
      // and disable the button
      button.disabled = true;
    }

    // add product to cart event
    button.addEventListener('click', (e) => {
      e.target.innerHTML = '<span>/</span> In Cart';
      e.target.disabled = true;

      // spread operator copies all properties from specific object onto new cartItem object
      const cartItem = { ...Storage.getProduct(productID), amount: 1 };

      // add cartItem to cart array
      cart = [...cart, cartItem];

      // Save cart in local storage
      Storage.saveCart(cart);
    });
  }
}
