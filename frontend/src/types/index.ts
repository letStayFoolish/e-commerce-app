import { ObjectId } from "mongoose";

export interface ICartState {
  cartItems: IProduct[];
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  shippingAddress: IShippingAddress;
  paymentMethod: string;
}
export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  qty?: number;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface IOrder {
  _id: ObjectId;
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  itemsPrice: number;
  orderItems: IOrderItem[];
  paymentMethod: "PayPal" | "";
  shippingAddress: IShippingAddress;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  updatedAt: string;
  user: IUser;
}

export interface IOrderItem {
  _id: ObjectId;
  image: string;
  name: string;
  price: number;
  product: string;
  qty: number;
}
