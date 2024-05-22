import { ApiClient, ApiClientUnAuth } from '../config/react-query'

export type ProductType = {
  _id: string
  name: string
  description: string
  price: number
  cost: number
  quantity: number
  categoryId: string
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type ProductListType = {
  data: ProductType[]
}

export type ProductDetailType = {
  data: ProductType
}

export type OrderInputType = {
  products: {
    productId: string
    quantity: number
  }[]
  shippingAddress: string
  phone: string
}

export interface Root {
  product: Product
  quantity: number
  price: number
  _id: string
}

export interface Product {
  quantity: number
  product: {
    _id: string
    name: string
    description: string
    price: number
    cost: number
    quantity: number
    categoryId: string
    image: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}

export type OrderHistoryType = {
  orders: {
    _id: string
    createdAt: string
    products: Product[]
    shippingAddress: string
    status: string
    total: number
  }[]
}

export const getProduct = async () => {
  try {
    const response = await ApiClientUnAuth.get<ProductListType>('/product')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getDetailProduct = async (id: string) => {
  try {
    const response = await ApiClientUnAuth.get<ProductDetailType>(`/product/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const orderProduct = async (data: OrderInputType) => {
  try {
    const response = await ApiClient.post<ProductDetailType>('/order', data)

    return response.config
  } catch (error) {
    throw error
  }
}
