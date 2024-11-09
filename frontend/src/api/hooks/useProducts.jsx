import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getProducts } from '../services';

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
