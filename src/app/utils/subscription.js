import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
// subscription modal
const subscriptionModal = document.querySelector('#subscription-view');
// subscription modal content
const subscriptionModalContent = document.querySelector(
  '#subscription-modal-content',
);
// subscription modal close btn
const subscriptionModalCloseBtn = document.querySelector(
  '#subscription-modal-close',
);
const subscriptionModalOverlay = document.querySelector(
  '#subscription-modal-overlay',
);

export default class Subscription {
  static displaySubscription() {
    setTimeout(() => {
      // scroll lock
      disableBodyScroll(subscriptionModalContent);

      // display subscription modal
      subscriptionModal.classList.add('opacity-100');
      subscriptionModal.classList.remove('pointer-events-none');

      // subscription modal close btn event
      subscriptionModalCloseBtn.addEventListener(
        'click',
        this.closeSubscriptionModal,
      );

      // subscription modal overlay event

      subscriptionModalOverlay.addEventListener(
        'click',
        this.closeSubscriptionModal,
      );
    }, 7000);
  }

  static closeSubscriptionModal() {
    // body scroll enable
    enableBodyScroll(subscriptionModalContent);
    subscriptionModal.classList.remove('opacity-100');
    subscriptionModal.classList.add('pointer-events-none');
  }
}
