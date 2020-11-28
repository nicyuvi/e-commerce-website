// import main css
import './main.css';
// end import main css

// import splide.js css
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
// end import splide.js css

import Splide from '@splidejs/splide';
import { navBarRun } from './app/navBar';
// eslint-disable-next-line no-unused-vars
import domLoad from './app/domLoad';

// featured products
new Splide('#splide1', {
  perPage: 3,
  breakpoints: {
    768: {
      perPage: 1,
    },
  },
  rewind: true,
  gap: '2em',
}).mount();
// end featured products

// nav bar
navBarRun();
// end nav bar
