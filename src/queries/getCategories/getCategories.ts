import { authorizedApi } from 'src/services'
import { TGetCategoriesQueryParam, TGetCategoriesResponse } from 'cakes-lib-types-js'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export async function getCategories(params?: TGetCategoriesQueryParam): Promise<TGetCategoriesResponse> {
  const { data } = await authorizedApi.get(`/cakes-bff/category`, { params })
  return data
}

export function useFetchCategories(params?: TGetCategoriesQueryParam) {
  return useQuery<TGetCategoriesResponse, AxiosError>({
    queryKey: ['categories', params],
    queryFn: () => getCategories(params),
  })
}
