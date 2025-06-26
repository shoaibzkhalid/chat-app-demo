import { useNavigation } from '@react-navigation/native'
import { Platform, Pressable, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Ionicons from '@expo/vector-icons/Ionicons'

import Chat from '@/screens/Chat'
import TabNavigator from './TabNavigator'
import { useThemeColors } from '@/theme/hooks'
import { Conversation } from '@/types/conversation'

export type RootStackParamList = {
  Home: undefined
  ChatsList: undefined
  Chat: { item: Conversation }
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  const navigation = useNavigation()
  const themeColors = useThemeColors()

  return (
    <RootStack.Navigator
    // screenOptions={{ animation: 'fade_from_bottom' }}
    >
      <RootStack.Screen name="Home" component={TabNavigator} />
      <RootStack.Screen
        name="Chat"
        component={Chat}
        options={({ route }) => {
          return {
            title: route.params.item.name,
            headerTitle: () => {
              const isOnline = route.params.item.isOnline
              return (
                <View className="align-center ">
                  <Text className="text-center text-[--color-primary]">
                    {route.params.item.name}
                  </Text>
                  <Text
                    className={`text-center text-sm text-[${isOnline ? '--color-brand' : '--color-primary'}]`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </Text>
                </View>
              )
            },

            headerTitleAlign: 'center',
            headerLeft: () => {
              // only show custom back button on iOS
              if (Platform.OS === 'ios') {
                return (
                  <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="arrow-back"
                      size={24}
                      color={themeColors.icon}
                      onPress={() => navigation.goBack()}
                    />
                  </Pressable>
                )
              }
            },
          }
        }}
      />
    </RootStack.Navigator>
  )
}
