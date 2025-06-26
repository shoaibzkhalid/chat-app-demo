import { Message } from './message'

export interface Conversation {
  id: string // Unique identifier for the message
  isFavorite: boolean // Optional flag to mark the message as favorite
  isOnline: boolean // Optional flag to indicate if the user is online
  name: string // The name of the user in the chat
  messages: Message[] // Array of messages in the chat
}
