import { View, Text, Pressable, Alert } from 'react-native'
import ThemeSwitcher from '@/components/ThemeSwitcher'

import Ionicons from '@expo/vector-icons/Ionicons'
import { useChatStore } from '@/stores/chat.store'
import { zustandStorage } from '@/utils/storage'

export default function Profile() {
  const clearStorage = useChatStore((store) => store.clearStorage)

  const handleClearChat = async () => {
    try {
      clearStorage()
      await zustandStorage.removeItem('chat-storage')
      Alert.alert('Chat Reset', 'All conversations have been cleared.')
    } catch (error) {
      console.log('Error clearing storage', error)
      Alert('Something went wrong clearing chats')
    }
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-4 text-2xl font-bold text-[--color-primary]">Profile</Text>
      <ThemeSwitcher />

      <Pressable
        className="my-2 flex-row items-center justify-between rounded-lg bg-gray-100 
    p-4 dark:bg-gray-800"
        onPress={handleClearChat}>
        <Ionicons name="trash-outline" size={24} color="red" />
        <Text className="mx-2 text-[--color-primary]">Clear chats</Text>
      </Pressable>
    </View>
  )
}
