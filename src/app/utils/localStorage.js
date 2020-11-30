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
}
