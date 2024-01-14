export function getFromLocalStorage(key: string) {
  return localStorage.getItem(key)!;
}

export function setToLocalStorage(
  key: string,
  value: string | number | boolean
) {
  localStorage.setItem(key, JSON.stringify(value));
}
