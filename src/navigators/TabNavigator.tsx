import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// Importing vector icons
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import Profile from '@/screens/Profile'
import ChatsList from '@/screens/ChatsList'
import { useThemeColors } from '@/theme/hooks'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  const { background, icon, primary } = useThemeColors()

  const getIconColor = (focused: boolean) => (focused ? primary : icon)

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: ({ focused, children }) => {
          return (
            <Text className={`${focused ? 'text-[--color-brand]' : 'text-[--color-primary]'}`}>
              {children}
            </Text>
          )
        },

        tabBarStyle: { backgroundColor: background },
      }}>
      <Tab.Screen
        name="Chats"
        component={ChatsList}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="chatbubble-sharp" size={20} color={getIconColor(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user-circle" size={24} color={getIconColor(focused)} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
