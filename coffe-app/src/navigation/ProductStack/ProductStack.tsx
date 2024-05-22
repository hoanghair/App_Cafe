import { DetailProductScreen } from '@/screens/Home'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS_KEY } from '../preset'
import { ProductStackParams } from './ProductStackParams'

const ProductScreens = [
  {
    name: SCREENS_KEY.PRODUCT_DETAIL.INDEX,
    component: DetailProductScreen,
    options: { headerShown: false },
  },
]

const Stack = createStackNavigator<ProductStackParams>()

const ProductStack = () => {
  return (
    <Stack.Navigator>
      {ProductScreens.map((child) => (
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

export { ProductStack }
