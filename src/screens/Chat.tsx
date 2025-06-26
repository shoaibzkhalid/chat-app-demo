import { useRef } from 'react'
import Animated, { SlideInRight } from 'react-native-reanimated'
import { RouteProp, useRoute } from '@react-navigation/native'
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native'

import ChatBubble from '@/components/ChatBubble'
import ChatInput from '@/components/ChatInput'
import { Conversation } from '@/types/conversation'
import { useChatStore, Sender } from '@/stores/chat.store'
import { useSimulateMessage } from '@/hooks/useSimulateMessage'

export default function Chat() {
  const route = useRoute<RouteProp<{ params: { item: Conversation } }, 'params'>>()
  const flatListRef = useRef<FlatList>(null)

  const { id } = route.params.item
  const { conversations, addMessage } = useChatStore()
  const setLoading = useChatStore((store) => store.setLoading)
  const loading = useChatStore((store) => store.loading)

  const conversation = conversations.find((c) => c.id === id)
  // useSimulateMessage()

  const sendMessage = (text: string) => {
    setLoading(true)
    addMessage(id, {
      id: Date.now().toString(),
      text,
      sender: Sender.Me,
      timestamp: Date.now(),
    })

    setTimeout(() => {
      setLoading(false)
      flatListRef.current?.scrollToOffset({ offset: 0 })
    }, 1000)
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <FlatList
        inverted
        contentContainerStyle={{ paddingBottom: 10 }}
        ref={flatListRef}
        data={conversation?.messages || []}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          loading ? (
            <View className=" flex-row items-center justify-center py-4">
              <ActivityIndicator />
              <Text className="ml-2 text-sm text-gray-500 dark:text-gray-400">Sending...</Text>
            </View>
          ) : null
        }
        renderItem={({ item, index }) => (
          <Animated.View
            entering={index === 0 ? SlideInRight.duration(700).delay(500) : undefined}
            className={`m-2 ${item.sender === Sender.Me ? 'self-end' : 'self-start'}`}>
            <ChatBubble message={item.text} isMe={item.sender === Sender.Me} />
          </Animated.View>
        )}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
      <ChatInput sendMessage={sendMessage} />
    </KeyboardAvoidingView>
  )
}
