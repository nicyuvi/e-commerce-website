import Splide from '@splidejs/splide';

// featured product slider
export const featuredProductSlider = new Splide('#featured-product-slider', {
  perPage: 3,
  breakpoints: {
    800: {
      perPage: 1,
    },
  },
  rewind: true,
  gap: '2em',
}).mount();
// end featured product slider

// collection slider
export const collectionSlider = new Splide('#collection-slider', {
  perPage: 2,
  breakpoints: {
    1280: {
      perPage: 1,
    },
  },
  rewind: true,
  gap: '2em',
}).mount();
// end collection slider
