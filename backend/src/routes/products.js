import express from 'express';
import { body } from 'express-validator';

import { productServices } from '../services/index.js';

const router = express.Router();

router.post(
  '/v2/products',
  [
    body('name', 'name is required').notEmpty(),
    body('price', 'price is required').notEmpty(),
    body('price', 'price must be numeric').isNumeric(),
    body('quantity', 'quantity is required').notEmpty(),
    body('quantity', 'quantity must be numeric').isNumeric(),
  ],
  async (req, res) => {
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
  }
);

// In-memory array to store products
let products = [
  {
    id: 1,
    name: 'Gaming Laptop',
    quantity: 10,
    price: 1500,
    image: 'https://via.placeholder.com/150',
    categories: ['Laptops', 'Gaming'],
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    quantity: 10,
    price: 50,
    image: 'https://via.placeholder.com/150',
    categories: ['Accessories', 'Peripherals'],
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    quantity: 10,
    price: 100,
    image: 'https://via.placeholder.com/150',
    categories: ['Accessories', 'Peripherals'],
  },
  {
    id: 4,
    name: 'External Hard Drive',
    quantity: 10,
    price: 120,
    image: 'https://via.placeholder.com/150',
    categories: ['Storage', 'Accessories'],
  },
  {
    id: 5,
    name: 'Graphics Card',
    quantity: 10,
    price: 500,
    image: 'https://via.placeholder.com/150',
    categories: ['Components', 'Gaming'],
  },
  {
    id: 6,
    name: 'Portable SSD',
    quantity: 10,
    price: 200,
    image: 'https://via.placeholder.com/150',
    categories: ['Storage', 'Accessories'],
  },
  {
    id: 7,
    name: 'Gaming Monitor',
    quantity: 10,
    price: 300,
    image: 'https://via.placeholder.com/150',
    categories: ['Monitors', 'Gaming'],
  },
  {
    id: 8,
    name: 'All-in-One Printer',
    quantity: 10,
    price: 150,
    image: 'https://via.placeholder.com/150',
    categories: ['Peripherals', 'Printers'],
  },
];

// Get all products
router.get('/products', (req, res) => {
  const { category } = req.query;
  let filters = [];
  if (typeof category === 'string') {
    filters = [category.toLowerCase()];
  } else if (Array.isArray(category) && category.length) {
    filters = category.map((category) => category.toLowerCase());
  }
  if (!filters.length) {
    res.json(products);
  }
  res.json(
    products.filter((product) =>
      product.categories.some((category) =>
        filters.includes(category.toLowerCase())
      )
    )
  );
});

// Get a product by ID
router.get('/products/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// Create a new product
router.post('/products', (req, res) => {
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    vendor: req.body.vendor,
    category: req.body.category,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update an existing product
router.put('/products/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });

  product.name = req.body.name || product.name;
  product.quantity = req.body.quantity || product.quantity;
  product.price = req.body.price || product.price;
  product.vendor = req.body.vendor || product.vendor;
  product.category = req.body.category || product.category;

  res.json(product);
});

// Delete a product
router.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1)
    return res.status(404).json({ message: 'Product not found' });

  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct);
});

// Search for products
router.get('/search', (req, res) => {
  const { name, vendor, category } = req.query;
  let filteredProducts = products;

  if (name) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (vendor) {
    filteredProducts = filteredProducts.filter((product) =>
      product.vendor.toLowerCase().includes(vendor.toLowerCase())
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter((product) =>
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  res.json(filteredProducts);
});


export { router as productRouter };
