import { SCREENS_KEY } from '@/navigation/preset'
import { DetailProductScreen, HomeScreen } from '@/screens/Home'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeStackParams } from './HomeStackParams'

const HomeScreens = [
  {
    name: SCREENS_KEY.HOME.INDEX,
    component: HomeScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.HOME.DETAIL_PRODUCT,
    component: DetailProductScreen,
    options: { headerShown: false },
  },
]

const HomeStack = createStackNavigator<HomeStackParams>()

export function TabHome() {
  return (
    <HomeStack.Navigator>
      {HomeScreens.map((child) => (
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
