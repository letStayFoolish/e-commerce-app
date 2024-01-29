import { type IUser } from "../../../types";

export type AuthState = {
  // userInfo: boolean | string | null;
  userInfo: IUser | null;
};
