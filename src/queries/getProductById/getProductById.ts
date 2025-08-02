
import { authorizedApi } from 'src/services'
import { IProduct } from 'cakes-lib-types-js'
import { useQuery } from '@tanstack/react-query'

export async function getProductById(id: string): Promise<IProduct> {
  const { data } = await authorizedApi.get(`/cakes-bff/product/${id}`)
  return data
}

export function useFetchProductById(id: string) {
  return useQuery<IProduct, Error>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}