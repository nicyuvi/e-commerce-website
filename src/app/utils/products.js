const contentful = require('contentful');
// connect to contentful api
const client = contentful.createClient({
  // contentful space id
  space: 'rhlqvymxqbwx',
  // access token for this space
  accessToken: 'CVctvbACw9sjKTHwYgO364JbgzdibW6L9CpLbP5FUUY',
});

// Get products from contentful
export default class Products {
  async getProducts() {
    try {
      //
      const contentfulEntries = await client.getEntries({
        content_type: 'ecommerceDemo',
      });

      const products = contentfulEntries.items;
      // eslint-disable-next-line no-console
      console.log(products);
      // eslint-disable-next-line no-console
      console.log('Hello Contentful');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
