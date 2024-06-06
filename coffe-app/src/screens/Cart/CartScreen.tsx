import React from 'react'
import {
  Alert,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { ApiClient } from '@/libs/config/react-query'
import { NavigationProp } from '@/navigation'
import { RootStore } from '@/store'
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { useSelector } from 'react-redux'
import { formatMoneyVND } from '../Home'

export interface Root {
  data: Daum
}

export interface Item {
  product: Product
  quantity: number
  price: number
  _id: string
}

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  cost: number
  quantity: number
  categoryId: string
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Daum {
  items: Item[]
  _id: string
  total: number
}

export function CartScreen() {
  // Lấy thông tin người dùng từ state của Redux store
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )
  const queryClient = new QueryClient()

  // Sử dụng useQuery để lấy dữ liệu giỏ hàng từ API
  const { data, refetch } = useQuery({
    queryFn: async () => {
      const res = await ApiClient.get<Daum>('/cart/my-self')

      return res
    },
    queryKey: ['product', user?.id],
    refetchInterval: 1,
  })

  // Sử dụng useMutation để cập nhật số lượng sản phẩm trong giỏ hàng
  const { mutate } = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const res = await ApiClient.put('/cart/update', {
        productId: id,
        quantity: quantity,
      })

      return res.data
    },
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries(['product', user?.id])
      Alert.alert('Cập nhật thành công')
    },
  })

  // Sử dụng useMutation để xóa sản phẩm khỏi giỏ hàng
  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: string) => {
      const res = await ApiClient.delete(`/cart/delete/${id}`)

      return res.data
    },
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries(['product', user?.id])
      Alert.alert('Xóa thành công')
    },
    onError: () => {
      Alert.alert('Xóa thất bại')
    },
  })

  // Component Item để hiển thị từng sản phẩm trong giỏ hàng
  const Item = ({
    item: {
      _id: cartId,
      quantity,
      product: { name, image, price, _id },
    },
  }: {
    item: Item
  }) => {
    return (
      <View style={styles.itemProduct}>
        <View style={styles.mainProduct}>
          <Pressable
            style={{
              position: 'absolute',
              top: -20,
              right: 0,
              padding: 10,
              flex: 1,
            }}
            onPress={() => {
              deleteProduct(_id)
            }}
          >
            <Feather name="x" size={22} color="grey" />
          </Pressable>
          <View style={styles.boxImage}>
            <Image
              style={styles.imageProduct}
              source={{
                uri: image,
              }}
            />
          </View>
          <View style={styles.boxInfor}>
            <Text style={styles.nameProduct}>{name}</Text>
            <Text style={styles.price}>
              {formatMoneyVND(price)} x {quantity}
            </Text>
          </View>
          <View style={styles.function}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 6,
                padding: 3,
                shadowColor: 'grey',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  mutate({ id: _id, quantity: quantity + 1 })
                }}
              >
                <AntDesign name="plus" size={18} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 1, marginTop: 5, marginBottom: 5 }}>
              <Text>{quantity}</Text>
            </View>
            <View style={{ backgroundColor: '#A82F2E', borderRadius: 6, padding: 3 }}>
              <TouchableOpacity
                onPress={() => {
                  mutate({ id: _id, quantity: quantity - 1 })
                }}
              >
                <AntDesign name="minus" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  // Hàm để render từng sản phẩm trong giỏ hàng
  const renderItem = ({ item }: { item: Item }) => {
    return <Item item={item} key={item._id} />
  }
  const navigation = useNavigation<NavigationProp>()

  // Hiển thị khi giỏ hàng trống
  if (data?.data.items.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Giỏ hàng của bạn đang trống</Text>
      </View>
    )
  }

  // Hiển thị danh sách sản phẩm trong giỏ hàng và thông tin tổng giá tiền
  return data?.data && data.data.total > 0 ? (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: Platform.OS === 'ios' ? 50 : 20,
          left: 20,
          padding: 10,
          width: '100%',
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700', color: 'brown' }}>Giỏ hàng của bạn</Text>
      </View>
      {/* // Hiển thị danh sách sản phẩm trong giỏ hàng bằng FlatList */}
      <FlatList
        data={data?.data.items || []}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={{ paddingTop: 90 }}
      />
      <View style={styles.footter}>
        <View>
          <Text>Tạm tính:</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>
            {formatMoneyVND(data?.data.total || 0)}
          </Text>
        </View>
        <View style={styles.checkout}>
          <TouchableOpacity
            onPress={() => {
              // nếu mà đăng nhập thì sang màn CheckoutStack còn chưa thì ra màn SIGN_IN
              if (!!user) {
                navigation.navigate('CheckoutStack', {
                  screen: 'CHECKOUT',
                })
              } else {
                navigation.navigate('AuthStack', { screen: 'SIGN_IN' })
              }
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, color: 'white', padding: 3 }}>THANH TOÁN</Text>
              <EvilIcons name="arrow-right" size={29} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Giỏ hàng của bạn đang trống</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffafa',
  },
  boxImage: {
    height: 100,
    margin: 10,
    elevation: 3,
  },
  imageProduct: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  mainProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 15,
    paddingLeft: 5,
    paddingRight: 5,
    width: '90%',
    backgroundColor: '#FFFBF0',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 3 },
    position: 'relative',
  },
  boxInfor: {
    width: '50%',
    marginLeft: 5,
  },
  nameProduct: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 5,
  },
  price: {
    fontSize: 17,
    fontWeight: '200',
    color: 'grey',
  },
  function: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 30,
    alignItems: 'center',
  },
  footter: {
    position: 'absolute',
    backgroundColor: '#FFF',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  checkout: {
    backgroundColor: '#A82F2E',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 7 },
  },
  itemProduct: {
    width: '100%',
    paddingBottom: 17,
  },
})
