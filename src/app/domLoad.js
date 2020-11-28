import Products from './utils/products';
// Event on page load
export default document.addEventListener('DOMContentLoaded', () => {
  // instantiate Products
  const products = new Products();

  // get all products
  products.getProducts();
});
