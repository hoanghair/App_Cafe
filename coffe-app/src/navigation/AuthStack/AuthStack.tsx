import { SignInScreen } from '@/screens/Auth/SignIn'
import { SignUpScreen } from '@/screens/Auth/SignUp'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS_KEY } from '../preset'
import { AuthStackParams } from './AuthStackParams'

const AuthScreens = [
  {
    name: SCREENS_KEY.SIGN_IN.INDEX,
    component: SignInScreen,
    options: { headerShown: false },
  },
  {
    name: SCREENS_KEY.SIGN_UP.INDEX,
    component: SignUpScreen,
    options: { headerShown: false },
  },
]

const Stack = createStackNavigator<AuthStackParams>()

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS_KEY.SIGN_IN.INDEX}>
      {AuthScreens.map((child) => (
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

export { AuthStack }
