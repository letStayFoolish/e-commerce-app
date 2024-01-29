import { type IUser } from "../types";

export function getFromLocalStorage(key: string) {
  const dataInLocalStorage = localStorage.getItem(key)!;

  return JSON.parse(dataInLocalStorage);
}

export function setToLocalStorage(
  key: string,
  // value: string | number | boolean
  value: IUser
) {
  localStorage.setItem(key, JSON.stringify(value));
}
