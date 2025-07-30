import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IProduct, TPutProductRequestBody } from 'cakes-lib-types-js';
import { authorizedApi } from 'src/services';

type TUpdateProductVariables = {
  id: string;
  data: TPutProductRequestBody;
  image?: File | null;
};

async function updateProduct(variables: TUpdateProductVariables): Promise<IProduct> {
  const { id, data, image } = variables;
  const formData = new FormData();

  if (data.name) formData.append('name', data.name);
  if (data.price) formData.append('price', String(data.price));
  if (data.categoryId) formData.append('categoryId', data.categoryId);
  if (data.status) formData.append('status', data.status);
  if (data.description) formData.append('description', data.description);
  if (data.size) formData.append('size', data.size);
  if (data.filling) formData.append('filling', data.filling);
  if (data.dough) formData.append('dough', data.dough);
  if (data.flavor) formData.append('flavor', data.flavor);

  if (image) {
    formData.append('image', image);
  }

  const response = await authorizedApi.put(`/cakes-bff/product/${id}`, formData);
  return response.data;
}

export function useFetchPutProduct() {
  return useMutation<IProduct, AxiosError, TUpdateProductVariables>({
    mutationFn: updateProduct,
  });
}