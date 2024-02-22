import mongoose from "mongoose";

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
  _id: mongoose.Schema.Types.ObjectId;
  user: IUser;
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

export interface IUpdatedProduct {
  _id: string;
  name: string;
  description: string;
  origin: string;
  category: string;
  image: string;
  price: number;
  countInStock: number;
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
  _id?: mongoose.Schema.Types.ObjectId;
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
  user: IUser;
  // paymentResult: PaymentResult;
}

export interface IOrderItem {
  _id: mongoose.Schema.Types.ObjectId;
  image: string;
  name: string;
  price: number;
  product: mongoose.Schema.Types.ObjectId;
  qty?: number;
}

export interface PaymentResult {
  id: string | mongoose.Schema.Types.ObjectId;
  status: number;
  update_time: string;
  email_address: string;
}
