export function getLocalStorage<T = string>(key: string): T | null {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error)
    return null
  }
}