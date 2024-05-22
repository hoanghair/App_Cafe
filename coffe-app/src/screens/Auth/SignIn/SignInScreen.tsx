import { signIn } from '@/libs/api/auth'
import { setAccessToken, setAuthUser } from '@/libs/asyncStorage'
import { Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { NavigationProp } from '@/navigation'
import { Feather } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { SignInSchema, SignInType } from './types'

export function SignInScreen() {
  const navigation = useNavigation<NavigationProp>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    mode: 'onChange',
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const theme = useAppTheme()
  const dispatch = useDispatch()

  const { isLoading, mutate } = useMutation(signIn, {
    onSuccess: (response, { email }) => {
      const { user, id } = response
      const { role, token, username } = user
      setAccessToken(token)
      setAuthUser({ role, username, email, id })
      dispatch.auth.setUser({
        email,
        id,
        username,
      })
    },
    onSettled(data) {
      if (!data) {
        Alert.alert('Lỗi đăng nhập', 'Email hoặc mật khẩu không đúng')
      }
    },
  })

  const onSubmit = (data: SignInType) => {
    mutate(data)
  }

  const platform = Platform.OS

  return (
    // <View style={styles.container}>
    <ScrollView style={styles.container}>
      <View
        style={{
          paddingTop: platform === 'ios' ? 50 : 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10 }}>
          <Feather name="x" size={28} color="grey" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentLogin}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 22,
            textTransform: 'uppercase',
            color: '#B3282D',
          }}
        >
          Tiệm Cafe Đá
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.login}>
        <View style={styles.boxLogin}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                outlineColor={theme.colors.borderInput}
                styleInput={{
                  fontFamily: theme.fonts.default.fontFamily,
                  fontSize: 14,
                }}
                label="Email"
                theme={theme}
                value={value}
                onChangeText={onChange}
                error={!!errors?.email?.message}
                helperText={errors?.email?.message}
                placeholder="Nhập email của bạn"
                autoComplete="email"
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                outlineColor={theme.colors.borderInput}
                styleInput={{
                  fontFamily: theme.fonts.default.fontFamily,
                  fontSize: 14,
                }}
                label="Mật khẩu"
                theme={theme}
                value={value}
                onChangeText={onChange}
                error={!!errors?.password?.message}
                helperText={errors?.password?.message}
                placeholder="Nhập mật khẩu của bạn"
                secureTextEntry={true}
              />
            )}
            name="password"
          />

          <TouchableHighlight style={styles.buttonLogin} onPress={handleSubmit(onSubmit)}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
              }}
            >
              ĐĂNG NHẬP
            </Text>
          </TouchableHighlight>
          <View style={styles.register}>
            <Text>Bạn chưa có tài khoản? </Text>
            <Text
              style={{
                color: '#B3282D',
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}
              onPress={() =>
                navigation.navigate('AuthStack', {
                  screen: 'SIGN_UP',
                })
              }
            >
              Đăng ký ngay
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF0',
  },
  contentLogin: {
    paddingTop: 50,
    backgroundColor: '#FFFBF0',
    paddingBottom: 50,
  },
  login: {
    height: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  boxLogin: {
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    paddingRight: 20,
    paddingLeft: 40,
    paddingBottom: 5,
    paddingTop: 10,
    fontSize: 16,
    borderColor: '#B3282D',
  },
  itemLogin: {
    marginBottom: 20,
  },
  buttonLogin: {
    backgroundColor: '#B3282D',
    borderRadius: 100,
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  boxInput: {
    position: 'relative',
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  inputR: {
    borderRightWidth: 0.8,
    position: 'absolute',
    bottom: 10,
    left: 5,
    borderColor: 'gray',
  },
  img: {
    width: 20,
    height: 20,
  },
  psab: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
})
