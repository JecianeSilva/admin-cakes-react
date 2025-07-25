import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ICategory, TPutCategoryRequestBody } from 'cakes-lib-types-js';
import { authorizedApi } from 'src/services';

type TUpdateCategoryVariables = {
  id: string;
  data: TPutCategoryRequestBody;
  image?: File | null;
};

async function updateCategory(
  variables: TUpdateCategoryVariables,
): Promise<ICategory> {
  const { id, data, image } = variables;
  
  const formData = new FormData();

  if (data.name) {
    formData.append('name', data.name);
  }
  if (data.description) {
    formData.append('description', data.description);
  }

  if (image) {
    formData.append('image', image);
  }

  const response = await authorizedApi.put(
    `/cakes-bff/category/${id}`,
    formData,
  );
  
  return response.data;
}

export function useFetchPutCategory() { 
  const queryClient = useQueryClient();

  return useMutation<
    ICategory,
    AxiosError, 
    TUpdateCategoryVariables 
  >({
    mutationFn: updateCategory,
    onSuccess: (updatedCategory) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.setQueryData(['category', updatedCategory.id], updatedCategory);
    },
  });
}