import ComingSoonFocusedSvg from '@/assets/svg/coming-soon-focused.svg'
import ComingSoonSvg from '@/assets/svg/coming-soon.svg'
import HomeFocused from '@/assets/svg/home-focused.svg'
import Home from '@/assets/svg/home.svg'
import ProfileFocusedSvg from '@/assets/svg/profile-focused.svg'
import ProfileSvg from '@/assets/svg/profile.svg'
import { useAppTheme } from '@/libs/config/theme'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { BOTTOM_TABS_KEY } from '../preset'
import { MainBottomTabParamList } from './MainBottomTabParams'
import { TabCart } from './TabCart'
import { TabHome } from './TabHome'
import { TabProfile } from './TabSetting'

const Tab = createBottomTabNavigator<MainBottomTabParamList>()

type tabBarIconProps = {
  size: number
  focused: boolean
}

const BottomTabs = () => {
  const { colors } = useAppTheme()

  const tabs = [
    {
      name: BOTTOM_TABS_KEY.TAB_HOME,
      component: TabHome,
      options: {
        title: 'Sản phẩm',
        headerShown: false,
        tabBarIcon: ({ focused }: tabBarIconProps) =>
          focused ? (
            <HomeFocused width={25} height={25} color={colors.primary} />
          ) : (
            <Home width={25} height={25} color="black" />
          ),
      },
    },
    {
      name: BOTTOM_TABS_KEY.TAB_CART,
      component: TabCart,
      options: {
        title: 'Giỏ hàng',
        headerShown: false,
        tabBarIcon: ({ focused }: tabBarIconProps) =>
          focused ? (
            <ComingSoonFocusedSvg width={25} height={25} color={colors.primary} />
          ) : (
            <ComingSoonSvg width={25} height={25} color="black" />
          ),
      },
    },
    {
      name: BOTTOM_TABS_KEY.TAB_PROFILE,
      component: TabProfile,
      options: {
        title: 'Thông tin',
        headerShown: false,
        tabBarIcon: ({ focused }: tabBarIconProps) =>
          focused ? (
            <ProfileFocusedSvg width={25} height={25} color={colors.primary} />
          ) : (
            <ProfileSvg width={25} height={25} color="black" />
          ),
      },
    },
  ]

  return (
    <Tab.Navigator
      initialRouteName={BOTTOM_TABS_KEY.TAB_HOME}
      screenOptions={{
        tabBarShowLabel: true,
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            ...tab.options,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textGray,
            tabBarLabelStyle: {
              fontSize: 12,
            },
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export { BottomTabs }
