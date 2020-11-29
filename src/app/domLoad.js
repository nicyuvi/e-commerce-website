import getProducts from './utils/products';
import UI from './userInterface';
import ProductView from './productView';
// event on page load
export default document.addEventListener('DOMContentLoaded', () => {
  // get products from contentful
  getProducts()
    .then((products) => {
      // call static method displayProducts
      UI.displayProducts(products);
    })
    .then(() => {
      // call static method viewProduct
      ProductView.viewProduct();
    })
    .catch((err) => {
      console.log(err);
    });
});
