export interface IProductForm {
  name: string;
  price: string;
  description: string;
  categoryId: string;
  imageUrl: string;
  size: string;
  filling: string;
  dough: string;
  flavor: string;
  status: 'ACTIVATED' | 'DISABLED';
  setField: (field: keyof Omit<IProductForm, 'setField' | 'reset'>, value: any) => void;
  reset: () => void;
}
