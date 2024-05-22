import { InformationType } from '@/screens/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { ApiClient } from '../config/react-query'

export const getMe = async (id: string): Promise<InformationType> => {
  const url = `profile/${id}`

  try {
    const response = await ApiClient.get(url)

    return response.data
  } catch (error) {
    Alert.alert('ERROR', 'SERVER ERROR', [
      {
        text: 'OK',
        onPress: async () => {
          await AsyncStorage.removeItem('access_token')
        },
      },
    ])

    throw error
  }
}

export type NotificationType = {
  member_id: string | number | undefined
  notification: string | boolean | undefined | number
}
