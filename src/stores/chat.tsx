import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Message } from '@/types/message'
import { Conversation } from '@/types/chat'
import { zustandStorage } from '@/utils/storage'

export enum Sender {
  Me = 'me',
  Them = 'them',
}

interface ChatState {
  conversations: Conversation[]
  toggleFavorite: (id: string) => void
  addMessage: (convId: string, message: Message) => void
  simulateIncoming: (convId: string) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      conversations: [
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
      ],
      toggleFavorite: (id) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
          ),
        })),
      addMessage: (convId, message) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === convId ? { ...c, messages: [...c.messages, message] } : c
          ),
        })),
      simulateIncoming: (convId) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === convId
              ? {
                  ...c,
                  messages: [
                    ...c.messages,
                    {
                      id: Date.now().toString(),
                      text: 'This is a fake notification!',
                      sender: Sender.Them,
                      timestamp: Date.now(),
                    },
                  ],
                }
              : c
          ),
        })),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)
