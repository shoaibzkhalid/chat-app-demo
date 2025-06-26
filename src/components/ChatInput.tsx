import { useState } from 'react'
import {
  View,
  TextInput,
  Pressable,
  Keyboard,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { useThemeColors } from '@/theme/hooks'

const MAX_HEIGHT = 150
const MIN_HEIGHT = 40

type ChatInputProps = {
  sendMessage: (text: string) => void
}

export default function ChatInput({ sendMessage }: ChatInputProps) {
  const { text: textColor } = useThemeColors()

  const [text, setText] = useState('')
  const [inputHeight, setInputHeight] = useState(MIN_HEIGHT)

  const handleSend = () => {
    Keyboard.dismiss()
    if (text.trim()) {
      sendMessage(text)
      setText('')
      setInputHeight(MIN_HEIGHT) // reset height on send
    }
  }

  const handleContentSizeChange = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    console.log('Content size changed:', e.nativeEvent.contentSize.height)
    const newHeight = e.nativeEvent.contentSize.height
    setInputHeight(Math.min(Math.max(MIN_HEIGHT, newHeight), MAX_HEIGHT))
  }

  // return

  return (
    <View
      className="flex-row items-center rounded-t-2xl border-gray-300 bg-white 
              p-4 shadow-lg dark:bg-gray-800"
      style={{ minHeight: 60 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        className={`w-full p-2 text-lg text-[--color-primary]`}
        style={{ height: inputHeight, textAlignVertical: 'top', flexShrink: 1 }}
        placeholderTextColor={textColor}
        multiline
        onContentSizeChange={handleContentSizeChange}
      />
      <Pressable onPress={handleSend}>
        <Ionicons name="send" size={24} color="green" />
      </Pressable>
    </View>
  )
}
