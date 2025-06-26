import React from 'react'
import { View, Text } from 'react-native'

type ChatBubbleProps = {
  message: string
  isMe: boolean
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isMe = false }) => {
  return (
    <View className={`mb-2 flex-row ${isMe ? 'justify-end' : 'justify-start'}`}>
      <View
        className={`max-w-[100%] rounded-2xl px-4 py-2
          ${isMe ? 'rounded-br-sm bg-[--color-brand]' : 'rounded-bl-sm bg-gray-200'}`}>
        <Text className={`text-lg ${isMe ? 'text-white' : 'text-gray-900'}`}>{message}</Text>
      </View>
    </View>
  )
}

export default ChatBubble
