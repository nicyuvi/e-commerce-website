const contentful = require('contentful');
// connect to contentful api
const client = contentful.createClient({
  // contentful space id
  space: 'rhlqvymxqbwx',
  // access token for this space
  accessToken: 'CVctvbACw9sjKTHwYgO364JbgzdibW6L9CpLbP5FUUY',
});

// Get products from contentful
// eslint-disable-next-line consistent-return
export default async () => {
  try {
    // Assign response from contentful 'ecommerceDemo' space to response
    const response = await client.getEntries({
      content_type: 'ecommerceDemo',
    });
    // Assign response items to products
    let products = response.items;
    products = products.map((item) => {
      // destructure
      const { title, price, desc } = item.fields;
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      // return a clean product object
      return {
        title,
        price,
        desc,
        id,
        image,
      };
    });
    console.log(products);
    // return array of products
    return products;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
