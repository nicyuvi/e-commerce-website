// body scroll lock
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const navSidebar = document.querySelector('#nav-sidebar');
const navOverlay = document.querySelector('#nav-overlay');
const hamBtn = document.querySelector('.hamBtn');

export function navBar() {
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

export function navBarRun() {
  hamBtn.addEventListener('click', navBar);
  navOverlay.addEventListener('click', navBar);
}
