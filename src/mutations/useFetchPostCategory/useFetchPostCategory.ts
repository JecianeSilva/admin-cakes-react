import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { IPostSaveCategoryResponse, TPostSaveCategoryRequestBody } from 'cakes-lib-types-js'
import { authorizedApi } from 'src/services'

async function postCategory(body: any): Promise<IPostSaveCategoryResponse> {
  const { data } = await authorizedApi.post('/cakes-bff/category', body)
  return data
}

export function useFetchPostCategory() {
  return useMutation<IPostSaveCategoryResponse, AxiosError, any>({
    mutationFn: postCategory
  })
}
