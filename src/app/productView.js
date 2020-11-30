import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const productViewContainer = document.querySelector('#product-view');
const productViewOverlay = document.querySelector('#modal-overlay');
const productViewClose = document.querySelector('#modal-close');

export default class ProductView {
  static viewProduct() {
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

  static clickProduct() {
    // declare slides
    const slides = document.querySelectorAll('.splide__slide');
    // declare cards
    const cards = document.querySelectorAll('.product-card');

    // click event for each slide
    slides.forEach((slide) => {
      slide.addEventListener('click', () => {
        ProductView.viewProduct();
      });
    });

    // click event for each product card
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        ProductView.viewProduct();
      });
    });

    // click event for close btn
    productViewClose.addEventListener('click', () => {
      ProductView.viewProduct();
    });

    // click event for overlay
    productViewOverlay.addEventListener('click', () => {
      ProductView.viewProduct();
    });
  }
}

// **NOTE: Add Event bubbling for both slides and cards**
