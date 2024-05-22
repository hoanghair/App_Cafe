import { z } from "zod";

export const OrderUpdateSchema = z.object({
  status: z.string(),
});

export type OrderUpdateType = z.infer<typeof OrderUpdateSchema>;

export type OrderDetailType = {
  data: {
    _id: string;
    status: string;
  };
};

export interface Root {
  _id: string;
  user: string;
  products: Product[];
  total: number;
  shippingAddress: string;
  phone: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  product: Product2;
  quantity: number;
  price: number;
  _id: string;
}

export interface Product2 {
  _id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  quantity: number;
  categoryId: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type OrderListType = {
  data: Root[];
};
