import { featuredProductSlider } from './utils/splideSlider';
// product cards section
const productsDOM = document.querySelector('#featured-products-cards');

export default class UI {
  // Display products
  static displayFeaturedProducts(products) {
    // declare empty card string
    let cards = '';

    // loop through 9 latest products from contentful
    for (let i = 0; i < 9; i += 1) {
      // destructure each object in products array
      // eslint-disable-next-line object-curly-newline
      const { title, price, id, image } = products[i];

      // add product cards to empty cards string
      cards += `
        <div data-id=${id} class="product-card cursor-pointer">
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
        `<li data-id=${id} class="splide__slide cursor-pointer">${slides}</li>`
      );
    }
    // add product cards to DOM
    productsDOM.innerHTML = cards;
  }
}
