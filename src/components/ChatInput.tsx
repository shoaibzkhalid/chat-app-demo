import React, { useState } from 'react'
import { View, TextInput, Pressable, Keyboard } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons'
import { useThemeColor } from 'theme/hooks'

const MAX_HEIGHT = 400

type ChatInputProps = {
  sendMessage: (text: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage }) => {
  const { placeholder } = useThemeColor()

  const [text, setText] = useState('')
  const [inputHeight, setInputHeight] = useState(40)

  const handleSend = () => {
    Keyboard.dismiss() // Dismiss the keyboard when sending a message
    if (text.trim()) {
      sendMessage(text)
      setText('')
    }
  }

  return (
    <View
      className={`h-24 flex-row items-center
      rounded-t-2xl
      border-gray-300 bg-white p-4 shadow-lg dark:bg-gray-800`}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        className={`light:text-gray-800 mr-2 flex-1 p-2 text-lg text-[--color-primary]`}
        style={[{ height: inputHeight }]}
        placeholderTextColor={placeholder}
        multiline
        // onContentSizeChange={(e) => {
        //   const newHeight = e.nativeEvent.contentSize.height
        //   console.log('newHeight', newHeight)
        //   setInputHeight(Math.min(newHeight, MAX_HEIGHT))
        // }}
      />
      <Pressable onPress={handleSend}>
        <Ionicons name="send" size={24} color={'green'} />
      </Pressable>
    </View>
  )
}

export default ChatInput
