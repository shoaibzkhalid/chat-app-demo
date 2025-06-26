import { Switch, Text, View } from 'react-native'
import { colorScheme } from 'nativewind'

import { useThemeStore } from '@/stores/theme.store'

export default function ThemeSwitcher() {
  const { toggleTheme, theme } = useThemeStore()

  const handleThemeSwitch = () => {
    colorScheme.set(theme === 'dark' ? 'light' : 'dark')
    toggleTheme()
  }

  return (
    <View className="flex-row items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
      <Text className="mx-2 text-[--color-primary]">
        Toggle theme: {theme === 'dark' ? 'Dark 🌙' : 'Light 🌞'}
      </Text>

      <Switch value={theme === 'dark'} onChange={handleThemeSwitch} />
    </View>
  )
}
