// import main css
import './main.css';
// end import main css

// import splide.js css
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
// end import splide.js css

import 'regenerator-runtime/runtime';
import preventLinkDefault from './app/utils/preventLinkDefault';
import { navBarRun } from './app/navBar';
// eslint-disable-next-line no-unused-vars
import domLoad from './app/domLoad';

navBarRun();
preventLinkDefault();
