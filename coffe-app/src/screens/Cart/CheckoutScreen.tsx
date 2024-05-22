import { orderProduct } from '@/libs/api/product'
import { Input } from '@/libs/components'
import { ApiClient } from '@/libs/config/react-query'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { RootStore } from '@/store'
import { Entypo } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { isEqual, truncate } from 'lodash'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { z } from 'zod'
import { formatMoneyVND } from '../Home'
import { Daum } from './CartScreen'

const OrderInputSchema = z.object({
  shippingAddress: z.string().min(1, { message: 'Vui lòng nhập địa chỉ giao hàng' }),
  phone: z.string().min(1, { message: 'Vui lòng nhập số điện thoại' }),
})

type OrderInputType = z.infer<typeof OrderInputSchema>

export function CheckoutScreen() {
  const navigation = useNavigation<NavigationProp>()

  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm<OrderInputType>({
    defaultValues: {
      shippingAddress: '',
      phone: '',
    },
    resolver: zodResolver(OrderInputSchema),
  })

  const { data, refetch } = useQuery({
    queryFn: async () => {
      const res = await ApiClient.get<Daum>('/cart/my-self')

      return res
    },
    queryKey: ['product', user?.id],
  })

  const queryClient = new QueryClient()

  const { mutate: createOrderProduct, isLoading } = useMutation(orderProduct, {
    onSuccess: () => {
      Alert.alert('Đặt hàng thành công')
      setValue('shippingAddress', '')
      queryClient.invalidateQueries()
      navigation.navigate('BottomTabs', {
        screen: 'TAB_HOME',
      })
    },
    onError: (error) => {
      Alert.alert('Đặt hàng thất bại')
    },
  })

  const onSubmit = (dataShip: OrderInputType) => {
    if (!user) {
      Alert.alert('Vui lòng đăng nhập để đặt hàng', 'Bạn cần đăng nhập để đặt hàng', [
        {
          text: 'Đăng nhập',
          onPress: () =>
            navigation.navigate('AuthStack', {
              screen: 'SIGN_IN',
            }),
        },
        {
          text: 'Để sau',
          onPress: () => {},
        },
      ])
      return
    }

    const orderProduct = data?.data.items.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }))

    if (!orderProduct) {
      return
    }


    createOrderProduct({
      products: orderProduct,
      shippingAddress: dataShip.shippingAddress,
      phone: dataShip.phone,
    })
  }

  const theme = useAppTheme()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-thin-left" size={24} color="grey" />
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', fontSize: 20, paddingLeft: 10 }}>Đặt hàng</Text>
      </View>
      <View style={styles.main}>
        <ScrollView
          style={{
            marginBottom: 50,
          }}
        >
          <View style={styles.getinfo}>
            <View style={styles.row}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={textStyles.text14}
                    label="Địa chỉ giao hàng"
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    error={!!errors?.shippingAddress?.message}
                    helperText={errors?.shippingAddress?.message}
                    placeholder="Nhập địa chỉ giao hàng"
                    style={{ width: '100%' }}
                    disabled={isLoading}
                  />
                )}
                name="shippingAddress"
              />
            </View>

            <View style={styles.row}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    outlineColor={theme.colors.borderInput}
                    styleInput={textStyles.text14}
                    label="Số điện thoại"
                    theme={theme}
                    value={value}
                    onChangeText={onChange}
                    error={!!errors?.phone?.message}
                    helperText={errors?.phone?.message}
                    placeholder="Nhập số điện thoại"
                    style={{ width: '100%' }}
                    disabled={isLoading}
                  />
                )}
                name="phone"
              />
            </View>
          </View>
          <View style={styles.product}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '500' }}>Món</Text>
            </View>
            {data?.data.items.map((item) => (
              <View style={styles.item}>
                <Image
                  style={{ width: 60, height: 50 }}
                  source={{
                    uri: item.product.image,
                  }}
                />
                <Text
                  style={{
                    color: '#c7a24c',
                    position: 'absolute',
                    borderWidth: 0.5,
                    borderRadius: 100,
                    borderColor: '#c7a24c',
                    width: 20,
                    height: 20,
                    textAlign: 'center',
                    left: 70,
                    top: 4,
                  }}
                >
                  {item.quantity}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 15 }}>
                  {item.product.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'column',
                    position: 'absolute',
                    bottom: 0,
                    left: 88,
                  }}
                >
                  <Text style={{ color: 'grey', fontSize: 13, paddingTop: 2 }}>
                    {truncate(item.product.description, { length: 35 })}
                  </Text>
                </View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  }}
                >
                  {formatMoneyVND(item.price)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.total}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
              }}
            >
              <Text style={{ color: 'grey' }}>Tạm tính</Text>
              <Text style={{ color: 'grey' }}>{formatMoneyVND(data?.data.total || 0)}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                Tổng cộng {data?.data.items.reduce((acc, item) => acc + item.quantity, 0)} sản phẩm
              </Text>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                {formatMoneyVND(data?.data.total || 0)}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.checkout}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{ borderRadius: 10 }}
          loading={isLoading}
        >
          Đặt {data?.data.items.reduce((acc, item) => acc + item.quantity, 0)} sản phẩm:{' '}
          {formatMoneyVND(data?.data.total || 0)}
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0ddd5',
  },
  header: {
    flexDirection: 'row',
    padding: 13,
    width: '100%',
    paddingTop: '10%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 5 },
  },
  checkout: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 5, height: 0 },
    borderTopWidth: 0.5,
  },
  icon: {
    flexDirection: 'row',
  },
  touch: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  main: {
    marginTop: 5,
    flex: 5,
    paddingBottom: 50,
  },
  getinfo: {
    backgroundColor: '#fff',
  },
  first: {
    flexDirection: 'row',
    padding: 10,
  },
  option1: {
    backgroundColor: '#ebe7dd',
    borderRadius: 10,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  option2: {
    backgroundColor: '#c7a24c',
    borderRadius: 10,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    padding: 10,
    marginTop: 10,
    borderTopWidth: 0.5,
    borderColor: '#C0C0C0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  product: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 15,
    // justifyContent:'space-between',
  },
  item: {
    borderTopWidth: 0.5,
    borderColor: '#C0C0C0',
    flexDirection: 'row',
    padding: 13,
    marginBottom: 10,
  },
  total: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
})
