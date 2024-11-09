import { productServices } from '../services/index.js';

export const createProduct = async (req, res) => {
  try {
    const product = await productServices.createProduct({
      productPayload: req.body,
    });
    res.status(201).json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || 'Product creation failed' });
  }
};

export const getProducts = async (req, res) => {
  const { category } = req.query;
  let filters = [];
  if (typeof category === 'string') {
    filters = [category.toLowerCase()];
  } else if (Array.isArray(category) && category.length) {
    filters = category.map((category) => category.toLowerCase());
  }

  const products = await productServices.getProducts(filters);
  return res.json(products);
};
