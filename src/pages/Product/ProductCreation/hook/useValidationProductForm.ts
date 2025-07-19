import { useState } from "react";
import { validation } from "../../../../utils";

export interface IProductFormErrors {
  name: string;
  price: string;
  categoryId: string;
  status: string;
}

export function useValidationProductForm() {
  const defaultErrors: IProductFormErrors = {
    name: '',
    price: '',
    categoryId: '',
    status: '',
  };

  const [errors, setErrors] = useState<IProductFormErrors>(defaultErrors);

  function validate({ name, price, categoryId, status }: any): boolean {
    const newErrors: IProductFormErrors = { ...defaultErrors };

    if (!validation.required(name)) {
      newErrors.name = 'Campo obrigatório';
    }

    if (!validation.required(price)) {
      newErrors.price = 'Campo obrigatório';
    }

    if (!validation.required(categoryId)) {
      newErrors.categoryId = 'Campo obrigatório';
    }

    if (!validation.required(status)) {
      newErrors.status = 'Campo obrigatório';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === '');
  }

  return { validate, errors };
}