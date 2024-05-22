import { SCREENS_KEY } from '@/navigation/preset'
import { HistoryOrderScreen } from '@/screens/History'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HistoryOrderStackParams } from './HistoryOrderStackParams'

const FoodScreens = [
  {
    name: SCREENS_KEY.HISTORY_ORDER.INDEX,
    component: HistoryOrderScreen,
    options: { headerShown: false },
  },
]

const FoodStack = createStackNavigator<HistoryOrderStackParams>()

export function TabFood() {
  return (
    <FoodStack.Navigator>
      {FoodScreens.map((child) => (
        <FoodStack.Screen
          key={child.name}
          name={child.name}
          component={child.component}
          options={child.options}
        />
      ))}
    </FoodStack.Navigator>
  )
}
