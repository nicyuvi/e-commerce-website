import splide from './utils/splideSlider';
// product cards section
const productsDOM = document.querySelector('#featured-products-cards');

export default class UI {
  // Display products
  static displayProducts(products) {
    let cards = '';
    // loop through each product object in products array
    products.forEach((product) => {
      // add product cards to empty cards string
      cards += `
        <div data-id=${product.id} class="product-card cursor-pointer">
          <div class="border border-gray-300 h-96  overflow-hidden">
            <img class="object-center object-cover h-96 transform hover:scale-105 transition-transform duration-300" src="${product.image}"
              alt="image of featured product">
          </div>
          <h2 class="text-2xl">${product.title}</h2>
          <p class="text-xl text-gray-500">$${product.price}</p>
      </div>`;
      // add slides to empty slides string
      const slides = `
          <div class="splide__slide__container border border-gray-300 h-96 md:h-72 overflow-hidden">
            <img class="object-center object-cover h-96 md:h-72 transform hover:scale-105 transition-transform duration-300" src="${product.image}" alt="image of featured product">
          </div>
          <h2 class="text-2xl">${product.title}</h2>
          <p class="text-xl text-gray-500">$${product.price}</p>
      `;
      // add slides to splide slider
      splide.add(
        // eslint-disable-next-line comma-dangle
        `<li data-id=${product.id} class="splide__slide cursor-pointer">${slides}</li>`
      );
    });
    // add product cards to DOM
    productsDOM.innerHTML = cards;
  }
}
