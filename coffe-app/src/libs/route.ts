import { AuthStackParams } from '@/navigation/AuthStack'
import { ProductStackParams } from '@/navigation/ProductStack'
import { RouteProp } from '@react-navigation/native'

export type RouteAuthStackType<KEY_SCREEN extends keyof AuthStackParams> = RouteProp<
  AuthStackParams,
  KEY_SCREEN
>

export type RouteProductStackType<KEY_SCREEN extends keyof ProductStackParams> = RouteProp<
  ProductStackParams,
  KEY_SCREEN
>
