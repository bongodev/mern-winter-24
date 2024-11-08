import { authRouter } from './auth.js';
import { productRouter } from './products.js';
import { userRouter } from './users.js';

export const configureRoutes = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api', productRouter);
  app.use('/api/users', userRouter);
};
