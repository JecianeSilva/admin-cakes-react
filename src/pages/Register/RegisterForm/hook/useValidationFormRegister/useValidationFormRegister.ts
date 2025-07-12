import { useState } from 'react'
import { IRegisterFormErrors } from './useValidationFormRegister.types'
import { validation } from '../../../../../utils/validation/validation'
export function useValidationFormRegister() {
  const defaultErrors: IRegisterFormErrors = {
    name: '',
    email: '',
    password: '',
  }

  const [errors, setErrors] = useState<IRegisterFormErrors>(defaultErrors)

  function validate({ name, email, password }: IRegisterFormErrors): boolean {
    const newErrors: IRegisterFormErrors = { ...defaultErrors }

    if (!validation.required(email)) {
      newErrors.email = 'Campo obrigatório'
    } else if (!validation.email(email)) {
      newErrors.email = 'E-mail inválido'
    }

     if (!validation.required(name)) {
      newErrors.name = 'Campo obrigatório'
    } else if (!validation.min(name, 3)) {
      newErrors.name = 'Mínimo de 3 caracteres'
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
