import { Alert, Pressable } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'

import { Ionicons } from '@expo/vector-icons'
import { Conversation } from '@/types/conversation'

type FavoriteButtonProps = {
  toggleFavorite: (id: string) => void
  conversation: Conversation
}

export default function FavoriteButton({ toggleFavorite, conversation }: FavoriteButtonProps) {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const onPress = () => {
    toggleFavorite(conversation.id)

    scale.value = withSpring(1.5, {}, () => {
      scale.value = withSpring(1)
    })

    Alert.alert(
      conversation.isFavorite
        ? `Conversation removed from favorites`
        : `Conversation added to favorites`
    )
  }

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={conversation.isFavorite ? 'heart' : 'heart-outline'}
          size={28}
          color={conversation.isFavorite ? '#facc15' : '#9ca3af'}
        />
      </Animated.View>
    </Pressable>
  )
}
