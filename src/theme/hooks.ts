import { useThemeStore } from '@/stores/theme.store'

const lightColors = {
  text: '#111827',
  background: '#fff',
  icon: '#000',
  card: '#f9fafb',
  primary: 'green',
  border: '#e5e7eb',
  notification: '#ef4444',
}

const darkColors = {
  primary: 'green',
  background: '#111827',
  text: '#f9fafb',
  icon: '#fff',
  card: '#111827',
  border: '#374151',
  notification: '#f87171',
}

export const useThemeColors = () => {
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  return isDark ? darkColors : lightColors
}
