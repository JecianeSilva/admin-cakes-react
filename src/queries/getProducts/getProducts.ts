import { authorizedApi } from 'src/services'
import { TGetProductQueryParams, TGetProductsResponse } from 'cakes-lib-types-js'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export async function getProducts(params?: TGetProductQueryParams) {
  const { data } = await authorizedApi.get(`/cakes-bff/product`)
  return data
}

export function useFetchProducts(params?: TGetProductQueryParams) {
  return useQuery<any,  AxiosError>({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  })
}
