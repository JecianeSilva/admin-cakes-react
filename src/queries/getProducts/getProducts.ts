import { authorizedApi } from 'src/services'
import { TGetProductQueryParam, TGetProductsResponse } from 'cakes-lib-types-js'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export async function getProducts(params?: TGetProductQueryParam): Promise<TGetProductsResponse> {
  const { data } = await authorizedApi.get(`/cakes-bff/product`)
  return data
}

export function useFetchProducts(params?: TGetProductQueryParam) {
  return useQuery<TGetProductsResponse, AxiosError>({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  })
}
