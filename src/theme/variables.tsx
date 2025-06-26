// src/theme/variables.ts
import { vars } from 'nativewind'

export const themes = {
  light: vars({
    '--color-primary': 'black',
    '--color-secondary': 'white',
    '--color-brand': 'green',
    '--star-color': '#facc15',
  }),
  dark: vars({
    '--color-primary': 'white',
    '--color-secondary': 'black',
    '--color-brand': 'green',
    '--star-color': '#fde047',
  }),
}

export type ThemeName = keyof typeof themes
