import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IPostRegisterResponse, TPostRegisterRequestBody } from "cakes-lib-types-js";
import { authenticationApi } from 'src/services'
async function register(body: TPostRegisterRequestBody) {
  const { data } = await authenticationApi.post('/cakes-bff/auth/register', body)
  return data
}

export function useFetchPostRegister() {
  return useMutation<IPostRegisterResponse, AxiosError, TPostRegisterRequestBody>({
      mutationFn: (body: TPostRegisterRequestBody) => register(body)
  })
}