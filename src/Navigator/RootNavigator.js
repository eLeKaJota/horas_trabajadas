import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native';
import TabNavigator from './TabNavigator';
import {MainNavigator} from './MainNavigator';

export const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({navigation}) => ({
        headerShown: false,
        headerRight: () => {
          return (
            <Button
              onPress={() =>
                auth()
                  .signOut()
                  .then(() => navigation.navigate('MainNavigator'))
              }
              title="LogOut"
            />
          );
        },
      })}>
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};
