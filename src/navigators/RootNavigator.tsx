import { Pressable, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabNavigator from './TabNavigator'
// import { RootStackParamList } from 'types/navigation'
import { Conversation } from 'types/chat'
import ChatScreen from '@/screens/ChatScreen'

export type RootStackParamList = {
  Home: undefined
  ChatsList: undefined
  Chat: { item: Conversation }
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  const navigation = useNavigation()

  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Home" component={TabNavigator} />
      <RootStack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => {
          return {
            title: route.params.item.name,
            headerLeft: () => {
              return (
                <Pressable onPress={() => navigation.goBack()}>
                  <Text className="text-[--color-brand]">Go Back</Text>
                </Pressable>
              )
            },
          }
        }}
      />
    </RootStack.Navigator>
  )
}
