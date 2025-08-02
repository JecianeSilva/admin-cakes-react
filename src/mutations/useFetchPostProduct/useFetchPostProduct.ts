import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { TPostSaveProductRequestBody, IPostSaveProductResponse } from 'cakes-lib-types-js'
import { authorizedApi } from 'src/services'

type TPostProductVariables = {
  data: TPostSaveProductRequestBody;
  image?: File | null;
};

async function postProduct(variables: TPostProductVariables): Promise<IPostSaveProductResponse> {
  const { data, image } = variables;
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('price', String(data.price));
  formData.append('categoryId', data.categoryId);
  // formData.append('status', data.status || "ACTIVATED");

  if (data.description) formData.append('description', data.description);
  if (data.flavor) formData.append('flavor', data.flavor);
  if (data.size) formData.append('size', data.size);
  if (data.filling) formData.append('filling', data.filling);
  if (data.dough) formData.append('dough', data.dough);

  if (image) {
    formData.append('image', image);
  }

  const response = await authorizedApi.post('/cakes-bff/product', formData);
  return response.data;
}

export function useFetchPostProduct() {
  return useMutation<IPostSaveProductResponse, AxiosError, TPostProductVariables>({
    mutationFn: postProduct,
  });
}