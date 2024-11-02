import express from 'express';
import { body } from 'express-validator';

import { productServices } from '../services/index.js';

const router = express.Router();

router.post(
  '/',
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

export { router as productRouter };
