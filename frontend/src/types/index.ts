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
  _id: ObjectId; // ObjectId
  name: string;
  image: string;
  origin: string;
  description: string;
  numReviews: number;
  price: number;
  countInStock: number;
  rating: number;
  category: string;
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
  _id?: ObjectId;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: "PayPal" | "" | string;
  itemsPrice: string;
  taxPrice: string;
  shippingPrice: string;
  totalPrice: string;

  createdAt?: string;
  isDelivered?: boolean;
  isPaid?: boolean;
  paidAt?: string;
  deliveredAt?: string;
  updatedAt?: string;
  user: string;
  // paymentResult: PaymentResult;
}

export interface IOrderItem {
  _id: ObjectId;
  image: string;
  name: string;
  price: number;
  product: ObjectId;
  qty?: number;
}

export interface PaymentResult {
  id: string | ObjectId;
  status: number;
  update_time: string;
  email_address: string;
}
