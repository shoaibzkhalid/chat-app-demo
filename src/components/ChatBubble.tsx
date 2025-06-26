import { View, Text } from 'react-native'

type ChatBubbleProps = {
  message: string
  isMe: boolean
}

export default function ChatBubble({ message, isMe = false }: ChatBubbleProps) {
  return (
    <View
      className={`${isMe ? 'justify-end' : 'justify-start'} max-w-[84%] rounded-2xl px-4 py-2
          ${isMe ? 'rounded-br-sm bg-[--color-brand]' : 'rounded-bl-sm bg-gray-200'}`}>
      <Text className={`text-lg ${isMe ? 'text-white' : 'text-gray-900'}`}>{message}</Text>
    </View>
  )
}
