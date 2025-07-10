import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IPostLoginResponse, TPostLoginRequestBody } from "cakes-lib-types-js";
import { authenticationApi } from 'src/services'
async function postLogin(body: TPostLoginRequestBody) {
  const { data } = await authenticationApi.post('/cakes-bff/auth/login', body)
  return data
}

export function useFetchPostLogin() {
  return useMutation<IPostLoginResponse, AxiosError, TPostLoginRequestBody>({
      mutationFn: (body: TPostLoginRequestBody) => postLogin(body)
  })
}