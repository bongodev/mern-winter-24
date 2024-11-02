import { productRouter } from './products.js';

export const configureRoutes = (app) => {
  app.use('/api/v2/products', productRouter);
};
