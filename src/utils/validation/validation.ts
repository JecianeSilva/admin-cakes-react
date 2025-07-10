export const validation = {
  required: (value: string): boolean => value.trim() !== '',
  min: (value: string, length: number): boolean => value.length >= length,
  email: (value: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
}