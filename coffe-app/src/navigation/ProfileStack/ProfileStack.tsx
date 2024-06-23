import { HistoryOrderScreen } from '@/screens/History'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS_KEY } from '../preset'
import { SettingStackParams } from './ProfileStackParams'

const ProfileScreens = [
  {
    name: SCREENS_KEY.SETTING.HISTORY_ORDER,
    component: HistoryOrderScreen,
    options: { headerShown: false },
  },
]

const Stack = createStackNavigator<SettingStackParams>()

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      {ProfileScreens.map((child) => (
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

export { ProfileStack }
