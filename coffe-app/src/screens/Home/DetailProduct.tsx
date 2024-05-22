import { getDetailProduct } from '@/libs/api/product'
import { ApiClient } from '@/libs/config/react-query'
import { RouteProductStackType } from '@/libs/route'
import { NavigationProp } from '@/navigation'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import { formatMoneyVND } from './HomeScreen'

export function DetailProductScreen() {
  const [count, setCount] = useState(0)
  const onPress = () => setCount((prevCount) => prevCount + 1)
  const onPressminus = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1)
    }
  }
  const route = useRoute<RouteProductStackType<'PRODUCT_DETAIL'>>()
  const navigation = useNavigation<NavigationProp>()

  const { data: detailProduct, isLoading } = useQuery(['detail', route.params.id], () =>
    getDetailProduct(route.params.id),
  )

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await ApiClient.post('/cart/create', {
        productId: route.params.id,
        quantity: count,
      })
    },
    onSuccess: () => {
      navigation.navigate('BottomTabs', {
        screen: 'TAB_CART',
      })
    },
    onError: (error) => {
      Alert.alert('Sản phẩm đã hết hàng hoặc số lượng không đủ')
    },
  })

  const handleAddToCart = () => {
    mutate()
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.thumb}>
        <ImageBackground
          resizeMode="cover"
          style={styles.background}
          source={{
            uri: detailProduct?.image,
          }}
        >
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="x" size={28} color="grey" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.order}>
        <View style={styles.in4}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{detailProduct?.name}</Text>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>
            {formatMoneyVND(detailProduct?.price || 0)}
          </Text>
        </View>
        <View style={styles.in4}>
          <Text style={{ fontSize: 14 }}>Số lượng: {detailProduct?.quantity}</Text>
        </View>
        <View style={styles.in4}>
          <Text style={{ fontSize: 13, lineHeight: 19, color: 'grey' }}>{detailProduct?.description}</Text>
        </View>
      </View>
      <View style={{ marginTop: 20, alignItems: 'center', marginBottom: 10 }}>
        <View style={styles.sl}>
          <TouchableOpacity onPress={detailProduct?.quantity == 0 ? () => {} : onPressminus}>
            <Feather name="minus-circle" size={30} color="brown" />
          </TouchableOpacity>
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ fontSize: 20, color: 'brown' }}>{count}</Text>
          </View>
          <TouchableOpacity onPress={detailProduct?.quantity === 0 ? () => {} : onPress}>
            <Feather name="plus-circle" size={30} color="brown" />
          </TouchableOpacity>
        </View>

        <Button
          mode="contained"
          style={{ ...styles.btn, marginTop: 20, backgroundColor: '#ebb467' }}
          onPress={handleAddToCart}
          disabled={count === 0}
        >
          Thêm vào giỏ
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
  },
  thumb: {
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: 400,
    backgroundColor: '#f5eedc',
    objectFit: 'contain',
  },
  icons: {
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  order: {
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 6, height: 0 },
  },
  in4: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
  },
  op: {
    backgroundColor: '#ebb467',
    padding: 20,
    borderRadius: 10,
  },
  sl: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  btn: {
    paddingLeft: 100,
    paddingRight: 100,
    borderRadius: 10,
  },
})
