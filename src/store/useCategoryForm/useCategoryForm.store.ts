// stores/useProductFormStore.ts
import { create } from 'zustand'
import { ICategoryForm } from './useCategoryForm.types'

const defaultValues: Omit<ICategoryForm, 'setField' | 'reset'> = {
  name: '',
  description: '',
  imageUrl: '',
  status: 'ACTIVATED',
};
export const useCategoryFormStore = create<ICategoryForm>((set) => ({
  ...defaultValues,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setAllFields: (data) => set((state) => ({ ...state, ...data })), 
  reset: () => set({ ...defaultValues }),
}));
