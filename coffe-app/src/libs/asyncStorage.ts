import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthState } from './types/auth'

export const STORAGE_KEY = {
  TOKEN: 'access_token',
  USER: 'user',
  TUTORIAL: 'hasSeenIntroduce',
}

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY.TOKEN)
  } catch (error) {
    return null
  }
}

export const setAccessToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY.TOKEN, token)
  } catch (error) {
    console.log(error)
  }
}

export const getHasSeenIntroduce = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY.TUTORIAL)
  } catch (error) {
    return false
  }
}

export const setHasSeenIntroduce = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY.TUTORIAL, JSON.stringify(true))
  } catch (error) {
    console.log(error)
  }
}

export const setAuthUser = async (user: AuthState) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY.USER, JSON.stringify(user))
  } catch (error) {
    console.log(error)
  }
}

export const getAuthUser = async () => {
  try {
    const user = await AsyncStorage.getItem(STORAGE_KEY.USER)

    return user ? JSON.parse(user) : null
  } catch (error) {
    return null
  }
}
