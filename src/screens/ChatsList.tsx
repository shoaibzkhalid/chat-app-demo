import { View, Text, Pressable, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate('Chat', { item })}
          className={`bg-red border-b border-gray-200 p-4`}>
          <View className={`flex-row items-center justify-between`}>
            <View>
              <Text className={`text-lg font-semibold text-[--color-primary]`}>{item.name}</Text>
              <Text className={`text-sm text-[--color-primary]`}>
                {item.isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>

            <FavoriteButton item={item} toggleFavorite={toggleFavorite} />
          </View>
        </Pressable>
      )}
    />
  )
}
