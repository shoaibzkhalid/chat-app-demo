import { Theme } from '@react-navigation/native'

export const fonts: Theme['fonts'] = {
  regular: { fontFamily: 'Inter-Regular', fontWeight: '400' as const },
  medium: { fontFamily: 'Inter-Medium', fontWeight: '500' as const },
  bold: { fontFamily: 'Inter-Bold', fontWeight: '700' as const },
  heavy: { fontFamily: 'Inter-Heavy', fontWeight: '800' as const },
}
