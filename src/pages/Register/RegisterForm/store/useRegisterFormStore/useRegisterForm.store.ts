import { create } from 'zustand'
import { IRegisterFormStore } from './useRegisterForm.types'

const defaultValues = {
  name: '',
  email: '',
  password: '',
}

export const useRegisterFormStore = create<IRegisterFormStore>((set) => ({
  ...defaultValues,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  reset: () => set({ ...defaultValues }),
}))
