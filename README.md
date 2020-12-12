# Wheels Landing Page

An E-Commerce web page for Felix's Footware shoe company built with HTML, Tailwind CSS, Javascript, Splide JS, Body scroll lock, Contentful CMS, and Webpack

View live project: https://ecommerce-yuvi.netlify.app/

### Features

- Mobile first design and responsive UI
- Connects to Contentful CMS
- Shopping cart functionality
- Local storage
- Modals with body scroll lock
- Form validation / form handling
- Dynamic javascript components
- ES6 Modules and Classes
- Full production build using Webpack

### What I learned

- Manage my assets using Contentful CMS
- Use Splide JS and Contentful CMS to create a featured products slider
- Object Oriented Programming using ES6 Classes
- Client side form validation
- Form handling using netlify

### Problems I faced

- Using body scroll lock library for the first time and having the wrong html element as an argument
  - The argument should be the element which should have scrolling enabled.
  
- Implementing a product sales section after the initial project design
  - I did the sales calculations client side after the products loaded from Contentful
  - I had to add different components based on if sales was `true` or `false`.
  
- Tailwind CSS purging with Webpack
  - I had to explicity set NODE_ENV in my npm scripts since I was using <a  href="https://webpack.js.org/guides/production/#specify-the-mode"  target="_blank">Webpack</a>.

# Available Scripts

In the project directory:

`npm start`
Runs the app in the development mode.
Open http://localhost:8080/ to view in the browser.

`npm run build`
Builds the web page for production to the `dist` folder.
This build includes all modules bundled, minified, and hashes included in the filenames.
