import { Models } from '@rematch/core'
import { auth } from './auth'
import { cart } from './cart'

export interface RootModel extends Models<RootModel> {
  auth: typeof auth
  cart: typeof cart
}

export const models: RootModel = { auth, cart }
