import AvatarDefault from '@/assets/img/user.png'
import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { RootStore } from '@/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { isEqual } from 'lodash'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  const { colors } = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const dispatch = useDispatch()

  // đăng xuất thì xóa người dùng khỏi AsyncStorage
  const handleLogout = async () => {
    await AsyncStorage.removeItem('persist:root:auth')
    await AsyncStorage.removeItem('user')
    dispatch.auth.setUser(null as never)
    navigation.navigate('BottomTabs', { screen: 'TAB_HOME' })
  }

  return (
    <View style={styles.root}>
      <Header title={user?.username ? `Xin chào, ${user?.username}` : 'Xin chào'} hideHeaderLeft />

      <KeyboardAwareScrollView style={styles.scrollContainer}>
        {!!user ? (
          <View style={styles.container}>
            <TouchableOpacity style={styles.touch}>
              <View style={styles.avatar}>
                <Image
                  source={AvatarDefault}
                  style={{ width: '100%', height: '100%', borderRadius: 100 }}
                />
              </View>

              <View style={{ marginLeft: 20 }}>
                <Text
                  style={{
                    ...textStyles.content16,
                    fontWeight: '500',
                    marginBottom: 4,
                  }}
                >
                  {user?.username}
                </Text>

                <Text style={{ ...textStyles.text12_regular, color: colors.grey }}>
                  {user?.email}
                </Text>
              </View>
            </TouchableOpacity>

            <Button style={{ marginTop: 20 }} mode="contained" onPress={handleLogout}>
              Đăng xuất
            </Button>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={{ height: 200, justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center' }}>Bạn chưa đăng nhập</Text>

              <Button
                style={{ borderRadius: 2, marginTop: 20 }}
                mode="contained"
                onPress={() => navigation.navigate('AuthStack', { screen: 'SIGN_IN' })}
              >
                Đăng nhập
              </Button>
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  )
}

export { ProfileScreen }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 29,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  touch: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    marginTop: 18,
    borderColor: '#545454',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
})
