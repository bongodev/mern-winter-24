import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addProduct, getProducts, updateProduct } from '../services';

const PRODUCTS_QUERY_KEY = 'PRODUCTS_QUERY_KEY';

export const useProducts = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const queryString = selectedCategories
    .map((category) => `category=${category.toLowerCase()}`)
    .join('&');

  const query = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, ...selectedCategories],
    queryFn: () => getProducts(queryString),
  });

  return {
    error: query.error,
    isLoading: query.isPending,
    products: query.data,
    selectedCategories,
    setSelectedCategories,
  };
};

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const handleProductMutation = (product) => {
    if (Boolean(product.id)) {
      return updateProduct(product.id, product);
    }
    return addProduct(product);
  };

  const mutation = useMutation({
    mutationFn: handleProductMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
    },
  });

  return {
    productMutation: mutation,
  };
};
