import { Conversation } from './chat'

export type RootStackParamList = {
  Home: undefined
  Profile: { userId: string }
  Chat: { item: Conversation }
}
