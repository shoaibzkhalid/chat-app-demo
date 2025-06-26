import { Conversation } from './conversation'

export type RootStackParamList = {
  Home: undefined
  Profile: { userId: string }
  Chat: { item: Conversation }
}
