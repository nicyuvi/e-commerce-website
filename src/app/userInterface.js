// product cards section
const productsDOM = document.querySelector('#featured-products-cards');

export default class UI {
  // Display products
  static displayProducts(products) {
    let result = '';
    // loop through each product object in products array
    products.forEach((product) => {
      // add product cards to empty string
      result += `
        <div class="product-card">
          <div class="border border-gray-300 h-96 cursor-pointer overflow-hidden">
            <img class="object-center object-cover h-96 transform hover:scale-105 transition-transform duration-300" src="${product.image}"
              alt="image of featured product">
          </div>
          <h2 class="text-2xl">${product.title}</h2>
          <p class="text-xl text-gray-500">${product.price}</p>
      </div>`;
    });
    // add product cards to DOM
    productsDOM.innerHTML = result;
  }
}

// **NOTE: Format prices**
