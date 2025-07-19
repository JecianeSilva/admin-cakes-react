import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { TPostSaveProductRequestBody, IPostSaveProductResponse } from 'cakes-lib-types-js'
import { authorizedApi } from 'src/services'

async function postProduct(body: TPostSaveProductRequestBody): Promise<IPostSaveProductResponse> {
  const { data } = await authorizedApi.post('/cakes-bff/product', body)
  return data
}

export function useFetchPostProduct() {
  return useMutation<IPostSaveProductResponse, AxiosError, TPostSaveProductRequestBody>({
    mutationFn: postProduct
  })
}
