import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Alert } from 'react-native'

export async function registerForPushNotificationsAsync() {
  let token = ''

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()

      finalStatus = status
    }

    token = (await Notifications.getExpoPushTokenAsync()).data
  } else {
    Alert.alert('ERROR', 'Must use physical device for Push Notifications')
  }

  return token
}

export async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}
