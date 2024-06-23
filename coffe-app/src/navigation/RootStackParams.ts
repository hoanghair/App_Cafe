import { AuthStackParams } from './AuthStack/AuthStackParams'
import { MainBottomTabParamList } from './BottomTabs/MainBottomTabParams'
import { CheckoutStackParams } from './CheckoutStack'
import { ProductStackParams } from './ProductStack'
import { SettingStackParams } from './ProfileStack/ProfileStackParams'

type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] }
}[keyof ParamList]

export type RootStackParamList = {
  AuthStack: NestedNavigatorParams<AuthStackParams>
  ProductStack: NestedNavigatorParams<ProductStackParams>
  BottomTabs: NestedNavigatorParams<MainBottomTabParamList>
  CheckoutStack: NestedNavigatorParams<CheckoutStackParams>
  ProfileStack: NestedNavigatorParams<SettingStackParams>
}
