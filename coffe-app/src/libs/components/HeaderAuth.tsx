import AvatarDefault from '@/assets/svg/avatar.svg'
import FavoriteSvg from '@/assets/svg/favorite.svg'
import { RootStore } from '@/store'
import { isEqual } from 'lodash'
import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useAppTheme } from '../config/theme'
import { flexBoxStyles, textStyles } from '../styles'
import FocusAwareStatusBar from './FocusAwareStatusBar'

const HeaderAuth = () => {
  const insets = useSafeAreaInsets()
  const { colors } = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  return (
    <View
      style={{
        paddingTop: Platform.select({
          ios: insets.top,
          android: StatusBar.currentHeight,
        }),
        zIndex: 1000,
      }}
    >
      <View>
        <FocusAwareStatusBar barStyle="light-content" translucent={true} />

        <View
          style={{
            paddingLeft: 24,
            paddingRight: 24,
            ...flexBoxStyles.flexRowSpace,
            height: Platform.OS === 'ios' ? 62 : 70,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <AvatarDefault width={40} height={40} />

            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  ...textStyles.content16,
                  color: colors.text,
                  fontWeight: '500',
                  marginBottom: 4,
                }}
              >
                Hello, {user?.username}
              </Text>

              <Text style={{ ...textStyles.text12_regular, color: colors.grey }}>
                Let’s stream your favorite movie
              </Text>
            </View>
          </View>

          <View style={styles.favorite}>
            <FavoriteSvg />
          </View>
        </View>
      </View>
    </View>
  )
}

export { HeaderAuth }

const styles = StyleSheet.create({
  favorite: {
    borderRadius: 12,
    backgroundColor: '#252836',
    padding: 6,
  },
})
