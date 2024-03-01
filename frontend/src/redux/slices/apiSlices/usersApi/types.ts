import { IUser } from "../../../../types";

export type getUsersQuery = {
  users: IUser[];
  page: number;
  pages: number;
};
