
import { authorizedApi } from 'src/services'
import { ICategory } from 'cakes-lib-types-js'
import { useQuery } from '@tanstack/react-query'

export async function getCategoryById(id: string): Promise<ICategory> {
  const { data } = await authorizedApi.get(`/cakes-bff/category/${id}`);
  return data;
}

export function useFetchCategoryById(id: string) {
  return useQuery<ICategory, Error>({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  })
}