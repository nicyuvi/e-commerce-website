import getProducts from './utils/products';

// Event on page load
export default document.addEventListener('DOMContentLoaded', () => {
  // Get products from contentful
  getProducts();
});
