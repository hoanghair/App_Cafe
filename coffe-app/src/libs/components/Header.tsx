import ArrowBackSvg from '@/assets/svg/arrow-back.svg'
import { useNavigation } from '@react-navigation/native'
import { truncate } from 'lodash'
import React from 'react'
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppTheme } from '../config/theme'
import FocusAwareStatusBar from './FocusAwareStatusBar'

type Props = {
  title?: string
  isTitleCenter?: boolean
  hideHeaderLeft?: boolean
  left?: JSX.Element
  right?: JSX.Element
  children?: JSX.Element
  customFuncBack?: () => void
}

const Header: React.FC<Props> = ({
  title,
  isTitleCenter = true,
  hideHeaderLeft = false,
  right,
  left,
  children,
  customFuncBack,
}) => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const { colors } = useAppTheme()

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
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 10,
            height: Platform.OS === 'ios' ? 52 : 60,
            borderBottomColor: colors.borderBack,
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              alignItems: isTitleCenter ? 'center' : 'flex-start',
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            {!hideHeaderLeft && (
              <View style={styles.left}>
                {left || (
                  <TouchableOpacity
                    style={{
                      paddingRight: 10,
                      paddingVertical: 10,
                    }}
                    onPress={() => (customFuncBack ? customFuncBack() : navigation.goBack())}
                  >
                    <View
                      style={{
                        borderRadius: 10,
                        width: 30,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: colors.borderBack,
                        borderWidth: 1,
                      }}
                    >
                      <ArrowBackSvg />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {typeof title === 'string' ? (
              <Text
                style={[
                  styles.title,
                  {
                    justifyContent: 'center',
                    includeFontPadding: false,
                    textAlign: isTitleCenter ? 'center' : 'left',
                    fontSize: 16,
                    fontWeight: '700',
                    width: '65%',
                    flexShrink: 1,
                  },
                ]}
              >
                {truncate(title, {
                  length: 22,
                })}
              </Text>
            ) : (
              children && children
            )}

            <View style={styles.right}>{right}</View>
          </View>
        </View>
      </View>
    </View>
  )
}

export { Header }

const styles = StyleSheet.create({
  left: {
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    paddingLeft: 10,
    paddingRight: 30,
    paddingBottom: Platform.OS === 'ios' ? 30 : 0,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },
  right: {
    paddingVertical: 10,
    paddingLeft: 30,
    paddingRight: 10,
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    includeFontPadding: false,
  },
})
