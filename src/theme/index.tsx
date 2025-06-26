import { ReactNode } from 'react'
import { View } from 'react-native'

import { themes } from './variables'
import { useThemeStore } from '@/stores/theme.store'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme } = useThemeStore()
  return (
    <View style={themes[theme]} className="flex-1">
      {children}
    </View>
  )
}
