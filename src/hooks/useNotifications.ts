// lib/notifications.ts
import { useEffect } from 'react'
import * as Device from 'expo-device'
import { Platform } from 'react-native'
import * as Notifications from 'expo-notifications'

export const useNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true, // ← SHOW native popup in foreground
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowList: false,
      shouldShowBanner: false,
    }),
  })

  const registerForPushNotificationsAsync = async () => {
    if (!Device.isDevice) {
      alert('Push notifications require a physical device.')
      return null
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      alert('Permission not granted for push notifications.')
      return null
    }

    const tokenData = await Notifications.getExpoPushTokenAsync()
    const token = tokenData.data
    console.log('Expo Push Token:', token)

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    return token
  }

  const setupNotificationListeners = ({
    onReceive,
    onRespond,
  }: {
    onReceive?: (notification: Notifications.Notification) => void
    onRespond?: (response: Notifications.NotificationResponse) => void
  }) => {
    const receivedListener = Notifications.addNotificationReceivedListener((notification) => {
      onReceive?.(notification)
    })

    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      onRespond?.(response)
    })

    return () => {
      receivedListener.remove()
      responseListener.remove()
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync()

    const unsubscribe = setupNotificationListeners({
      onReceive: (notification) => {
        // console.log('Notification received:', notification.request)
      },
      onRespond: (response) => {
        // console.log('Notification response:', response)
      },
    })

    return unsubscribe
  }, [])
}
