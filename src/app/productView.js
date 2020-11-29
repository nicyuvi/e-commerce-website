export default class ProductView {
  static viewProduct() {
    // declare slides
    const slides = document.querySelectorAll('.splide__slide');

    // declare cards
    const cards = document.querySelectorAll('.product-card');

    // click event for each product slide
    slides.forEach((slide) => {
      slide.addEventListener('click', () => {
        console.log(slide.firstElementChild.nextElementSibling.innerHTML);
        console.log(slide.dataset.id);
      });
    });

    // click event for each product card
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        console.log(card.firstElementChild.nextElementSibling.innerHTML);
        console.log(card.dataset.id);
      });
    });
  }
}

// **NOTE: Add Event bubbling for both slides and cards**
