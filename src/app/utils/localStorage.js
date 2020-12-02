export default class Storage {
  // save products array to local storage
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  // Getting specific item from local storage based on unique id
  static getProduct(id) {
    // gets array of objects from local storage
    const products = JSON.parse(localStorage.getItem('products'));
    // returning the FIRST PRODUCT that matches unique id argument from the products array
    return products.find((product) => product.id === id);
  }

  // Saving current cart array to local storage
  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static getCart() {
    // if item is in local storage
    // parse into object
    // if not then return empty string
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }
}
