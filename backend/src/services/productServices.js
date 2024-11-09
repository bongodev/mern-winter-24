import { Product } from '../models/index.js';

export const createProduct = async ({ productPayload }) => {
  const productObj = {
    name: productPayload.name,
    description: productPayload.description,
    madeIn: productPayload.madeIn,
    categories: productPayload.categories,
    price: parseInt(productPayload.price),
    quantity: parseInt(productPayload.quantity),
    // fileId: productPayload.fileId,
    // userId: userId,
  };
  const product = new Product(productObj);
  await product.save();
  return product;
};

export const getProducts = async (filters = []) => {
  let queries = {};
  if (filters.length) {
    queries = {
      $or: filters.map((filter) => ({ categories: filter })),
    };
  }
  const products = await Product.find(queries);
  return products;
};
