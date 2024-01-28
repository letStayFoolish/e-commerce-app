import { type IUser } from "../types";

export function getFromLocalStorage(key: string) {
  return localStorage.getItem(key)!;
}

export function setToLocalStorage(
  key: string,
  // value: string | number | boolean
  value: IUser
) {
  localStorage.setItem(key, JSON.stringify(value));
}
