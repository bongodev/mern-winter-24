import express from 'express';
import { body, validationResult } from 'express-validator';

import { userServices } from '../services/index.js';

const router = express.Router();

// create user
router.post(
  '/',
  [
    body('fname', 'First name is required').notEmpty(),
    body('lname', 'Last name is required').notEmpty(),
    body('email', 'Please enter a valid email').isEmail(),
    body('email', 'Email is required').notEmpty(),
    body('password', 'Password is required').notEmpty(),
    body('password', 'Password must be at least 8 characters long').isLength({
      min: 8,
    }),
    body(
      'password',
      'Password must contain at least one uppercase letter'
    ).matches('[A-Z]', 'g'),
    body(
      'password',
      'Password must contain at least one lowercase letter'
    ).matches('[a-z]', 'g'),
    body('password', 'Password must contain at least one number').matches(
      '[0-9]',
      'g'
    ),
    body('userType', 'userType is required').notEmpty(),
    body('userType', 'give a valid userType').isIn(['customer', 'admin']),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      } else {
        const user = await userServices.createUser({ userPayload: req.body });
        res.status(201).json(user);
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: error.message || 'User creation failed' });
    }
  }
);

export { router as userRouter };
