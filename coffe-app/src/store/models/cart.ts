import { createModel } from '@rematch/core'
import { RootModel } from './root'

interface CartProps {
  _id: number
  quantity: number
  image: string
  name: string
  price: number
}

const state: CartProps[] = []

const reducers = {
  addCart: (state: CartProps[], payload: CartProps) => {
    const index = state.findIndex((product) => product._id === payload._id)
    if (index === -1) {
      return [...state, payload]
    }
    const newState = [...state]
    newState[index].quantity += 1
    return newState
  },
  removeCart: (state: CartProps[], payload: number) => {
    return state.filter((product) => product._id !== payload)
  },
  increaseQuantity: (state: CartProps[], payload: number) => {
    const index = state.findIndex((product) => product._id === payload)
    const newState = [...state]
    newState[index].quantity += 1
    return newState
  },
  decreaseQuantity: (state: CartProps[], payload: number) => {
    const index = state.findIndex((product) => product._id === payload)
    if (state[index].quantity === 1) {
      return state.filter((product) => product._id !== payload)
    }
    const newState = [...state]
    newState[index].quantity -= 1
    return newState
  },
  clearCart: () => {
    return []
  },
}

export const cart = createModel<RootModel>()({
  state,
  reducers,
})
