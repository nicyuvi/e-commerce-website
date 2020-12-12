import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// subscription modal
const subscriptionModal = document.querySelector('#subscription-view');
const subscriptionModalContent = document.querySelector(
  '#subscription-modal-content',
);
const subscriptionModalCloseBtn = document.querySelector(
  '#subscription-modal-close',
);
const subscriptionModalOverlay = document.querySelector(
  '#subscription-modal-overlay',
);

// subscription forms
const forms = document.querySelectorAll('form');

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
    }, 20000);
  }

  static closeSubscriptionModal() {
    // body scroll enable
    enableBodyScroll(subscriptionModalContent);
    subscriptionModal.classList.remove('opacity-100');
    subscriptionModal.classList.add('pointer-events-none');
  }

  // handle subscription form submit
  static subscriptionFormSubmit(e) {
    e.preventDefault();
    const myForm = e.target;
    const formData = new FormData(myForm);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        // eslint-disable-next-line operator-linebreak
        myForm.innerHTML =
          '<p class="text-2xl text-white">Thank you for your subscription!</p>';
      })
      .catch((error) => console.log(error));
  }

  // subscription form validation
  static subscriptionFormValidation() {
    // validate forms on submit
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        // prevent default form submit
        e.preventDefault();

        // form input value
        const inputValue = e.target.firstElementChild.nextElementSibling.value;

        // Verify email regex
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (emailRegex.test(inputValue) === false) {
          // eslint-disable-next-line operator-linebreak
          e.target.firstElementChild.innerHTML =
            '<p>Please enter a valid email address</p>';
        } else {
          // if input is valid then handle form
          this.subscriptionFormSubmit(e);
        }
      });
    });
  }
}
