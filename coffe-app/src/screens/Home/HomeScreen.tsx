import React from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { getProduct } from '@/libs/api/product'
import { NavigationProp } from '@/navigation'
import { Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import Swiper from 'react-native-swiper'

export const formatMoneyVND = (money: number) => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'
}

function Item({
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
}) {
  const navigation = useNavigation<NavigationProp>()
  console.log('image', image)
  return (
    <View>
      <TouchableOpacity
        style={styles.itemProduct}
        onPress={() => {
          navigation.navigate('ProductStack', {
            screen: 'PRODUCT_DETAIL',
            params: {
              id: _id,
            },
          })
        }}
      >
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
          <Text>{formatMoneyVND(price)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export function HomeScreen() {
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

  const { data } = useQuery({
    queryFn: getProduct,
    queryKey: ['product'],
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ height: 25, width: 25, marginRight: 10 }}
            source={require('@/assets/img/images/sun.png')}
          />
          <Text style={styles.textHeader}>Chào mừng bạn đến với Coffee Shop</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.banner}>
          <View style={styles.itemBanner}>
            <Swiper style={styles.wrapper} showsButtons={true} autoplay={true}>
              <View style={styles.slide1}>
                <Image
                  style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                  source={require('@/assets/img/images/banner/banner_one.webp')}
                />
              </View>
              <View style={styles.slide2}>
                <Image
                  style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                  source={require('@/assets/img/images/banner/banner_two.webp')}
                />
              </View>
              <View style={styles.slide3}>
                <Image
                  style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                  source={require('@/assets/img/images/banner/banner_three.webp')}
                />
              </View>
            </Swiper>
          </View>
        </View>
        <View style={styles.register}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: '#fff',
              padding: 20,
              alignItems: 'center',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
          >
            <View style={styles.itemSales}>
              <MaterialCommunityIcons name="ticket-percent" size={50} color="#A82F2E" />
              <Text style={{ fontWeight: 'bold' }}>Ưu đãi</Text>
            </View>
            <View style={styles.itemSales}>
              <FontAwesome5 name="crown" size={50} color="#A82F2E" />
              <Text style={{ fontWeight: 'bold' }}>Thử thách</Text>
            </View>
            <View style={styles.itemSales}>
              <Entypo name="heart" size={50} color="#A82F2E" />
              <Text style={{ fontWeight: 'bold' }}>Yêu thích</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.contentListProduct}>Sản Phẩm Nổi Bật</Text>
          <ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              {data && data.data.map((item, index) => <Item key={index} {...item} />)}
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Image
            source={require('@/assets/img/images/coffee-cup-footer.png')}
            style={{ height: 50, width: 50, marginBottom: 10 }}
          />
          <Text style={{ fontWeight: '100', color: '#a4b0be' }}>
            Bản tin đến đây là hết. Xin cảm ơn
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#FFFBF0',
    paddingLeft: 15,
    paddingRight: 20,
    zIndex: 1000,
  },
  qrCodeImg: {
    width: 30,
    height: 30,
  },
  textHeader: {
    fontSize: 16,
  },
  banner: {
    marginTop: 80,
    position: 'relative',
    overflow: 'hidden',
    height: 250,
  },
  itemBanner: {
    position: 'absolute',
    backgroundColor: '#FFF3D9',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
  },

  textInforBanner: {
    color: '#FFFF',
    width: 300,
    lineHeight: 19,
    fontWeight: '600',
  },
  buttonBanner: {
    marginTop: 40,
    backgroundColor: '#FFFFFF',
    width: 190,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  textButtonBanner: {
    fontWeight: '700',
    color: '#B3282D',
  },
  iconRightBanner: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: '#831A22',
    borderRadius: 100,
    padding: 5,
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFBF0',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 40,
    paddingBottom: 40,
  },
  imageRegister: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#b2bec3',
    padding: 18,
  },

  contentListProduct: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 20,
    marginLeft: 10,
  },
  imageProduct: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1000,
  },
  itemProduct: {
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: Dimensions.get('window').width / 2 - 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 30,
  },
  boxImage: {
    backgroundColor: '#FFF3D9',
    height: 190,
    width: '100%',
  },
  boxInfor: {
    padding: 10,
    height: 85,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF3D9',
  },
  nameProduct: {
    fontWeight: 'bold',
    color: '#535c68',
    fontSize: 18,
    marginBottom: 5,
  },
  allProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    marginLeft: 10,
  },
  buttonAllProduct: {
    backgroundColor: '#A82F2E',
    borderRadius: 10,
  },
  textButtonProduct: {
    color: '#FFFF',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 30,
    paddingLeft: 30,
    fontSize: 16,
  },
  txtProductAll: {
    color: '#A82F2E',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF3D9',
    width: '100%',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF3D9',
    width: '100%',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF3D9',
    width: '100%',
  },

  itemSales: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
