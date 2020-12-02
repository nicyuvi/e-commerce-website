import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Storage from './utils/localStorage';
import Cart from './cart';

const productViewContainer = document.querySelector('#product-view');
const productViewOverlay = document.querySelector('#modal-overlay');
const productViewCloseBtn = document.querySelector('#modal-close');
const productViewContent = document.querySelector('#modal-content');

export default class ProductView {
  // displays product modal
  static viewProductModal() {
    if (productViewOverlay.classList.contains('active')) {
      // scroll lock
      disableBodyScroll('#body');
      // display product view container
      productViewContainer.classList.add('opacity-100');
      productViewOverlay.classList.remove('active');
      // disable pointer events on body
      productViewContainer.classList.remove('pointer-events-none');
    } else {
      // scroll enable
      enableBodyScroll('#body');
      productViewContainer.classList.remove('opacity-100');
      productViewOverlay.classList.add('active');
      productViewContainer.classList.add('pointer-events-none');
    }
  }

  // displays product content inside modal
  static viewProduct(item) {
    const { id } = item.dataset;
    const product = { ...Storage.getProduct(id) };

    const modalContent = `
    <div class="lg:w-1/2">
      <img class="object-center object-cover h-96" src="${product.image}" alt="#"> 
    </div>
    <div class="bg-gray-800 text-white text-center lg:text-right p-6 lg:w-1/2">
      <h3 class="text-4xl font-bold mb-4">${product.title}</h3>
      <p class="text-xl mb-4">${product.desc}</p>
      <p class ="text-xl mb-4">$${product.price}</p>
      <div class="flex justify-center lg:justify-end">
        <button id="cart-btn" data-id=${id} class="btn-light"><span>/</span> Add to Cart</button>
      </div>
    </div>`;

    // inject modal content in DOM
    productViewContent.innerHTML = modalContent;

    // get cart buttons from DOM
    Cart.getCartButtons(id, productViewContent);
  }

  // product click event method
  static clickProduct() {
    // declare slides
    const slides = document.querySelectorAll('.splide__slide');
    // declare cards
    const cards = document.querySelectorAll('.product-card');

    // click event for each slide
    slides.forEach((slide) => {
      slide.addEventListener('click', () => {
        ProductView.viewProductModal();
        ProductView.viewProduct(slide);
      });
    });

    // click event for each product card
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        ProductView.viewProductModal();
        ProductView.viewProduct(card);
      });
    });

    // click event for close btn
    productViewCloseBtn.addEventListener('click', () => {
      ProductView.viewProductModal();
    });

    // click event for overlay
    productViewOverlay.addEventListener('click', () => {
      ProductView.viewProductModal();
    });
  }
}

// **NOTE: Add Event bubbling for both slides and cards**
