const contentful = require('contentful');
// connect to contentful api
const client = contentful.createClient({
  // contentful space id
  space: 'rhlqvymxqbwx',
  // access token for this space
  accessToken: 'CVctvbACw9sjKTHwYgO364JbgzdibW6L9CpLbP5FUUY',
});

// Get products from contentful
export default async () => {
  try {
    // Assign response from contentful 'ecommerceDemo' space to response
    const response = await client.getEntries({
      content_type: 'ecommerceDemo',
    });
    // Assign response items to products
    const products = response.items;
    // eslint-disable-next-line no-console
    console.log(products);
    // eslint-disable-next-line no-console
    console.log('Hello Contentful');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
