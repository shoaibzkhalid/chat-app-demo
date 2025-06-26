import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { RouteProp, useRoute } from '@react-navigation/native'

import { useChatStore } from '@/stores/chat'
import { Conversation } from '@/types/chat'

export const useFakeNotifications = () => {
  const { simulateIncoming } = useChatStore()

  const route = useRoute<RouteProp<{ params: { item: Conversation } }, 'params'>>()
  const { id } = route.params.item

  useEffect(() => {
    const timeout = setTimeout(() => {
      simulateIncoming(id)

      Notifications.scheduleNotificationAsync({
        content: {
          title: "You've received a new message! 📬",
          body: 'Here is the notification body',
          data: { data: 'goes here', test: { test1: 'more data' } },
        },
        trigger: null,
      })
    }, 5000)
    return () => clearTimeout(timeout)
  }, [])

  return { simulateIncoming }
}
