export const validation = {
  required: (value: string): boolean => value.trim() !== '',
  min: (value: string, length: number): boolean => value.length >= length,
  email: (value: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  phone: (value: string): boolean =>
    /^(\d{10,11})$/.test(value.replace(/\D/g, "")),
  isAllowed: (value: string, allowedValues: string[]): boolean =>
    allowedValues.includes(value),
}