import { signUp } from '@/libs/api/auth'
import { Header, Input } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { btnStyles, textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-paper'
import { SignUpSchema, SignUpType } from './types'

const SignUpScreen = () => {
  const theme = useAppTheme()
  const { colors } = useAppTheme()
  const navigation = useNavigation<NavigationProp>()

  // dữ liệu từ form 
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    mode: 'onChange',
    // validators form
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // gửi request đến API và xử lý kết quả.
  const { isLoading, mutate } = useMutation(signUp, {
    onError: (error) => {
      Alert.alert('Đăng ký thất bại')
    },
    onSuccess: (response) => {
      Alert.alert('Đăng ký thành công')
      navigation.navigate('AuthStack', {
        screen: 'SIGN_IN',
      })
    },
  })

  //gửi request đăng ký tài khoản với dữ liệu từ form.
  const onSubmit = (data: SignUpType) => {
    mutate({
      email: data.email,
      password: data.password,
      username: data.username,
    })
  }

  return (
    <View style={styles.root}>
      <Header title="Đăng ký tài khoản" />

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={textStyles.title}>Chào mừng bạn đến với ứng dụng của chúng tôi</Text>
          </View>

          <View style={styles.containerInput}>
            <View style={{ marginBottom: 29 }}>
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
            </View>

            <View style={{ marginBottom: 29 }}>
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
                    secureTextEntry={true}
                    onChangeText={onChange}
                    error={!!errors?.password?.message}
                    helperText={errors?.password?.message}
                    placeholder="Nhập mật khẩu của bạn"
                  />
                )}
                name="password"
              />
            </View>

            <View style={{ marginBottom: 29 }}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={{
                      fontFamily: theme.fonts.default.fontFamily,
                      fontSize: 14,
                    }}
                    label="Nhập lại mật khẩu"
                    theme={theme}
                    value={value}
                    secureTextEntry={true}
                    onChangeText={onChange}
                    error={!!errors?.confirm_password?.message}
                    helperText={errors?.confirm_password?.message}
                    placeholder="Nhập lại mật khẩu của bạn"
                  />
                )}
                name="confirm_password"
              />
            </View>

            <View style={{ marginBottom: 29 }}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={{
                      fontFamily: theme.fonts.default.fontFamily,
                      fontSize: 14,
                    }}
                    label="Tên"
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    error={!!errors?.username?.message}
                    helperText={errors?.username?.message}
                    placeholder="Nhập tên của bạn"
                  />
                )}
                name="username"
              />
            </View>
          </View>

          <Button
            loading={isLoading}
            mode="contained"
            style={btnStyles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ fontSize: 14 }}>Đăng ký</Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export { SignUpScreen }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    paddingHorizontal: 29,
  },
  containerInput: {
    marginTop: 32,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  paddingTouch: {
    padding: 10,
  },
  title: {
    marginTop: 20,
  },
})
