import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Message } from '@/types/message'
import { zustandStorage } from '@/utils/storage'
import { Conversation } from '@/types/conversation'

const INITIAL_CONVERSATIONS = [
  {
    id: '1',
    name: 'Alice',
    messages: [],
    isFavorite: false,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Bob',
    messages: [],
    isFavorite: false,
    isOnline: false,
  },
]

export enum Sender {
  Me = 'me',
  Them = 'them',
}

interface ChatState {
  loading: boolean
  conversations: Conversation[]
  toggleFavorite: (id: string) => void
  addMessage: (convId: string, message: Message) => void
  simulateIncoming: (convId: string) => void
  setLoading: (loading: boolean) => void
  clearStorage: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      conversations: INITIAL_CONVERSATIONS,
      toggleFavorite: (id) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
          ),
        })),

      loading: false,
      setLoading: (loading: boolean) => set(() => ({ loading })),

      addMessage: (convId, message) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === convId ? { ...c, messages: [message, ...c.messages] } : c
          ),
        })),
      simulateIncoming: (convId) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === convId
              ? {
                  ...c,
                  messages: [
                    {
                      id: Date.now().toString(),
                      text: 'This is a fake notification!',
                      sender: Sender.Them,
                      timestamp: Date.now(),
                    },
                    ...c.messages,
                  ],
                }
              : c
          ),
        })),

      clearStorage: async () => set(() => ({ conversations: INITIAL_CONVERSATIONS })),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)
