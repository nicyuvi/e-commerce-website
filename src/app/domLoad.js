import getProducts from './utils/products';
import UI from './userInterface';
import ProductView from './productView';
import Storage from './utils/localStorage';
import Cart from './cart';

export default document.addEventListener('DOMContentLoaded', () => {
  // set up app on DOM load
  Cart.setUpApp();
  // get products from contentful
  getProducts()
    .then((products) => {
      // display products to DOM
      UI.displayFeaturedProducts(products);
      // save products array to local storage
      Storage.saveProducts(products);
    })
    .then(() => {
      // display product in product view
      ProductView.clickProduct();
    })
    .catch((err) => {
      console.log(err);
    });
});
