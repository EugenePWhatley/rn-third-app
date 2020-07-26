import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppParamList } from './AppParamList';
import { Center } from './Center';
import { Text } from 'react-native'

interface AppTabsProps {

}

const Tabs = createBottomTabNavigator<AppParamList>()

const Home = () => {
  return (
    <Center>
      <Text>home</Text>
    </Center>
  )
}

const Search = () => {
  return (
    <Center>
      <Text>search</Text>
    </Center>
  )
}

export const AppTabs: React.FC<AppTabsProps> = ({ }) => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name='Home' component={Home} />
      <Tabs.Screen name='Search' component={Search} />
    </Tabs.Navigator>
  );
}