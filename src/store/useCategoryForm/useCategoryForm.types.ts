
export interface ICategoryForm {
  name: string;
  description?: string;
  image?: string;
  status: 'ACTIVATED' | 'DISABLED';
  setField: (field: keyof Omit<ICategoryForm, 'setField' | 'reset'>, value: any) => void;
  setAllFields: (data: Partial<Omit<ICategoryForm, 'setField' | 'reset' | 'setAllFields'>>) => void;
  reset: () => void;
}
