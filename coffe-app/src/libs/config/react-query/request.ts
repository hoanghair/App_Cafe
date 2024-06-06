import { STORAGE_KEY, getAccessToken } from '@/libs/asyncStorage'
import { Dispatch } from '@/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useEffect } from 'react'
import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { getEnvVars } from '../../../../environment'

const env = getEnvVars()
const baseURL = env.REACT_APP_ENV_ENDPOINT
// Tạo một phiên bản Axios được xác thực
export const ApiClient = Axios.create({
  baseURL,
})

// Trình chặn yêu cầu để thêm mã thông báo vào các yêu cầu được xác thực
async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = await getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

ApiClient.interceptors.request.use(authRequestInterceptor)

// Tạo một phiên bản Axios chưa được xác thực
export const ApiClientUnAuth = Axios.create({
  baseURL,
})

// Thành phần AxiosInterceptor để xử lý phản hồi và lỗi
export const AxiosInterceptor = ({ children }: any) => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response
    }

    const errInterceptor = (error: AxiosError) => {
      if (error.response?.status === 401) {
        dispatch.auth.setUser(null as never)
        AsyncStorage.removeItem(STORAGE_KEY.TOKEN)
        Alert.alert('Error', 'Token Expired!')
      }

      return Promise.reject(error.message)
    }
    const interceptor = ApiClient.interceptors.response.use(resInterceptor, errInterceptor)

    return () => ApiClient.interceptors.response.eject(interceptor)
  }, [])
  return children
}
