import { View, Text, Pressable, FlatList } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { useChatStore } from '@/stores/chat.store'
import FavoriteButton from '@/components/FavoriteButton'
import { RootStackParamList } from '@/types/navigation'

export default function ChatsList() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const { conversations, toggleFavorite } = useChatStore((store) => store)

  return (
    <FlatList
      data={conversations}
      keyExtractor={(conversation) => conversation.id}
      renderItem={({ item: conversation }) => (
        <Pressable
          onPress={() => navigation.navigate('Chat', { conversation })}
          className={`bg-red border-b border-gray-200 p-4`}>
          <View className={`flex-row items-center justify-between`}>
            <View>
              <Text className={`text-lg font-semibold text-[--color-primary]`}>
                {conversation.name}
              </Text>
              <Text
                className={`text-sm text-[${conversation.isOnline ? '--color-brand' : '--color-primary'}]`}>
                {conversation.isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>

            <FavoriteButton conversation={conversation} toggleFavorite={toggleFavorite} />
          </View>
        </Pressable>
      )}
    />
  )
}
