// stores/useProductFormStore.ts
import { create } from 'zustand'
import { IProductForm } from './useProductForm.types'

const defaultValues: Omit<IProductForm, 'setField' | 'reset' | 'setAllFields'> = {
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
  setAllFields: (data) => set((state) => ({ ...state, ...data })), 
  reset: () => set({ ...defaultValues }),
}));
