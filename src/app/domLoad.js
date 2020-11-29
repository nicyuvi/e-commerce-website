import getProducts from './utils/products';
import UI from './userInterface';
// event on page load
export default document.addEventListener('DOMContentLoaded', () => {
  // get products from contentful
  getProducts().then((products) => {
    // call static method displayProducts
    UI.displayProducts(products);
  });
});
