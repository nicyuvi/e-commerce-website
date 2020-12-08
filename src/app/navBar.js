// body scroll lock
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// nav sidebar
const navSidebar = document.querySelector('#nav-sidebar');
const hamBtn = document.querySelector('.hamBtn');
const navLink = document.querySelectorAll('#nav-link');

// cart sidebar
const cartBtn = document.querySelectorAll('.cart-btn');
const cartSidebar = document.querySelector('#cart-sidebar');
const cartOverlay = document.querySelector('#cart-overlay');

// Media query
const mediaQuery = '(min-width: 640px)';
const mediaQueryList = window.matchMedia(mediaQuery);

function toggleNavSidebar() {
  // had to replace 'toggle' with 'add/remove' to make use of body scroll lock library
  if (navSidebar.classList.contains('-translate-x-full')) {
    // scroll lock
    disableBodyScroll(navSidebar);
    // sidebar slide in
    navSidebar.classList.remove('-translate-x-full');
    // change bars to X
    hamBtn.firstElementChild.classList.add('hidden');
    hamBtn.lastElementChild.classList.remove('hidden');
  } else {
    // scroll enable
    enableBodyScroll(navSidebar);
    // sidebar slide out
    navSidebar.classList.add('-translate-x-full');
    // change X to bars
    hamBtn.firstElementChild.classList.remove('hidden');
    hamBtn.lastElementChild.classList.add('hidden');
  }
}

export function toggleCartSidebar() {
  if (cartOverlay.classList.contains('active')) {
    // scroll lock
    disableBodyScroll(cartSidebar);
    // sidebar slide in
    cartSidebar.classList.remove('translate-x-full');
    // display overlay
    cartOverlay.classList.remove('hidden');
    cartOverlay.classList.remove('active');
  } else {
    // scroll enable
    enableBodyScroll(cartSidebar);
    // sidebar slide out
    cartSidebar.classList.add('translate-x-full');
    // hide overlay
    cartOverlay.classList.add('hidden');
    cartOverlay.classList.add('active');
  }
}

// remove scroll lock from mobile to tablet view
function removeScrollLock(e) {
  if (e.matches) {
    // when nav sidebar is hidden we enable body scroll
    enableBodyScroll(navSidebar);
  } else if (!navSidebar.classList.contains('-translate-x-full')) {
    // we only disable body scroll if navsidebar is already open from tablet to mobile view
    disableBodyScroll(navSidebar);
  }
}

export default () => {
  // nav sidebar toggle
  hamBtn.addEventListener('click', () => {
    toggleNavSidebar();
    if (!cartSidebar.classList.contains('translate-x-full')) {
      toggleCartSidebar();
    }
  });

  // close nav bar on sidebar link click
  navLink.forEach((link) => {
    link.addEventListener('click', () => {
      toggleNavSidebar();
    });
  });

  // cart sidebar toggle
  cartBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleCartSidebar();
      if (!navSidebar.classList.contains('-translate-x-full')) {
        toggleNavSidebar();
      }
    });
  });
  // close cart on overlay click
  cartOverlay.addEventListener('click', toggleCartSidebar);

  // clear/enable body scroll lock from mobile to tablet view or vice versa
  mediaQueryList.addEventListener('change', removeScrollLock);
};
