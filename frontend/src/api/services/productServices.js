import { http } from '../../common/http';

export const getProducts = async (queries) => {
  const res = await http.get(`/api/products?${queries}`);
  return res.data;
};

export const addProduct = (product) => http.post('/api/products', product);

export const updateProduct = (productId, product) =>
  http.put(`/api/products/${productId}`, product);
