import { useNavigation } from '@react-navigation/native'
import * as Notifications from 'expo-notifications'
import { NavigationProp } from 'navigation'
import { useEffect, useRef, useState } from 'react'

export const NOTIFICATION_SCREEN = {
  HOME_SCREEN: 'HomeScreen',
}

const useNotification = () => {
  const navigation = useNavigation<NavigationProp>()
  const notificationListener = useRef<any>()
  const responseListener = useRef<any>()

  const [notification, setNotification] = useState<boolean>(false)

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(!!notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      if (response) {
        const { data } = response.notification.request.content
        switch (data?.screen) {
          case NOTIFICATION_SCREEN.HOME_SCREEN: {
            navigation.navigate('BottomTabs', { screen: 'TAB_HOME' })
            break
          }
        }
      }
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return { notification }
}

export default useNotification
