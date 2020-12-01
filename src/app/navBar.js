// body scroll lock
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// nav sidebar
const navSidebar = document.querySelector('#nav-sidebar');
const navOverlay = document.querySelector('#nav-overlay');
const hamBtn = document.querySelector('.hamBtn');

// cart sidebar
const cartBtn = document.querySelectorAll('.cart-btn');
const cartSidebar = document.querySelector('#cart-sidebar');
const cartOverlay = document.querySelector('#cart-overlay');

function toggleNavSidebar() {
  // had to replace 'toggle' with 'add/remove' to make use of body scroll lock library
  if (navOverlay.classList.contains('active')) {
    // scroll lock
    disableBodyScroll('#body');
    // sidebar slide in
    navSidebar.classList.remove('-translate-x-full');
    // display overlay
    navOverlay.classList.remove('hidden');
    navOverlay.classList.remove('active');
    // change bars to X
    hamBtn.firstElementChild.classList.add('hidden');
    hamBtn.lastElementChild.classList.remove('hidden');
  } else {
    // scroll enable
    enableBodyScroll('#body');
    // sidebar slide out
    navSidebar.classList.add('-translate-x-full');
    // hide overlay
    navOverlay.classList.add('hidden');
    navOverlay.classList.add('active');
    // change X to bars
    hamBtn.firstElementChild.classList.remove('hidden');
    hamBtn.lastElementChild.classList.add('hidden');
  }
}

function toggleCartSidebar() {
  if (cartOverlay.classList.contains('active')) {
    // scroll lock
    disableBodyScroll('#body');
    // sidebar slide in
    cartSidebar.classList.remove('translate-x-full');
    // display overlay
    cartOverlay.classList.remove('hidden');
    cartOverlay.classList.remove('active');
  } else {
    // scroll enable
    enableBodyScroll('#body');
    // sidebar slide out
    cartSidebar.classList.add('translate-x-full');
    // hide overlay
    cartOverlay.classList.add('hidden');
    cartOverlay.classList.add('active');
  }
}

export default () => {
  hamBtn.addEventListener('click', () => {
    toggleNavSidebar();
    if (!cartSidebar.classList.contains('translate-x-full')) {
      toggleCartSidebar();
    }
  });
  navOverlay.addEventListener('click', toggleNavSidebar);

  cartBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleCartSidebar();
      if (!navSidebar.classList.contains('-translate-x-full')) {
        toggleNavSidebar();
      }
    });
  });
  cartOverlay.addEventListener('click', toggleCartSidebar);
};
