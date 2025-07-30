  import { useState } from "react";
  import { validation } from "../../../../utils";

  export interface ICategoryFormErrors {
    name: string;
    status: string;
  }

  export function useValidationCategoryForm() {
    const defaultErrors: ICategoryFormErrors = {
      name: '',
      status: '',
    };

    const [errors, setErrors] = useState<ICategoryFormErrors>(defaultErrors);

    function validate({ name, status }: any): boolean {
      const newErrors: ICategoryFormErrors = { ...defaultErrors };

      if (!validation.required(name)) {
        newErrors.name = 'Campo obrigatório';
      }
      if (status && !validation.isAllowed(status, ['ACTIVATED', 'DISABLED'])) {
        newErrors.status = 'O status deve ser "Ativo" ou "Desativado".';
      }

      setErrors(newErrors);
      return Object.values(newErrors).every((err) => err === '');
    }

    return { validate, errors };
  }