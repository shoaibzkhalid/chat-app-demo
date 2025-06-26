import { useThemeStore } from '@/stores/theme.store'

const lightColors = {
  background: '#fff',
  text: '#111827',
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
  border: '#374151',
  notification: '#f87171',
  card: '#1f2937',
}

export const useThemeColors = () => {
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  return isDark ? darkColors : lightColors
}
