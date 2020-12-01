import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Storage from './utils/localStorage';

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
    console.log(product);

    const modalContent = `
    <img class="object-center object-cover h-96 lg:h-auto" src="${product.image}" alt="#"> 
    <div class="bg-gray-800 p-6">
      <h3 class="text-4xl text-center text-white font-bold mb-4">${product.title}</h3>
      <p class="text-xl text-white mb-4 text-center">${product.desc}</p>
      <p class ="text-xl text-white mb-4 text-center">$${product.price}</p>
      <div class="flex justify-center">
        <div id="modal-link" class="btn-light"><span>/</span> Add to Cart</div>
      </div>
    </div>`;

    productViewContent.innerHTML = modalContent;
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
