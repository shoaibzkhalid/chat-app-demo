import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// Importing vector icons
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { useThemeColor } from '@/theme/hooks'
import ChatsScreen from '@/screens/ChatsScreen'
import ProfileScreen from '@/screens/ProfileScreen'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const { activeIcon, inactiveIcon, background } = useThemeColor()

  const getIconColor = (focused: boolean) => (focused ? activeIcon : inactiveIcon)

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
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="chatbubble-sharp" size={20} color={getIconColor(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user-circle" size={24} color={getIconColor(focused)} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
