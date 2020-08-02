import { TouchableOpacity, Text, Button } from 'react-native'
import { HomeStackNavProps, HomeParamList } from './HomeParamList'
import { Center } from './Center'
import React, { useState, useRef, useEffect } from 'react'
import { TypedNavigator, StackNavigationState } from '@react-navigation/native'
import { SearchParamList } from './SearchParamList'

const Product = ({
  route,
  navigation
}: HomeStackNavProps<'Product'>) => {
  return (
    <Center>
      <Text>{route.params.name}</Text>
      <Button
        title="Edit this product"
        onPress={() => {
          navigation.navigate('EditProduct', {
            name: route.params.name
          })
        }}
      />
    </Center>
  )
}

const apiCall = (x: any) => {
  return x;
}

const EditProduct = ({ route, navigation }: HomeStackNavProps<'EditProduct'>) => {
  const [formState] = useState();
  const submit = useRef(() => { });

  submit.current = () => {
    //api call with new form state
    apiCall(formState)
    navigation.goBack()
  }

  useEffect(() => {
    navigation.setParams({ submit })
  }, [])

  return (
    <Center>
      <Text>editing {route.params.name}...</Text>
    </Center>
  )
}

export const addProductRoutes = (
  Stack: TypedNavigator<
    HomeParamList | SearchParamList,
    StackNavigationState,
    any,
    any,
    any>
) => {
  return (
    <>
      <Stack.Screen
        options={({ route }: any) => ({
          headerTitle: `Product: ${route.params.name}`
        })}
        name="Product"
        component={Product}
      />
      <Stack.Screen
        options={({ route }: any) => ({
          headerTitle: `Edit: ${route.params.name}`,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                route.params.submit?.current()
              }}
              style={{ paddingRight: 8 }}>
              <Text style={{ color: 'red' }}>DONE</Text>
            </TouchableOpacity>
          )
        })}
        name="EditProduct"
        component={EditProduct}
      />
    </>
  )
}