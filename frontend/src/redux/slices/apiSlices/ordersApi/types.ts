import { IOrder } from "../../../../types";

export type getAllOrdersQuery = {
  orders: IOrder[];
  page: number;
  pages: number;
};
