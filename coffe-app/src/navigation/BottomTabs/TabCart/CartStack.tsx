import { SCREENS_KEY } from '@/navigation/preset'
import { CartScreen } from '@/screens/Cart/CartScreen'
import { CheckoutScreen } from '@/screens/Cart/CheckoutScreen'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { CartStackParams } from './CartStackParams'

const ComingSoonScreens = [
  {
    name: SCREENS_KEY.CART.INDEX,
    component: CartScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.CART.CHECKOUT,
    component: CheckoutScreen,
    options: { headerShown: false },
  },
]

const HomeStack = createStackNavigator<CartStackParams>()

export function TabCart() {
  return (
    <HomeStack.Navigator>
      {ComingSoonScreens.map((child) => (
        <HomeStack.Screen
          key={child.name}
          name={child.name}
          component={child.component}
          options={child.options}
        />
      ))}
    </HomeStack.Navigator>
  )
}
