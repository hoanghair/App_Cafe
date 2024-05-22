import { CheckoutScreen } from '@/screens/Cart/CheckoutScreen'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS_KEY } from '../preset'
import { CheckoutStackParams } from './CheckoutStackParam'

const CheckoutStacks = [
  {
    name: SCREENS_KEY.CHECKOUT.INDEX,
    component: CheckoutScreen,
    options: { headerShown: false },
  },
]

const Stack = createStackNavigator<CheckoutStackParams>()

const CheckoutStack = () => {
  return (
    <Stack.Navigator>
      {CheckoutStacks.map((child) => (
        <Stack.Screen
          key={child.name}
          name={child.name}
          component={child.component}
          options={child.options}
        />
      ))}
    </Stack.Navigator>
  )
}

export { CheckoutStack }
