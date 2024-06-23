import { OrderHistoryType } from '@/libs/api/product'
import { Header } from '@/libs/components'
import { ApiClient } from '@/libs/config/react-query'
import { useAppTheme } from '@/libs/config/theme'
import { RootStore } from '@/store'
import { useFocusEffect } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { useCallback } from 'react'
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { formatMoneyVND } from '../Home'

const HistoryOrderScreen = () => {
  const theme = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['historyOrder', user?.id],
    queryFn: async () => {
      const res = await ApiClient.get<OrderHistoryType>(`/order/my-self`)
      return res.data
    },
    enabled: !!user?.id,
  })

console.info(data)

  const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  }

  const mapperStatus = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Đang chờ xử lý'
      case 'PROCESSING':
        return 'Đang xử lý'
      case 'SHIPPING':
        return 'Đang giao hàng'
      case 'DELIVERED':
        return 'Đã giao hàng'
      case 'CANCELED':
        return 'Đã hủy'
      default:
        return status
    }
  }

  const Item = ({
    _id,
    name,
    image,
    description,
    status,
    price,
    quantity,
  }: {
    _id: string
    name: string
    description: string
    price: number
    cost: number
    quantity: number
    categoryId: string
    image: string
    createdAt: string
    status: string
    updatedAt: string
    __v: number
  }) => {
    return (
      <View>
        <TouchableOpacity style={styles.itemProduct}>
          <View style={styles.mainProduct}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Text style={styles.nameProduct}>{name}</Text>
            </View>
            <View>
              <Image
                source={{
                  uri: image,
                }}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 4 }}>
              <View style={{ marginRight: 20 }}>
                <Text style={styles.title}>Trạng thái</Text>
                <Text style={styles.infor}>{mapperStatus(status)}</Text>
              </View>
              <View style={{ marginRight: 20 }}>
                <Text style={styles.title}>Số lượng</Text>
                <Text style={styles.infor}>{quantity} sản phẩm</Text>
              </View>
              <View>
                <Text style={styles.title}>Tổng tiền</Text>
                <Text style={styles.infor}>{formatMoneyVND(price)}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const renderItem = ({
    item,
  }: {
    item: {
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
      status: string
      __v: number
    }
  }) => {
    return <Item {...item} key={item._id} />
  }

  // Flatten the products array
  const mapperProducts = data?.orders?.flatMap((order) =>
    order.products.map((product) => {
      return { ...product.product, quantity: product.quantity, status: order.status }
    }),
  )

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, []),
  )

  return (
    <View style={styles.container}>
      <Header title="Lịch sử đơn hàng" />

      {isLoading ? (
        <View style={{ marginTop: 30 }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlashList
          data={mapperProducts || []}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          removeClippedSubviews={true}
          ListEmptyComponent={
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
              <Text style={{ color: theme.colors.text }}>Không có đơn hàng nào</Text>
            </View>
          }
          estimatedItemSize={100}
          refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
        />
      )}
    </View>
  )
}

export { HistoryOrderScreen }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxImage: {
    position: 'relative',
    width: 80,
    height: 80,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  imageProduct: {
    height: 100,
    width: 100,
    position: 'absolute',
    top: -30,
    left: -10,
  },
  mainProduct: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#FFFBF0',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 5,
    width: '90%',
  },
  boxInfor: {
    width: '45%',
    marginLeft: 30,
  },
  nameProduct: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 5,
  },
  price: {
    fontSize: 19,
    fontWeight: 'bold',
  },

  itemProduct: {
    width: '100%',
  },
  title: {
    color: '#b2bec3',
    fontWeight: 'bold',
    fontSize: 13,
  },
  infor: {
    color: '#2d3436',
    fontWeight: '500',
  },
})
