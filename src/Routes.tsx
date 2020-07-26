import React, { useState, useEffect, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, StyleSheet, Button, ActivityIndicator, AsyncStorage } from 'react-native';
import { Center } from './Center';
import { AuthParamList, AuthNavProps } from './AuthParamList'
import { AuthContext } from './AuthProvider';

interface RoutesProps {

}

const Stack = createStackNavigator<AuthParamList>()

const Login = ({ navigation }: AuthNavProps<'Login'>) => {
  const { login } = useContext(AuthContext)
  return (
    <Center>
      <Text>I am login screen</Text>
      <Button
        title="log me in"
        onPress={() => {
          login()
        }} />
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate("Register")
        }} />
    </Center>
  )
}

const Register = ({ navigation, route }: AuthNavProps<'Register'>) => {
  return (
    <Center>
      <Text>route name: {route.name}</Text>
      <Button
        title="go to title screen"
        onPress={() => {
          navigation.navigate("Login")
          // navigation.goBack()
        }} />
    </Center>
  )
}

export const Routes: React.FC<RoutesProps> = ({ }) => {
  const { user, login } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user').then(userString => {
      if (userString) {
        login()
      }
      setLoading(false)
      console.log(userString);
    })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  })

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    )
  }
  return (
    <NavigationContainer>
      {user ? (
        <Center><Text>{user.username}</Text></Center>) : <Stack.Navigator
          // screenOptions={{
          //   header: () => null
          // }}
          initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login} />
          <Stack.Screen
            name="Register"
            component={Register} />
        </Stack.Navigator>}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {}
})