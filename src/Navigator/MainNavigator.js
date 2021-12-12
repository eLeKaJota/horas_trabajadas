import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Login from '../Views/Auth/Login';
import {HomeScreen} from '../Views/HomeScreen';
import {Button} from 'react-native';
import Register from '../Views/Auth/Register';

export const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({navigation}) => ({
        headerRight: () => {
          return (
            <Button
              onPress={() =>
                auth()
                  .signOut()
                  .then(() => console.log('User signed out!'))
              }
              title="LogOut"
            />
          );
        },
      })}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Hoooome',
          headerStyle: {
            backgroundColor: '#f4511e',
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {},
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: '#f4511e',
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {},
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Register',
          headerStyle: {
            backgroundColor: '#f4511e',
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {},
        }}
      />
    </Stack.Navigator>
  );
};
