// stores/useProductFormStore.ts
import { create } from 'zustand'
import { IProductForm } from './useProductForm.types'

const defaultValues: Omit<IProductForm, 'setField' | 'reset'> = {
  name: '',
  price: '',
  description: '',
  categoryId: '',
  imageUrl: '',
  size: '',
  filling: '',
  dough: '',
  flavor: '',
  status: 'ACTIVATED',
};
export const useProductFormStore = create<IProductForm>((set) => ({
  ...defaultValues,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set({ ...defaultValues }),
}));
