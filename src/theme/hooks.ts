import { useColorScheme } from 'react-native'

const lightColors = {
  background: '#fff',
  text: '#111827',
  icon: '#000',
  card: '#f9fafb',
  primary: '#3b82f6',

  border: '#e5e7eb',
  notification: '#ef4444',

  placeholder: '#9ca3af',
  activeIcon: 'green',
  inactiveIcon: 'black',
}

const darkColors = {
  background: '#111827',
  text: '#f9fafb',
  icon: '#fff',
  primary: '#1f2937',
  border: '#374151',
  notification: '#f87171',
  card: '#1f2937',

  placeholder: '#6b7280',
  activeIcon: 'green',
  inactiveIcon: '#6b7280',
}

export const useThemeColor = () => {
  const scheme = useColorScheme()
  return scheme === 'dark' ? darkColors : lightColors
}
