import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IPostSaveCategoryResponse, TPostSaveCategoryRequestBody } from 'cakes-lib-types-js';
import { authorizedApi } from 'src/services';

type TPostCategoryVariables = {
  data: TPostSaveCategoryRequestBody;
  image?: File | null;
};

async function postCategory(variables: TPostCategoryVariables): Promise<IPostSaveCategoryResponse> {
  const { data, image } = variables;
  const formData = new FormData();

  formData.append('name', data.name);
  if (data.description) {
    formData.append('description', data.description);
  }
  if (image) {
    formData.append('image', image);
  }

  const response = await authorizedApi.post('/cakes-bff/category', formData);
  return response.data;
}

export function useFetchPostCategory() {
  return useMutation<IPostSaveCategoryResponse, AxiosError, TPostCategoryVariables>({
    mutationFn: postCategory,
  });
}