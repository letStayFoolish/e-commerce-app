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
  _id: ObjectId | string;
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  paidAt?: string;
  deliveredAt?: string;
  itemsPrice: string;
  orderItems: IProduct[];
  paymentMethod: "PayPal" | "" | string;
  shippingAddress: IShippingAddress;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  updatedAt: string;
  user: IUser;
  // paymentResult: PaymentResult;
}

export interface IOrderItem {
  _id: ObjectId;
  image: string;
  name: string;
  price: number;
  product: string;
  qty: number;
}

export interface PaymentResult {
  id: string | ObjectId;
  status: number;
  update_time: string;
  email_address: string;
}
