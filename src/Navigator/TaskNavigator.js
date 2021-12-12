import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Categories from '../Views/Categories';
import Tasks from '../Views/Tasks';

export const TaskNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Tasks"
      screenOptions={({navigation}) => ({
        headerShown: false,
      })}>
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          title: 'Categories',
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
        name="Tasks"
        component={Tasks}
        options={{
          title: 'Tasks',
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
