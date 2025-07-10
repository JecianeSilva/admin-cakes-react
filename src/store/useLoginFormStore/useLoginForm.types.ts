export interface ILoginFormStore {
  email: string
  password: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  reset: () => void
}