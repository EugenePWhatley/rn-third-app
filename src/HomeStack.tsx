import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Center } from './Center';
import { Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { AuthContext } from './AuthProvider';
import faker from 'faker'
import { HomeParamList, HomeStackNavProps } from './HomeParamList';
import { addProductRoutes } from './addProductRoutes';

interface HomeStackProps {

}

const Stack = createStackNavigator<HomeParamList>();

const Feed = ({ navigation }: HomeStackNavProps<'Feed'>) => {
  return (
    <Center>
      <FlatList
        style={{ width: '100%' }}
        renderItem={(item) => {
          return <Button title={item.item} onPress={() => {
            navigation.navigate('Product', {
              name: item.item
            })
          }} />;
        }}
        keyExtractor={(product, index) => product + index} //should be unique  keys
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  )
}

export const HomeStack: React.FC<HomeStackProps> = ({ }) => {
  const { logout } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Feed" options={{
        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => logout()}>
              <Text>
                LOGOUT
            </Text>
            </TouchableOpacity>
          )
        }
      }} component={Feed} />
      {addProductRoutes(Stack as any)}
    </Stack.Navigator>

  );
}