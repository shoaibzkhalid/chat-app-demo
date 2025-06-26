import './global.css'

import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { ThemeProvider } from 'theme'
import { appFonts } from 'theme/fonts'
import { useThemeStore } from 'stores/theme'
import RootNavigator from 'navigators/RootNavigator'
import { useNotifications } from 'hooks/useNotifications'

export default function App() {
  useNotifications()
  const { theme } = useThemeStore()

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <ThemeProvider>
          <NavigationContainer
            theme={{
              dark: theme === 'dark',
              fonts: appFonts,
              colors: {
                primary: theme === 'dark' ? '#1f2937' : '#3b82f6', // Example primary color
                background: theme === 'dark' ? '#111827' : '#ffffff', // Example background color
                card: theme === 'dark' ? '#1f2937' : '#f9fafb', // Example card color
                text: theme === 'dark' ? '#f9fafb' : '#111827', // Example text color
                border: theme === 'dark' ? '#374151' : '#e5e7eb', // Example border color
                notification: theme === 'dark' ? '#f87171' : '#ef4444', // Example notification color
              },
            }}>
            <RootNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
