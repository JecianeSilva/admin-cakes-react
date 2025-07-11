import { IUser } from "cakes-lib-types-js"
import { authorizedApi } from "../../services"
import { AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"

export async function getUserById(id: string): Promise<IUser> {
  const { data } = await authorizedApi.get(`/cakes-bff/users/${id}`)
  return data
}

export function useFetchUserById(id: string) {
  return useQuery<IUser, AxiosError>({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  })
}