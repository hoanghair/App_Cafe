import { OrderHistoryType } from '@/libs/api/product'
import { ApiClient } from '@/libs/config/react-query'
import { useAppTheme } from '@/libs/config/theme'
import { RootStore } from '@/store'
import { AntDesign } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'

const HistoryOrderScreen = () => {
  const theme = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  const { data } = useQuery({
    queryKey: ['historyOrder', user?.id],
    queryFn: async () => {
      const res = await ApiClient.get<OrderHistoryType>(`/order/my-self`)

      return res.data
    },
    enabled: !!user?.id,
  })

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
    }
  }

  const Item = ({
    name,
    image,
    description,
    price,
    _id,
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
              <Text>
                <AntDesign name="right" size={20} color="black" />
              </Text>
            </View>
            <View>
              <Text style={styles.title}>22/111/2021</Text>
            </View>
            <View>
              <Image
                source={{
                  uri: image,
                }}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ marginRight: 20 }}>
                <Text style={styles.title}>Đánh giá</Text>
                <View style={{ flexDirection: 'row' }}>
                  <AntDesign name="star" size={18} color="#ffeaa7" />
                  <AntDesign name="star" size={18} color="#ffeaa7" />
                  <AntDesign name="star" size={18} color="#ffeaa7" />
                  <AntDesign name="star" size={18} color="#ffeaa7" />
                  <AntDesign name="star" size={18} color="#ffeaa7" />
                </View>
              </View>
              <View style={{ marginRight: 20 }}>
                <Text style={styles.title}>Số lượng</Text>
                <Text style={styles.infor}>www sản phẩm</Text>
              </View>
              <View>
                <Text style={styles.title}>Tổng tiền</Text>
                <Text style={styles.infor}>{price} đ</Text>
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
      __v: number
    }
  }) => <Item {...item} />

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          backgroundColor: '#FFFBF0',
          height: 80,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '700',
            paddingTop: Platform.OS === 'ios' ? 20 : 0,
          }}
        >
          Lịch sử đặt hàng
        </Text>
      </View>
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FFFBF0',
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
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
    fontWeight: '700',
  },
})
