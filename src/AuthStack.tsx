import React, { useContext } from 'react'
import { Center } from './Center'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthParamList, AuthNavProps } from './AuthParamList'
import { AuthContext } from './AuthProvider'
import { Button, Text } from 'react-native'

interface AuthStackProps { }

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

export const AuthStack: React.FC<AuthStackProps> = ({ }) => {
  return (<Stack.Navigator
    screenOptions={{
      header: () => null
    }}
    initialRouteName="Login"
  >
    <Stack.Screen
      name="Login"
      component={Login} />
    <Stack.Screen
      name="Register"
      component={Register} />
  </Stack.Navigator>);
}