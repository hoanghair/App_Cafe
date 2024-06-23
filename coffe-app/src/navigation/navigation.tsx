import { RootStore } from '@/store'
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack'
import { isEqual } from 'lodash'
import { useSelector } from 'react-redux'
import { AuthStack } from './AuthStack'
import { BottomTabs } from './BottomTabs'
import { CheckoutStack } from './CheckoutStack'
import { ProductStack } from './ProductStack'
import { ProfileStack } from './ProfileStack'
import { RootStackParamList } from './RootStackParams'

const RootStack = createStackNavigator<RootStackParamList>()
export type NavigationProp = StackNavigationProp<RootStackParamList>

const Navigation = () => {
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  if (!user) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false, presentation: 'card' }}>
        <RootStack.Screen name="BottomTabs" component={BottomTabs} />
        <RootStack.Screen name="AuthStack" component={AuthStack} />
        <RootStack.Screen name="ProductStack" component={ProductStack} />
      </RootStack.Navigator>
    )
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false, presentation: 'card' }}>
      <RootStack.Screen name="BottomTabs" component={BottomTabs} />
      <RootStack.Screen name="ProductStack" component={ProductStack} />
      <RootStack.Screen name="CheckoutStack" component={CheckoutStack} />
      <RootStack.Screen name="ProfileStack" component={ProfileStack} />
    </RootStack.Navigator>
  )
}

export { Navigation }
