import { featuredProductSlider } from './utils/splideSlider';
import Storage from './utils/localStorage';
// product cards section
const productsDOM = document.querySelector('#featured-products-cards');
const saleProductsDOM = document.querySelector('#sale-cards-container');

export default class UI {
  // Display products
  static displayProducts(products) {
    // declare empty card string
    let featuredProductCards = '';
    let saleCards = '';

    // loop through 9 latest products from contentful
    for (let i = 0; i < 9; i += 1) {
      // destructure each object in products array
      // eslint-disable-next-line object-curly-newline
      const { title, price, id, image } = products[i];

      // add product cards to empty cards string
      featuredProductCards += `
        <div data-sale='false' data-id=${id} class="product-card cursor-pointer">
          <div class="border border-gray-300 h-96  overflow-hidden">
            <img class="object-center object-cover h-96 transform hover:scale-105 transition-transform duration-300" src="${image}"
              alt="image of featured product">
          </div>
          <h2 class="text-2xl">${title}</h2>
          <p class="text-xl text-gray-500">$${price}</p>
        </div>`;

      // add slides to empty slides string
      const slides = `
          <div class="splide__slide__container border border-gray-300 h-500px md:h-72 overflow-hidden">
            <img class="object-center object-cover h-500px md:h-72 transform hover:scale-105 transition-transform duration-300" src="${image}" alt="image of featured product">
          </div>
          <h2 class="text-2xl">${title}</h2>
          <p class="text-xl text-gray-500">$${price}</p>
        `;

      // add slides to splide slider
      featuredProductSlider.add(
        // eslint-disable-next-line comma-dangle
        `<li data-sale='false' data-id=${id} class="splide__slide cursor-pointer">${slides}</li>`
      );
    }

    for (let i = 9; i < 13; i += 1) {
      // eslint-disable-next-line object-curly-newline
      const { title, price, id, image } = products[i];

      // calculate sale price
      const salePrice = price - price * 0.2;

      // product cards with sale price
      saleCards += `
      <div data-sale='true' data-id=${id} class="product-card cursor-pointer w-full mb-12">
        <div class="border border-gray-300 h-96  overflow-hidden">
          <img class="object-center object-cover h-96 transform hover:scale-105 transition-transform duration-300"
          src="${image}" alt="image of featured product">
        </div>
        <h2 class="text-2xl">${title}</h2>
        <div class="flex justify-start items-center">
          <p class="text-xl text-red-500 mr-4">$${salePrice}</p>
          <p class="text-xl text-gray-500 line-through">$${price}</p>
        </div>
      </div>
      `;
    }

    // add featured product cards to DOM
    productsDOM.innerHTML = featuredProductCards;

    // add sale cards to DOM
    saleProductsDOM.innerHTML = saleCards;
  }
}
