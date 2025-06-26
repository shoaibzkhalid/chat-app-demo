import { useState } from 'react'
import { Pressable } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'

import { Ionicons } from '@expo/vector-icons'
import { Conversation } from '@/types/conversation'

type FavoriteButtonProps = {
  toggleFavorite: (id: string) => void
  item: Conversation
}

export default function FavoriteButton({ toggleFavorite, item }: FavoriteButtonProps) {
  const scale = useSharedValue(1)
  const [added, setAdded] = useState(false)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const onPress = () => {
    setAdded(added ? false : true)
    toggleFavorite(item.id)

    scale.value = withSpring(1.5, {}, () => {
      scale.value = withSpring(1)
    })
  }

  const isFavorite = item.isFavorite

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={28}
          color={isFavorite ? '#facc15' : '#9ca3af'}
        />
      </Animated.View>
    </Pressable>
  )
}
