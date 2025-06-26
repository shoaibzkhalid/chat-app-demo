import { View, Text } from 'react-native'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-4 text-2xl font-bold text-[--color-primary]">Profile</Text>
      <ThemeSwitcher />
    </View>
  )
}
