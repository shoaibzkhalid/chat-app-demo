import AsyncStorage from '@react-native-async-storage/async-storage'
import { StateStorage } from 'zustand/middleware'

export const zustandStorage: StateStorage = {
  getItem: async (key) => {
    const item = await AsyncStorage.getItem(key)
    return item
  },
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, value)
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key)
  },
}

// storage.clearAll()
