import './global.css'

import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { fonts } from '@/theme/fonts'
import { ThemeProvider } from '@/theme/index'
import { useThemeColors } from '@/theme/hooks'
import { useThemeStore } from '@/stores/theme.store'
import RootNavigator from '@/navigators/RootNavigator'
import { useNotifications } from '@/hooks/useNotifications'

export default function App() {
  // push notification set up hook
  useNotifications()
  const { theme } = useThemeStore()
  const colors = useThemeColors()

  return (
    <SafeAreaProvider style={{ backgroundColor: colors.card }}>
      <GestureHandlerRootView>
        <ThemeProvider>
          <NavigationContainer theme={{ dark: theme === 'dark', colors, fonts }}>
            <RootNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
