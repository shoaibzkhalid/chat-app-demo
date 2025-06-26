import { useEffect, useRef } from 'react'
import Animated, { ZoomInLeft, ZoomInRight } from 'react-native-reanimated'
import { RouteProp, useRoute } from '@react-navigation/native'
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native'

import ChatInput from '@/components/ChatInput'
import ChatBubble from '@/components/ChatBubble'
import { Conversation } from '@/types/conversation'
import { useThemeColors } from '@/theme/hooks'
import { useChatStore, Sender } from '@/stores/chat.store'
import { useSimulateMessage } from '@/hooks/useSimulateMessage'

export default function Chat() {
  const route = useRoute<RouteProp<{ params: { conversation: Conversation } }, 'params'>>()
  const flatListRef = useRef<FlatList>(null)
  const themeColors = useThemeColors()
  const isFirstRender = useRef(true)

  const { id } = route.params.conversation
  const { conversations, addMessage } = useChatStore()
  const setLoading = useChatStore((store) => store.setLoading)
  const loading = useChatStore((store) => store.loading)

  const conversation = conversations.find((c) => c.id === id)

  // comment if want to stop simulated messages
  useSimulateMessage()

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

  useEffect(() => {
    // using this only to check whether to show
    // entering animation or not -- quick solution
    isFirstRender.current = false
  }, [])

  return (
    <KeyboardAvoidingView
      className="flex-1"
      style={{ backgroundColor: themeColors.card }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <FlatList
        inverted
        contentContainerStyle={{ paddingBottom: 10 }}
        ref={flatListRef}
        data={conversation?.messages || []}
        keyExtractor={(conversation) => conversation.id}
        ListHeaderComponent={
          loading ? (
            <View className=" flex-row items-center justify-center py-4">
              <ActivityIndicator />
              <Text className="ml-2 text-sm text-gray-500 dark:text-gray-400">Sending...</Text>
            </View>
          ) : null
        }
        renderItem={({ item: conversation, index }) => {
          const isMe = conversation.sender === Sender.Me
          const shouldAnimate = index === 0 && !isFirstRender.current

          const entryAnimation = isMe
            ? ZoomInRight.duration(1000).delay(500)
            : ZoomInLeft.duration(1000).delay(500)

          return (
            <Animated.View
              entering={shouldAnimate ? entryAnimation : undefined}
              className={`m-2 ${isMe ? 'self-end' : 'self-start'}`}>
              <ChatBubble message={conversation.text} isMe={isMe} />
            </Animated.View>
          )
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
      <ChatInput sendMessage={sendMessage} />
    </KeyboardAvoidingView>
  )
}
