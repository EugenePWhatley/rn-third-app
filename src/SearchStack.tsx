import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { SearchParamList } from './SearchParamList';
import { Center } from './Center';
import { Text, Button, FlatList } from 'react-native';
import faker from 'faker'
import { addProductRoutes } from './addProductRoutes';

interface SearchStackProps {

}

const Stack = createStackNavigator<SearchParamList>();

const Search = ({ navigation }) => {
  const [show, setShow] = useState(false);
  return (
    <Center>
      <Button title="Search Products" onPress={() => {
        setShow(true)
      }} />
      {show ? (<FlatList
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
      />) : null}
    </Center>
  )
}

export const SearchStack: React.FC<SearchStackProps> = ({ }) => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name='Search' component={Search} />
      {addProductRoutes(Stack as any)}
    </Stack.Navigator>
  );
}