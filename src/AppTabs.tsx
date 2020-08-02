import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppParamList } from './AppParamList';
import { Ionicons, AntDesign, EvilIcons } from '@expo/vector-icons';
import { HomeStack } from './HomeStack';
import { SearchStack } from './SearchStack';

interface AppTabsProps {

}

const Tabs = createBottomTabNavigator<AppParamList>()

export const AppTabs: React.FC<AppTabsProps> = ({ }) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            return <AntDesign name="home" size={size} color={color} />
          } else if (route.name === 'Search') {
            return <EvilIcons name="search" size={24} color="black" />
          }

          // You can return any component that you like here!
          return <Ionicons
            name={iconName}
            size={size}
            color={color}
          />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name='Home' component={HomeStack} />
      <Tabs.Screen name='Search' component={SearchStack} />
    </Tabs.Navigator>
  );
}