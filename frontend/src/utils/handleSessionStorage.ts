import type { ICartState, IProduct, IUser } from "../types";

export function getFromSessionStorage(key: string) {
  const dataInSessionStorage = sessionStorage.getItem(key)!;

  return JSON.parse(dataInSessionStorage);
}

export function setToSessionStorage(
  key: string,
  // value: string | number | boolean
  value: IUser | IProduct | ICartState
) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
