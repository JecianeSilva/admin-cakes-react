import { create } from 'zustand'
import { ILoginFormStore } from './useLoginForm.types'

const defaultValues = {
  email: '',
  password: '',
}

export const useLoginFormStore = create<ILoginFormStore>((set) => ({
  ...defaultValues,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  reset: () => set({ ...defaultValues }),
}))
