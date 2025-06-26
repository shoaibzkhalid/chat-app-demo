import { useRef } from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { View, FlatList, KeyboardAvoidingView, Platform } from 'react-native'

import { Conversation } from '@/types/chat'
import ChatInput from '@/components/ChatInput'
import ChatBubble from '@/components/ChatBubble'
import { Sender, useChatStore } from '@/stores/chat'

export default function ChatScreen() {
  const route = useRoute<RouteProp<{ params: { item: Conversation } }, 'params'>>()
  const flatListRef = useRef<FlatList>(null)

  const { id } = route.params.item
  const { conversations, addMessage } = useChatStore()
  const conversation = conversations.find((c) => c.id === id)

  const sendMessage = (text: string) => {
    addMessage(id, {
      id: Date.now().toString(),
      text,
      sender: Sender.Me,
      timestamp: Date.now(),
    })

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'padding' works best on iOS
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // adjust this based on your header height
    >
      <View className={`flex-1 bg-slate-50 dark:bg-black`}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          data={conversation?.messages || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Animated.View
              entering={FadeIn.duration(300)}
              className={`${item.sender === Sender.Me ? 'self-end' : 'self-star'} m-2`}>
              <ChatBubble message={item.text} isMe={item.sender === Sender.Me} />
            </Animated.View>
          )}
        />

        <ChatInput sendMessage={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  )
}
