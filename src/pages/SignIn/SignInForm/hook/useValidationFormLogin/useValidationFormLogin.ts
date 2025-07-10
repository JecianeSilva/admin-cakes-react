import { useState } from 'react'
import { ILoginFormErrors } from './useValidationFormLogin.types'
import { validation } from '../../../../../utils/validation/validation'
export function useValidationFormLogin() {
  const defaultErrors: ILoginFormErrors = {
    email: '',
    password: '',
  }

  const [errors, setErrors] = useState<ILoginFormErrors>(defaultErrors)

  function validate({ email, password }: ILoginFormErrors): boolean {
    const newErrors: ILoginFormErrors = { ...defaultErrors }

    if (!validation.required(email)) {
      newErrors.email = 'Campo obrigatório'
    } else if (!validation.email(email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!validation.required(password)) {
      newErrors.password = 'Campo obrigatório'
    } else if (!validation.min(password, 8)) {
      newErrors.password = 'Mínimo de 8 caracteres'
    }

    setErrors(newErrors)

    return Object.values(newErrors).every((err) => err === '')
  }

  return { validate, errors }
}
