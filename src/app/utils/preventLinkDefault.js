/* Prevent Link scroll to top default for empty href value */
export default () => {
  // Select all links
  const links = document.querySelectorAll('a');

  // loop through each link and add preventDefault()
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
  });
};
/* End Prevent Link scroll to top default */
