import { Switch, Text, View } from 'react-native'
import { colorScheme } from 'nativewind'

import { useThemeStore } from 'stores/theme'

export default function ThemeSwitcher() {
  const { toggleTheme, theme } = useThemeStore()

  return (
    <View
      className="flex-row items-center justify-between rounded-lg bg-gray-100 p-4 
    dark:bg-gray-800">
      <Text className="mx-2 text-[--color-primary]">
        Toggle Dark Mode: {theme === 'dark' ? 'Dark 🌙' : 'Light 🌞'}
      </Text>

      <Switch
        value={theme === 'dark'}
        onChange={() => {
          toggleTheme()
          colorScheme.set(theme === 'light' ? 'dark' : 'light')
        }}
      />
    </View>
  )
}
