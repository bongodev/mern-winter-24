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
